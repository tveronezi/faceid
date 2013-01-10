Ext.define('faceid.view.PortletContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-portlet-container',
    layout: 'absolute',
    autoScroll: true,
    bodyBorder: false,
    body: false,
    items: [],
    showPortlet: function (panelType, settings) {
        var panel = this.query(panelType);
        if (Ext.isEmpty(panel)) {
            var params = {
                xtype: panelType
            };
            if (settings) {
                params.x = settings.get('x');
                params.y = settings.get('y');
                params.height = settings.get('height');
                params.width = settings.get('width');
            }
            this.add(params);
        }
    },
    initComponent: function () {
        console.log('initComponent', 'PortletContainer');
        this.callParent(arguments);
    }
});