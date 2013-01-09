Ext.define('faceid.controller.PortletContainer', {
    extend: 'Ext.app.Controller',
    requires: ['faceid.channel'],

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

    init: function () {
        var self = this;

        self.control({
            'faceid-viewport faceid-application-container toolbar button[action=togglePanel]': {
                click: this.togglePanel
            },
            'faceid-viewport faceid-application-container toolbar button[action=save-positions]': {
                click: this.savePanelPositions
            }

        });

        self.getUsersStore().load();
        self.getAuthenticationLogStore().load();

    }
});
