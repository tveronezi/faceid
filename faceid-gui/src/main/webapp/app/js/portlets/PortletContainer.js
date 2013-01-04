Ext.define('faceid.portlets.PortletContainer', {
    extend: 'Ext.panel.Panel',
    layout: 'absolute',
    initComponent: function () {
        var usersPanel = Ext.create('faceid.portlets.Users', {
            x: 50,
            y: 50
        });

        var logPanel = Ext.create('faceid.portlets.AuthenticationLog', {
            x: 450,
            y: 50
        });
        Ext.apply(this, {
            items: [usersPanel, logPanel]
        });

        this.callParent(arguments);
    }
});