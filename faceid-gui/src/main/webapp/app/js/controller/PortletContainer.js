Ext.define('faceid.controller.PortletContainer', {
    extend: 'Ext.app.Controller',

    views: [
        'ApplicationViewport',
        'ApplicationContainer',
        'PortletContainer',
        'AuthenticationLog',
        'AuthenticationTest',
        'Users'
    ],

    stores: [
        'AuthenticationLog',
        'Users'
    ],

    models: [
        'AuthenticationLog',
        'PanelSettings',
        'User'
    ],

    refs: [
        {
            ref: 'portlets',
            selector: 'faceid-portlet-container'
        }
    ],

    togglePanel: function (button) {
        console.log('action: togglePanel', button);
        var container = this.getPortlets();
        container.showPortlet(button.panelType);
    },

    savePanelPositions: function () {
        console.log('action: savePanelPositions');
    },

    loginTest: function (values) {
        console.log('action: loginTest', values);
        var self = this;
        var portlets = self.getPortlets();

        Ext.Ajax.request({
            url: 'rest/authentication',
            params: values,
            success: function (response) {
                var form = portlets.query('faceid-portlet-logintest form')[0];
                form.getForm().reset();
                self.getAuthenticationLogStore().load();
            }
        });
    },

    init: function () {
        var self = this;

        self.control({
            'faceid-viewport faceid-application-container toolbar button[action=togglePanel]': {
                click: this.togglePanel
            },
            'faceid-viewport faceid-application-container toolbar button[action=save-positions]': {
                click: this.savePanelPositions
            },
            'faceid-portlet-logintest': {
                login: this.loginTest
            }

        });

        self.getUsersStore().load();
        self.getAuthenticationLogStore().load();

    }
});
