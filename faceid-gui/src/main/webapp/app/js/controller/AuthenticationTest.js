Ext.define('faceid.controller.AuthenticationTest', {
    extend: 'Ext.app.Controller',

    views: [
        'AuthenticationTest'
    ],

    stores: [
        'AuthenticationLog'
    ],

    refs: [
        {
            ref: 'loginPanel',
            selector: 'faceid-portlet-logintest'
        }
    ],

    loginTest: function (values) {
        console.log('action: loginTest', values);
        var self = this;
        var panel = self.getLoginPanel();

        Ext.Ajax.request({
            url: 'rest/authentication',
            params: values,
            success: function (response) {
                var form = panel.query('form')[0];
                form.getForm().reset();
                panel.enable();
                self.getAuthenticationLogStore().load();
            }
        });
    },

    init: function () {
        var self = this;

        self.control({
            'faceid-portlet-logintest': {
                login: self.loginTest
            }
        });
    }
});
