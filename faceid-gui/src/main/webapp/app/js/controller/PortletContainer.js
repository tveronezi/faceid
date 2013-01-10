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
        'PanelSettings',
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

    showPortlet: function (xtype, settings) {
        console.log('showPortlet', xtype, settings);
        var container = this.getPortlets();
        container.showPortlet(xtype, settings);
    },

    saveSettings: function (data) {
        var settings = Ext.create('faceid.model.PanelSettings');
        settings.set('portletXtype', data.xtype);
        settings.set('x', data.x);
        settings.set('y', data.y);
        settings.set('width', data.width);
        settings.set('height', data.height);

        console.log('saving portlet settings', settings);

        settings.save();
    },

    savePanelPositions: function () {
        console.log('action: savePanelPositions');
        var self = this;
        var store = self.getPanelSettingsStore();
        // WORKAROUND: removeAll does not work with 'localstorage'. Extjs bug?
        store.load(function (records) {
            Ext.Array.each(records, function (rec) {
                rec.destroy();
            });
        });

        var container = self.getPortlets();
        var portlets = container.query('faceid-portlet');
        Ext.Array.each(portlets, function (portlet) {
            var position = portlet.getPosition();
            var size = portlet.getSize();

            self.saveSettings({
                xtype: portlet.getXType(),
                x: position[0],
                y: position[1],
                width: size.width,
                height: size.height
            });
        });
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

    loadPortlets: function () {
        var self = this;
        self.getPanelSettingsStore().load(function (records, operation, success) {
            if (Ext.isEmpty(records)) {
                console.log('There is no settings found... Using defaults.');
                self.saveSettings({
                    xtype: 'faceid-portlet-users',
                    x: 2,
                    y: 29,
                    width: 500,
                    height: 200
                });
                self.saveSettings({
                    xtype: 'faceid-portlet-logintest',
                    x: 502,
                    y: 29,
                    width: 300,
                    height: 200
                });
                self.saveSettings({
                    xtype: 'faceid-portlet-log',
                    x: 2,
                    y: 229,
                    width: 800,
                    height: 300
                });
                self.loadPortlets();
            } else {
                Ext.Array.each(records, function (rec) {
                    self.showPortlet(rec.get('portletXtype'), rec);
                });
            }
        });
    },

    init: function () {
        var self = this;

        self.control({
            'faceid-viewport faceid-application-container toolbar button[action=togglePanel]': {
                click: function (button) {
                    self.showPortlet(button.panelType);
                }
            },
            'faceid-viewport faceid-application-container toolbar button[action=save-positions]': {
                click: self.savePanelPositions
            },
            'faceid-portlet-logintest': {
                login: self.loginTest
            },
            'faceid-viewport faceid-application-container': {
                render: function (thisPanel) {
                    console.log('faceid-application-container rendered', thisPanel);
                    self.loadPortlets();
                }
            }
        });

        self.getUsersStore().load();
        self.getAuthenticationLogStore().load();
    }
});
