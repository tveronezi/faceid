Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'faceid': 'app/js'
    }
});

Ext.require('faceid.i18n');

Ext.application({
    name: 'faceid',
    launch: function () {
        var title =   Ext.get(Ext.dom.Query.selectNode('title'));
        title.update(faceid.i18n.get('application.name'));

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    html: faceid.i18n.get('application.hello', {name: 'UserDTO'})
                }
            ]
        });
    }
});