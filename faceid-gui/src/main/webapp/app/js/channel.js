(function () {
    Ext.define('faceid.channel', {
        singleton: true,
        constructor: function () {
            var channels = {};

            function createChannel(channelName) {
                var name = channelName;
                var listeners = {};

                /**
                 * Bind a listener to a given message
                 *
                 * @param messageKey this is the messageKey sent by another object
                 * @param callback this is your callback function. It contains one
                 * parameter with all values sent by the sender object
                 */
                function bind(messageKey, callback) {
                    var myListeners = listeners[messageKey];

                    //avoiding "NullPointerException"
                    if (!myListeners) {
                        myListeners = [];
                        listeners[messageKey] = myListeners;
                    }

                    if (myListeners.indexOf(callback) < 0) {
                        myListeners.push(callback);
                    }
                }

                /**
                 * Unbind a listener to a given message
                 *
                 * @param messageKey this is the messageKey sent by another object
                 */
                function unbind(messageKey) {
                    if (!listeners[messageKey]) {
                        return;
                    }
                    delete listeners[messageKey];
                }

                function unbindAll() {
                    Ext.Object.each(listeners, function (key) {
                        unbind(key);
                    });
                }

                /**
                 * Send a message
                 *
                 * @param messageKey your message key
                 * @param paramsObj the parameters to the listeners callback methods
                 */
                function send(messageKey, paramsObj) {
                    var hasListeners = false;
                    if (listeners[messageKey] && listeners[messageKey].length > 0) {
                        hasListeners = true;
                    }
                    console.log(
                        'Channel', name,
                        'key', messageKey,
                        'Parameters', paramsObj,
                        'Listeners available',
                        hasListeners
                    );

                    if (!hasListeners) {
                        return {
                            consumed: false
                        };
                    }

                    var myListeners = listeners[messageKey];

                    //the safeParamsObj will never be null or undefined
                    var safeParamsObj = paramsObj;
                    if (!safeParamsObj) {
                        safeParamsObj = {};
                    }

                    Ext.Array.each(myListeners, function (callback) {
                        callback(safeParamsObj);
                    });

                    return {
                        consumed: true
                    };
                }

                return {
                    bind: bind,
                    unbind: unbind,
                    unbindAll: unbindAll,
                    send: send
                };
            }

            function getChannel(name) {
                if (!channels[name]) {
                    channels[name] = createChannel(name);
                }
                return channels[name];
            }

            function unbindAll(name) {
                if (name) {
                    console.log('Unbinding all the listeners of "' + name + '"');
                    getChannel(name).unbindAll();
                } else {
                    console.warn('You are zapping all the channels and listeners!');
                    Ext.Object.each(channels, function (key) {
                        getChannel(key).unbindAll();
                    });
                }
            }

            this.bind = function (name, key, callback) {
                getChannel(name).bind(key, callback);
            };
            this.unbind = function (name, key) {
                getChannel(name).unbind(key);
            };
            this.unbindAll = unbindAll;
            this.send = function (name, key, data) {
                return getChannel(name).send(key, data);
            };

        }
    });
})();
