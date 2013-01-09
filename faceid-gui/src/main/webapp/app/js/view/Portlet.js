(function () {
    var squareUnitSize = 100;

    function normalize(value) {
        var modulus = value % squareUnitSize;
        var newSize = value - modulus;
        return newSize;
    }

    function normalizeSize(size) {
        var newSize = normalize(size);
        if (newSize === 0) {
            return squareUnitSize;
        }
        return newSize;
    }

    Ext.define('faceid.view.Portlet', {
        extend: 'Ext.Panel',
        title: '-',
        draggable: true,
        resizable: true,
        closable: true,
        height: squareUnitSize,
        width: squareUnitSize,
        x: 0,
        y: 0,
        listeners: {
            resize: function (thisPanel, width, height) {
                console.log('resizing portlet', thisPanel);
                thisPanel.suspendEvents();
                thisPanel.setSize(normalizeSize(width), normalizeSize(height));
                thisPanel.resumeEvents();
            },
            move: function (thisPanel, x, y) {
                console.log('moving portlet', thisPanel);
                thisPanel.suspendEvents();
                thisPanel.setPosition(normalize(x), normalize(y));
                thisPanel.resumeEvents();
            }

        }
    });
})();
