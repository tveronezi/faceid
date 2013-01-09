Ext.define('faceid.view.AuthenticationLog', {
    extend: 'faceid.view.Portlet',
    alias: 'widget.faceid-portlet-log',
    title: faceid.i18n.get('application.log'),
    layout: 'fit',
    initComponent: function () {
        var grid = Ext.create('Ext.grid.Panel', {
            border: false,
            store: 'AuthenticationLog',
            columns: [
                {
                    text: faceid.i18n.get('authentication.date'),
                    width: 130,
                    dataIndex: 'timestamp',
                    renderer: function (value) {
                        var date = new Date(value);
                        return Ext.Date.format(date, 'Y-n-j g:i:s A');
                    }
                },
                {
                    text: faceid.i18n.get('authentication.account'),
                    dataIndex: 'account',
                    flex: 1
                },
                {
                    text: faceid.i18n.get('authentication.type'),
                    dataIndex: 'type',
                    flex: 1,
                    renderer: function (value) {
                        return faceid.i18n.get('authentication.type.' + value);
                    }
                }
            ]
        });

        Ext.apply(this, {
            items: [grid]
        });

        this.callParent(arguments);
    }
});