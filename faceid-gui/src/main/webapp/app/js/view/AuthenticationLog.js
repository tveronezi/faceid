Ext.define('faceid.view.AuthenticationLog', {
    extend: 'faceid.view.portlets.Portlet',
    height: 100,
    width: 350,
    title: faceid.i18n.get('application.log'),
    layout: 'fit',
    initComponent: function () {
        var store = Ext.data.StoreManager.lookup('authenticationLog');
        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [
                { text: faceid.i18n.get('authentication.date'), dataIndex: 'date' },
                { text: faceid.i18n.get('authentication.account'), dataIndex: 'account', flex: 1 },
                { text: faceid.i18n.get('authentication.type'), dataIndex: 'type', flex: 1 }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        store.load();
        this.callParent(arguments);
    }
});