Ext.define('faceid.controller.PortletContainer', {
    extend: 'Ext.app.Controller',
    requires: ['faceid.channel'],

    views: [
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

    init: function () {
        var self = this;

        self.control({

        });

        function updatePanelSettings(data) {
            var PanelSettings = Ext.ModelManager.getModel('faceid.model.PanelSettings');
            PanelSettings.load(data.panel, {
                callback: function (bean) {
                    console.log('PanelSetting loaded.', bean);
                    bean.set('x', data.x);
                    bean.set('y', data.y);
                    bean.set('height', data.height);
                    bean.set('width', data.width);
                    bean.save();
                }
            });
        }

        function createPanelSettings(cls, all, countdown) {
            var PanelSettings = Ext.ModelManager.getModel('faceid.model.PanelSettings');
            PanelSettings.load(cls, {
                callback: function (bean) {
                    console.log('PanelSetting loaded.', bean);
                    var result = bean;
                    if (!result) {
                        result = Ext.create('faceid.model.PanelSettings', {
                            'panel': cls
                        });
                        result.save();
                    }
                    all.push(result);
                    countdown.countdown();
                }
            });
        }


        faceid.channel.bind('portletContainer', 'all-panelsettings-request', function () {
            var panels = [
                'faceid.view.Users',
                'faceid.view.AuthenticationLog',
                'faceid.view.AuthenticationTest'
            ];
            var countdown = Ext.create('faceid.countdown', {
                key: 'PanelSettings',
                value: panels.length
            });

            faceid.channel.bind('countdown', 'trigger-PanelSettings', function () {
                faceid.channel.send('portletContainer', 'all-panelsettings-loaded', {
                    settings: settings
                });
            });

            var settings = [];
            Ext.Array.each(panels, function (clsName) {
                createPanelSettings(clsName, settings, countdown);
            });
        });

        faceid.channel.bind('portletContainer', 'panelsettings-update', function (data) {
            updatePanelSettings(data);
        });

        faceid.channel.bind('AuthenticationTest', 'authentication-request', function (data) {
            Ext.Ajax.request({
                method: 'POST',
                url: 'rest/authentication',
                params: data,
                success: function (response) {
                    var text = response.responseText;
                    faceid.channel.send('AuthenticationTest', 'authentication-response', {
                        success: (text === 'true')
                    });
                }
            });
        });

        faceid.channel.bind('AuthenticationTest', 'authentication-response', function (data) {
            self.getAuthenticationLogStore().load();
        });

        faceid.channel.bind('portletContainer', 'panelsettings-request', function (data) {
            var panel = data.panel;
            var PanelSettings = Ext.ModelManager.getModel('faceid.model.PanelSettings');
            PanelSettings.load(Ext.ClassManager.getName(panel), {
                callback: function (bean) {
                    console.log('PanelSetting loaded.', bean);
                    faceid.channel.send('portletContainer', 'panelsettings-response', {
                        panel: panel,
                        settings: bean
                    });
                }
            });
        });

        self.getUsersStore().load();
        self.getAuthenticationLogStore().load();

        faceid.channel.send('application', 'ready', {});
    }
});
