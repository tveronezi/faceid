Ext.define('faceid.view.PortletContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-portlet-container',
    layout: 'absolute',
    autoScroll: true,
    bodyBorder: false,
    body: false,
    items: [],
    showPortlet: function (panelType) {
        var panel = this.query(panelType);
        if (Ext.isEmpty(panel)) {
            this.add({
                xtype: panelType,
                x: 10,
                y: 10,
                height: 100,
                width: 100
            });
        }
    },
    initComponent: function () {
        console.log('initComponent', 'PortletContainer');
        this.callParent(arguments);
    }
});