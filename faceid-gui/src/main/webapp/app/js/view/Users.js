Ext.define('faceid.view.Users', {
    extend: 'faceid.view.portlets.Portlet',
    height: 200,
    width: 400,
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    initComponent: function () {
        var store = Ext.data.StoreManager.lookup('users');
        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            border: false,
            columns: [
                { text: faceid.i18n.get('user.account'), dataIndex: 'account' },
                { text: faceid.i18n.get('user.name'), dataIndex: 'name', flex: 1 }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        store.load();
        this.callParent(arguments);
    }
});