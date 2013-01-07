Ext.define('faceid.model.AuthenticationLog', {
    extend: 'Ext.data.Model',
    fields: ['id', {
        name: 'timestamp',
        type: 'int'
    }, 'account', 'type'],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            root: 'authenticationDto'
        },
        url: 'rest/authentication'
    }
});