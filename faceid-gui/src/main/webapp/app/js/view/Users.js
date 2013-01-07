Ext.define('faceid.view.Users', {
    extend: 'faceid.view.portlets.Portlet',
    height: 200,
    width: 400,
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    initComponent: function () {
        var grid = Ext.create('Ext.grid.Panel', {
            store: 'Users',
            columns: [
                { text: faceid.i18n.get('user.account'), dataIndex: 'account' },
                { text: faceid.i18n.get('user.name'), dataIndex: 'name', flex: 1 }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        var store = grid.getStore()
        store.load();
        this.callParent(arguments);
    }
});