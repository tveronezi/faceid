Ext.define('faceid.view.AuthenticationTest', {
    extend: 'faceid.view.Portlet',
    title: faceid.i18n.get('application.authenticationTest'),
    layout: 'fit',
    width: 100,
    height: 50,
    initComponent: function () {
        var form = Ext.widget({
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