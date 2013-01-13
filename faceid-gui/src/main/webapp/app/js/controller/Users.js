Ext.define('faceid.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'Users',
        'UserView'
    ],

    stores: [
        'Users'
    ],

    models: [
        'User'
    ],

    saveUser: function (ev) {
        console.log('saveUser event', ev);

    },

    addUser: function () {
        console.log('addUser event');
        var window = Ext.create('widget.faceid-userview', {});
        window.show();
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
            'faceid-userview': {
                saveUser: self.saveUser
            },
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
