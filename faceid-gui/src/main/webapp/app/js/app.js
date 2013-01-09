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
        'faceid.i18n'
    ],

    controllers: [
        'PortletContainer',
    ],

    launch: function () {
        console.log('init application...');

        var title = Ext.get(Ext.dom.Query.selectNode('title'));
        title.update(faceid.i18n.get('application.name'));

        Ext.create('faceid.view.ApplicationViewport');
    }
});