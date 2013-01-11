Ext.define('faceid.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'Users'
    ],

    stores: [
        'Users'
    ],

    addUser: function () {
        console.log('addUser event');
    },

    editUser: function () {
        console.log('editUser event');
    },

    deleteUser: function () {
        console.log('deleteUser event');
    },

    init: function () {
        var self = this;

        self.control({
            'faceid-portlet-users button[action=addUser]': {
                click: self.addUser
            },
            'faceid-portlet-users button[action=editUser]': {
                click: self.editUser
            },
            'faceid-portlet-users button[action=deleteUser]': {
                click: self.deleteUser
            },
            'faceid-portlet-users': {
                refreshpanel: function () {
                    self.getUsersStore().load();
                }
            }
        });

        self.getUsersStore().load();
    }
});
