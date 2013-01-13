Ext.define('faceid.view.UserView', {
    extend: 'Ext.window.Window',
    alias: 'widget.faceid-userview',
    title: faceid.i18n.get('application.user.edit'),
    height: 150,
    width: 400,
    layout: 'fit',
    modal: true,
    border: false,
    items: [
        {
            xtype: 'form',
            frame: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'userName',
                    fieldLabel: faceid.i18n.get('user.name'),
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'userAccount',
                    fieldLabel: faceid.i18n.get('user.account'),
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'userPassword',
                    fieldLabel: faceid.i18n.get('user.password'),
                    inputType: 'password',
                    allowBlank: false
                }
            ]
        }
    ],
    buttons: [
        {
            text: faceid.i18n.get('ok'),
            formBind: true,
            handler: function (thisBtn) {
                var self = thisBtn.up('faceid-userview');
                self.fireEvent('saveUser', self.down('form').getForm().getValues());
                self.close();
            }
        },
        {
            text: faceid.i18n.get('cancel'),
            handler: function (thisBtn) {
                var self = thisBtn.up('faceid-userview');
                self.close();
            }
        }
    ]
});