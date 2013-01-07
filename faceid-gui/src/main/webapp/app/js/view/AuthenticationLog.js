Ext.define('faceid.view.AuthenticationLog', {
    extend: 'faceid.view.portlets.Portlet',
    height: 100,
    width: 350,
    title: faceid.i18n.get('application.log'),
    layout: 'fit',
    initComponent: function () {
//        var grid = Ext.create('Ext.grid.Panel', {
//            //store: 'AuthenticationLog',
//            columns: [
//                { text: faceid.i18n.get('authentication.date'), dataIndex: 'date' },
//                { text: faceid.i18n.get('authentication.account'), dataIndex: 'account', flex: 1 }
//            ]
//        });
//
//        Ext.apply(this, {
//            items: [grid]
//        });
//
//        var store = grid.getStore();
//        store.load();
        this.callParent(arguments);
    }
});