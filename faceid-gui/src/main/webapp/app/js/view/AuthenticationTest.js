Ext.define('faceid.view.AuthenticationTest', {
    extend: 'faceid.view.Portlet',
    alias: 'widget.faceid-portlet-logintest',
    title: faceid.i18n.get('application.authenticationTest'),
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        border: false,
        bodyPadding: 5,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        items: [
            {
                fieldLabel: faceid.i18n.get('authentication.account'),
                name: 'account',
                allowBlank: false
            },
            {
                fieldLabel: faceid.i18n.get('authentication.password'),
                name: 'password',
                inputType: 'password',
                allowBlank: false
            }
        ],
        buttons: [
            {
                text: faceid.i18n.get('ok'),
                formBind: true,
                handler: function(thisBtn) {
                    var self = thisBtn.up('faceid-portlet-logintest');
                    self.fireEvent('login', thisBtn.up('form').getForm().getValues());
                    self.disable();
                }
            },
            {
                text: faceid.i18n.get('cancel'),
                handler: function (thisBtn) {
                    var self = thisBtn.up('faceid-portlet-logintest');
                    self.down('form').getForm().reset();
                }
            }
        ]
    }]
});