Ext.define('faceid.view.Users', {
    extend: 'faceid.view.Portlet',
    alias: 'widget.faceid-portlet-users',
    title: faceid.i18n.get('application.users'),
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            store: 'Users',
            border: false,
            columns: [
                { text: faceid.i18n.get('user.account'), dataIndex: 'account' },
                { text: faceid.i18n.get('user.name'), dataIndex: 'name', flex: 1 }
            ]
        }
    ],
    tools: [
        {
            itemId: 'refresh',
            type: 'refresh',
            handler: function (event, target, owner) {
                owner.ownerCt.fireEvent('refreshpanel');
            }
        }
    ],
    bbar: [
        {
            action: 'addUser',
            icon: 'app/resources/img/user_add.png'
        },
        {
            action: 'editUser',
            icon: 'app/resources/img/user_edit.png'
        },
        {
            action: 'deleteUser',
            icon: 'app/resources/img/user_delete.png'
        }
    ]
});