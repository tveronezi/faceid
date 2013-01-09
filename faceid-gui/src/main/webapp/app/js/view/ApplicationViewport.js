Ext.define('faceid.view.ApplicationViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.faceid-viewport',
    layout: 'fit',
    items: [
        {
            xtype: 'faceid-application-container'
        }
    ],
    initComponent: function () {
        console.log('initComponent', 'ApplicationViewport');
        this.callParent(arguments);
    }
});