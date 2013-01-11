(function () {
    var squareUnitSize = 100;
    var padding = 5;

    function normalizePosition(position) {
        var modulus = position % squareUnitSize;
        var newPosition = position - modulus;
        return newPosition + padding;
    }

    function normalizeSize(size) {
        var modulus = size % squareUnitSize;
        var newSize = size - modulus;
        var result;
        if (newSize === 0) {
            result = squareUnitSize;
        } else if (size === newSize) {
            result =  size;
        } else {
            result =  newSize + squareUnitSize;
        }
        return result - padding;
    }

    Ext.define('faceid.view.Portlet', {
        extend: 'Ext.window.Window',
        alias: 'widget.faceid-portlet',
        title: '-',
        closeAction: 'hide',
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
        },
        initComponent: function () {
            console.log('initComponent', 'Portlet', this);
            var self = this;
            var defaultProps = {};

            function setDefault(prop, value) {
                if (Ext.isEmpty(self[prop])) {
                    defaultProps[prop] = value;
                }
            }

            setDefault('x', 0);
            setDefault('y', 0);
            setDefault('height', squareUnitSize);
            setDefault('width', squareUnitSize);

            Ext.apply(self, defaultProps);

            this.callParent(arguments);
        }
    });
})();
