Ext.define('faceid.portlets.PortletContainer', {
    extend: 'Ext.panel.Panel',
    layout: 'absolute',
    logic: function () {
        var items = [];
        var areaMap = {};

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

            // The 'move' does not have the old x and y values.
            panel.originalX = panel.x;
            panel.originalY = panel.y;
        }

        function addPanel(cls, x, y) {
            var panel = Ext.create(cls, {
                x: x,
                y: y
            });
            items.push(panel);
            panel.on('resize', function (thisPanel, width, height, oldWidth, oldHeight, eOpts) {
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
            panel.on('move', function (thisPanel, x, y, eOpts) {
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
        }

        addPanel('faceid.portlets.Users', 50, 50);
        addPanel('faceid.portlets.AuthenticationLog', 460, 50);

        Ext.apply(this, {items: items});
    },
    initComponent: function () {
        this.logic();
        this.callParent(arguments);
    }
});