Ext.define('faceid.model.PanelSettings', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'portletXtype'
        },
        {
            name: 'x',
            type: 'int'
        },
        {
            name: 'y',
            type: 'int'
        },
        {
            name: 'width',
            type: 'int'
        },
        {
            name: 'height',
            type: 'int'
        }
    ],
    proxy: {
        type: 'localstorage',
        id: 'faceid-p-settings'
    }
});