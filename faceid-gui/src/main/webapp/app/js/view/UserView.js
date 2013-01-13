Ext.define('faceid.view.UserView', {
    extend: 'Ext.window.Window',
    alias: 'widget.faceid-userview',
    title: faceid.i18n.get('application.user.edit'),
    height: 200,
    width: 400,
    bodyPadding: 5,
    layout: 'form',
    modal: true,
    items: [
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'User Name',
            allowBlank: false,
            minLength: 6
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email Address',
            vtype: 'email',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'password1',
            fieldLabel: 'Password',
            inputType: 'password',
            style: 'margin-top:15px',
            allowBlank: false,
            minLength: 8
        }
    ]
});