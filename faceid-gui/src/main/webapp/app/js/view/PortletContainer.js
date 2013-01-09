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
                xtype: panelType
            });
        }
    },
    initComponent: function () {
        console.log('initComponent', 'PortletContainer');
        this.callParent(arguments);
    }
});