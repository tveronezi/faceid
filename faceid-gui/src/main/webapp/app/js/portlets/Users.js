Ext.define('faceid.portlets.Users', {
    extend: 'faceid.portlets.Portlet',
    height: 200,
    width: 400,
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    initComponent: function () {
        Ext.create('Ext.data.Store', {
            storeId: 'simpsonsStore',
            fields: ['name', 'email', 'phone'],
            data: {'items': [
                { 'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224"  },
                { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244"  },
                { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254"  }
            ]},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('simpsonsStore'),
            columns: [
                { text: 'Name', dataIndex: 'name' },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone' }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        this.callParent(arguments);
    }
});