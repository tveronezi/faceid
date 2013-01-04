Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'faceid': 'app/js'
    }
});

Ext.require('faceid.i18n');

Ext.onReady(function () {
    var title = Ext.get(Ext.dom.Query.selectNode('title'));
    title.update(faceid.i18n.get('application.name'));

    var container = Ext.create('faceid.portlets.PortletContainer');
    Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [container]
    });
});