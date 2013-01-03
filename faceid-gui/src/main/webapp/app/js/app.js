Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'faceid': 'app/js'
    }
});

Ext.require('faceid.i18n');

Ext.application({
    name: 'HelloExt',
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: faceid.i18n.get('application.name'),
                    html: faceid.i18n.get('application.hello', {name: 'User'})
                }
            ]
        });
    }
});