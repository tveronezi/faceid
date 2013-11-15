/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function () {
    'use strict';

    var DELAY = 1000 * 60 * 4; // 4 minutes
    var timeoutKey = null;

    function scheduleNext(now) {
        var timeoutCallback = function () {
            Ext.Ajax.request({
                'url': window.ROOT_URL + 'rest/keep-alive',
                success: function (response, opts) {
                    scheduleNext();
                },
                failure: function (response, opts) {
                    window.console.error('keep-alive callback error.');
                    window.setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }
            });
        };
        if (timeoutKey !== null) {
            window.clearInterval(timeoutKey);
            window.console.log('keep-alive callback canceled.', timeoutKey);
            timeoutKey = null;
        }
        if (now) {
            timeoutCallback();
        } else {
            timeoutKey = window.setTimeout(timeoutCallback, DELAY);
        }

        window.console.log('keep-alive callback created.', timeoutKey);
    }

    Ext.define('faceid.controller.KeepAlive', {
        extend: 'Ext.app.Controller',
        connectSocket: function () {
            var me = this;
            var location = window.location;
            var wsPath = 'ws://' + location.hostname + ':' + location.port + window.ROOT_URL + 'ws/connection';
            var connection = new window.WebSocket(wsPath);
            connection.onopen = function () {
                window.console.log('WebSocket: connection started.');
            };
            connection.onerror = function (error) {
                window.location.reload(); // reload application
            };
            connection.onmessage = function (e) {
                try {
                    var evtData = Ext.JSON.decode(e.data);
                    me.getApplication().fireEvent(evtData.type, evtData.data);
                } catch (ex) {
                    window.console.error('WebSocket: parse -> ' + ex);
                }
                window.console.log('WebSocket: message -> ' + e.data);
            };
        },
        init: function () {
            var me = this;
            me.connectSocket();
            scheduleNext(true);
            Ext.Ajax.on('beforerequest', function () {
                scheduleNext();
            });
        }
    });

}());