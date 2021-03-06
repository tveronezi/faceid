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

    Ext.define('faceid.controller.AuthenticationTest', {
        extend: 'Ext.app.Controller',

        views: [
            'AuthenticationTest'
        ],

        refs: [
            {
                ref: 'loginPanel',
                selector: 'faceid-portlet-logintest'
            }
        ],

        loginTest: function (values) {
            console.log('action: loginTest', values);
            var me = this;
            var panel = me.getLoginPanel();

            Ext.Ajax.request({
                url: 'rest/authentication',
                params: values,
                callback: function () {
                    var form = panel.query('form')[0];
                    form.getForm().reset();
                    panel.enable();
                }
            });
        },

        init: function () {
            var me = this;

            me.control({
                'faceid-portlet-logintest': {
                    login: me.loginTest
                }
            });
        }
    });
}());
