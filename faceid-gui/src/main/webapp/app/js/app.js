Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'faceid': 'app/js'
    }
});

Ext.require('faceid.i18n');

Ext.application({
    name: 'faceid',
    appFolder: 'app/js',
    controllers: [
        'Users'
    ],
    launch: function () {
        var title = Ext.get(Ext.dom.Query.selectNode('title'));
        title.update(faceid.i18n.get('application.name'));

        var container = Ext.create('faceid.view.portlets.PortletContainer');
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [container]
        });
    }
});

//Ext.onReady(function () {
//    var title = Ext.get(Ext.dom.Query.selectNode('title'));
//    title.update(faceid.i18n.get('application.name'));
//
//    var container = Ext.create('faceid.view.portlets.PortletContainer');
//    Ext.create('Ext.container.Viewport', {
//        layout: 'fit',
//        items: [container]
//    });
//});