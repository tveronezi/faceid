Ext.define('faceid.view.portlets.PortletContainer', {
    extend: 'Ext.panel.Panel',
    layout: 'absolute',
    autoScroll: true,
    logic: function () {
        var self = this;
        var areaMap = {};
        var lastX = 0;

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
                }
                return false; // break the loop
            });
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

            // The 'move' does not have the old x and y values.
            panel.originalX = panel.x;
            panel.originalY = panel.y;
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
                lastX = lastX + panelSettings.get('height');
                panelSettings.set('y', lastX);
            }
            panelSettings.save();

            var panel = Ext.create(panelSettings.get('panel'), {
                x: panelSettings.get('x'),
                y: panelSettings.get('y'),
                width: panelSettings.get('width'),
                height: panelSettings.get('height')
            });

            panel.on('resize', function (thisPanel, width, height, oldWidth, oldHeight) {
                if (doesItOverlap(thisPanel)) {
                    thisPanel.updateBox({
                        x: thisPanel.originalX,
                        y: thisPanel.originalY,
                        width: oldWidth,
                        height: oldHeight
                    });
                } else {
                    updateAreaMap(thisPanel);
                }
            });
            panel.on('move', function (thisPanel, x, y) {
                if (doesItOverlap(thisPanel)) {
                    thisPanel.updateBox({
                        x: thisPanel.originalX,
                        y: thisPanel.originalY,
                        width: thisPanel.width,
                        height: thisPanel.height
                    });
                } else {
                    updateAreaMap(thisPanel);
                }
            });
            updateAreaMap(panel);
            self.add(panel);
        }

        faceid.channel.bind('portletContainer', 'panelsettings-loaded', function (data) {
            Ext.Array.each(data.settings, function (bean) {
                addPanel(bean);
            });
        });
        faceid.channel.send('portletContainer', 'panelsettings-request', {});
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