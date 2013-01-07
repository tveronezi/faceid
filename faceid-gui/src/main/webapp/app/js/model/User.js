Ext.define('faceid.model.User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'account'],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            root: 'userDto'
        },
        url : 'rest/users'
    }
});