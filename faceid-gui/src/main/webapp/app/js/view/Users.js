Ext.define('faceid.view.Users', {
    extend: 'faceid.view.Portlet',
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    width: 300,
    height: 150,
    initComponent: function () {
        var grid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('users'),
            border: false,
            columns: [
                { text: faceid.i18n.get('user.account'), dataIndex: 'account' },
                { text: faceid.i18n.get('user.name'), dataIndex: 'name', flex: 1 }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        this.callParent(arguments);
    }
});