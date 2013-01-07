Ext.define('faceid.countdown', {
    require: ['faceid.channel'],
    config: {
        key: 'default',
        value: 0
    },
    countdown: function () {
        this.value = this.value - 1;
        if (this.value < 1) {
            faceid.channel.send('countdown', 'trigger-' + this.key, {});
        }
    },
    constructor: function(cfg) {
        this.initConfig(cfg);
    }
});
