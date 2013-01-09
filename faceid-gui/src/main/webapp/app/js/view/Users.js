Ext.define('faceid.view.Users', {
    extend: 'faceid.view.Portlet',
    alias: 'widget.faceid-portlet-users',
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    initComponent: function () {
        var grid = Ext.create('Ext.grid.Panel', {
            store: 'Users',
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