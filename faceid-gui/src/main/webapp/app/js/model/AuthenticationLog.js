Ext.define('faceid.model.AuthenticationLog', {
    extend: 'Ext.data.Model',
    fields: ['id', 'date', 'account'],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            root: 'authenticationDto'
        },
        url : 'rest/authentication'
    }
});