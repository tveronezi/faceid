Ext.define('faceid.view.ApplicationContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-application-container',
    layout: 'fit',
    tbar: [
        '->',
        '-',
        {
            action: 'save-positions',
            text: faceid.i18n.get('application.save.positions')
        }
    ],
    items: [
        {
            xtype: 'faceid-portlet-container'
        }
    ],
    initComponent: function () {
        console.log('initComponent', 'ApplicationContainer');
        this.callParent(arguments);
    }
});