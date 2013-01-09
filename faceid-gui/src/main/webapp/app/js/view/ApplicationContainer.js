Ext.define('faceid.view.ApplicationContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-application-container',
    layout: 'fit',
    bodyBorder: false,
    body: false,
    tbar: [
        {
            action: 'togglePanel',
            panelType: 'faceid-portlet-users',
            text: faceid.i18n.get('application.users')
        },
        '-',
        {
            action: 'togglePanel',
            panelType: 'faceid-portlet-log',
            text: faceid.i18n.get('application.log')
        },
        '-',
        {
            action: 'togglePanel',
            panelType: 'faceid-portlet-logintest',
            text: faceid.i18n.get('application.authenticationTest')
        },
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