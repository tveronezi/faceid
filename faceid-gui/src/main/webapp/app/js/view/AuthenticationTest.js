Ext.define('faceid.view.AuthenticationTest', {
    extend: 'faceid.view.portlets.Portlet',
    title: faceid.i18n.get('application.authenticationTest'),
    layout: 'fit',
    initComponent: function () {
        var form = Ext.widget({
            xtype: 'form',
            layout: 'form',
            frame: true,
            border: false,
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
                    handler: function () {
                        faceid.channel.send('AuthenticationTest', 'authentication-request', form.getValues());
                    },
                    formBind: true
                },
                {
                    text: faceid.i18n.get('cancel'),
                    handler: function () {
                        form.getForm().reset();
                    }
                }
            ]
        });

        Ext.apply(this, {
            items: [form]
        });

        faceid.channel.bind('AuthenticationTest', 'authentication-response', function (data) {
            form.getForm().reset();
        });

        this.callParent(arguments);
    }
});