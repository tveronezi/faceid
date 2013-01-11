Ext.define('faceid.controller.AuthenticationLog', {
    extend: 'Ext.app.Controller',

    views: [
        'AuthenticationLog'
    ],

    stores: [
        'AuthenticationLog'
    ],

    refs: [
        {
            ref: 'logPanel',
            selector: 'faceid-portlet-log'
        }
    ],

    refreshPanel: function () {
        console.log('action: refreshPanel');
        this.getAuthenticationLogStore().load();
    },

    init: function () {
        var self = this;

        self.control({
            'faceid-portlet-log button[action=refreshPanel]': {
                click: self.refreshPanel
            },
            'faceid-portlet-log': {
                refreshpanel: function () {
                    self.getAuthenticationLogStore().load();
                }
            }
        });

        self.getAuthenticationLogStore().load();
    }
});
