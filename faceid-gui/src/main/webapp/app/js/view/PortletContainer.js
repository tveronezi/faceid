Ext.define('faceid.view.PortletContainer', {
    extend: 'Ext.panel.Panel',
    layout: 'absolute',
    autoScroll: true,
    logic: function () {
        var self = this;
        var areaMap = {};
        var lastY = 0;

        function doesItOverlap(thisPanel) {
            var thisId = thisPanel.getId();
            var thisAreaData = buildAreaData(thisPanel);
            var overlap = false;
            Ext.Object.each(areaMap, function (panelId, areaData) {
                if (thisId === panelId) {
                    // Sure I will overlap myself! :O)
                    return;
                }
                var xOverlap = Math.max(0, Math.min(thisAreaData.x2, areaData.x2) - Math.max(thisAreaData.x1, areaData.x1));
                var yOverlap = Math.max(0, Math.min(thisAreaData.y2, areaData.y2) - Math.max(thisAreaData.y1, areaData.y1));
                var overlapArea = xOverlap * yOverlap;
                if (overlapArea > 0) {
                    overlap = true;
                    return false; // break the loop
                }
            });
            console.log('Panel overlaps?', overlap, thisPanel);
            return overlap;
        }

        function buildAreaData(panel) {
            return {
                x1: panel.x,
                x2: panel.x + panel.width,
                y1: panel.y,
                y2: panel.y + panel.height
            };
        }

        function updateAreaMap(panel) {
            areaMap[panel.getId()] = buildAreaData(panel);
            faceid.channel.send('portletContainer', 'panelsettings-update', {
                panel: Ext.ClassManager.getName(panel),
                height: panel.height,
                width: panel.width,
                x: panel.x,
                y: panel.y
            });
        }

        function addPanel(panelSettings) {
            if (Ext.isEmpty(panelSettings.get('height'))) {
                panelSettings.set('height', 200);
            }
            if (Ext.isEmpty(panelSettings.get('width'))) {
                panelSettings.set('width', 400);
            }
            if (Ext.isEmpty(panelSettings.get('x'))) {
                panelSettings.set('x', 0);
            }
            if (Ext.isEmpty(panelSettings.get('y'))) {
                panelSettings.set('y', lastY);
                lastY = lastY + panelSettings.get('height') + 1;
            }
            panelSettings.save();

            var panel = Ext.create(panelSettings.get('panel'), {
                x: panelSettings.get('x'),
                y: panelSettings.get('y'),
                width: panelSettings.get('width'),
                height: panelSettings.get('height')
            });

            var eventHandler = function (panel) {
                if (doesItOverlap(panel)) {
                    faceid.channel.send('portletContainer', 'panelsettings-request', {
                        panel: panel
                    });
                } else {
                    updateAreaMap(panel);
                }
            };

            panel.on('resize', function (thisPanel, width, height, oldWidth, oldHeight) {
                eventHandler(panel);
            });
            panel.on('move', function (thisPanel, x, y) {
                eventHandler(panel);
            });
            updateAreaMap(panel);
            self.add(panel);
        }

        faceid.channel.bind('portletContainer', 'panelsettings-response', function (data) {
            var panel = data.panel;
            var settings = data.settings;
            panel.setPosition(settings.get('x'), settings.get('y'));
            panel.setSize(settings.get('width'), settings.get('height'));
        });

        faceid.channel.bind('portletContainer', 'all-panelsettings-loaded', function (data) {
            Ext.Array.each(data.settings, function (bean) {
                addPanel(bean);
            });
        });
        faceid.channel.send('portletContainer', 'all-panelsettings-request', {});
    },
    initComponent: function () {
        Ext.apply(this, {
            items: [],
            listeners: {
                'render': function () {
                    this.logic();
                }
            }
        });
        this.callParent(arguments);
    }
});