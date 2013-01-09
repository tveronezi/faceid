Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'faceid': 'app/js'
    }
});

Ext.application({
    name: 'faceid',
    appFolder: 'app/js',

    requires: [
        'faceid.i18n',
        'faceid.channel'
    ],

    controllers: [
        'PortletContainer',
    ],

    launch: function () {
        var title = Ext.get(Ext.dom.Query.selectNode('title'));
        title.update(faceid.i18n.get('application.name'));

        var container = Ext.create('faceid.view.PortletContainer');
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [container]
        });
    }
});