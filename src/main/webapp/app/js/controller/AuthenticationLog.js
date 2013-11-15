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

    Ext.define('faceid.controller.AuthenticationLog', {
        extend: 'Ext.app.Controller',

        views: [
            'AuthenticationLog'
        ],

        stores: [
            'AuthenticationLog'
        ],

        refs: [
            {
                ref: 'logPanel',
                selector: 'faceid-portlet-log'
            }
        ],

        refreshPanel: function () {
            console.log('action: refreshPanel');
            this.getAuthenticationLogStore().load();
        },

        init: function () {
            var me = this;
            me.control({
                'faceid-portlet-log button[action=refreshPanel]': {
                    click: me.refreshPanel
                },
                'faceid-portlet-log': {
                    refreshpanel: function () {
                        me.getAuthenticationLogStore().load();
                    },
                    render: function () {
                        me.getAuthenticationLogStore().load();
                    }
                }
            });
            me.getApplication().on('authentication-log', function () {
                window.setTimeout(function () {
                    me.getAuthenticationLogStore().load();
                }, 1000);
            });
        }
    });

}());
