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
                xtype: panelType,
                x: settings.get('x'),
                y: settings.get('y'),
                height: settings.get('height'),
                width: settings.get('width')
            };
            this.add(params);
        }
    },
    initComponent: function () {
        console.log('initComponent', 'PortletContainer');
        this.callParent(arguments);
    }
});