Ext.define('faceid.model.PanelSettings', {
    extend: 'Ext.data.Model',
    fields: ['panel', 'x', 'y', 'width', 'height'],
    idProperty: 'panel',
    proxy: {
        type: 'localstorage',
        id: 'faceid-PanelSettings'
    }
});