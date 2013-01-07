(function () {
    var requires = [
        'faceid.channel',
        'faceid.model.AuthenticationLog',
        'faceid.model.PanelSettings',
        'faceid.model.User'
    ];

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

    Ext.define('faceid.controller', {
        singleton: true,
        requires: requires,
        constructor: function () {
            Ext.create('Ext.data.Store', {
                storeId: 'users',
                model: 'faceid.model.User'
            });
            Ext.create('Ext.data.Store', {
                storeId: 'authenticationLog',
                model: 'faceid.model.AuthenticationLog'
            });

            faceid.channel.send('application', 'ready', {});

            faceid.channel.bind('portletContainer', 'panelsettings-request', function () {
                var countdown = Ext.create('faceid.countdown', {
                    key: 'PanelSettings',
                    value: 2
                });

                faceid.channel.bind('countdown', 'trigger-PanelSettings', function () {
                    faceid.channel.send('portletContainer', 'panelsettings-loaded', {
                        settings: settings
                    });
                });

                var settings = [];
                createPanelSettings('faceid.view.Users', settings, countdown);
                createPanelSettings('faceid.view.AuthenticationLog', settings, countdown);
            });

            faceid.channel.bind('portletContainer', 'panelsettings-update', function (data) {
                updatePanelSettings(data);
            });
        }
    });
})();
