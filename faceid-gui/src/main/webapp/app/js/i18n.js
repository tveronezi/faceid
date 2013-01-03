Ext.define('faceid.i18n', {
    singleton: true,
    get: function (key, values) {
        var template = this.messages[key];
        var cfg = values;
        if (!template) {
            template = this.missing;
            cfg = {
                key: key
            };
            console.error('Missing i18n message.', key);
        }
        return template.apply(cfg);
    },
    constructor: function () {
        var messages = {
            'application.name': 'faceid',
            'application.hello': 'Hello {name}!'
        };

        Ext.Object.each(messages, function (key, value) {
            var t = new Ext.Template(value);
            t.compile();
            messages[key] = t;
        });
        this.messages = messages;
        this.missing = new Ext.Template('![{key}]!');
    }
});