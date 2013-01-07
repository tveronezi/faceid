Ext.define('faceid.controller.Users', {
    extend: 'Ext.app.Controller',

    views:['Users'],
    stores: ['Users'],
    models: ['User'],

    init: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
    }
});