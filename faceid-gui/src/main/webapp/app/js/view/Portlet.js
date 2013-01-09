(function () {
    var squareUnitSize = 100;

    function normalizePosition(position) {
        var modulus = position % squareUnitSize;
        var newPosition = position - modulus;
        return newPosition;
    }

    function normalizeSize(size) {
        var modulus = size % squareUnitSize;
        var newSize = size - modulus;
        if (newSize === 0) {
            return squareUnitSize;
        }
        if (size === newSize) {
            return size;
        }
        return newSize + squareUnitSize;
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
        padding: '5 0 0 5',
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
                thisPanel.setPosition(normalizePosition(x), normalizePosition(y));
                thisPanel.resumeEvents();
            }

        }
    });
})();
