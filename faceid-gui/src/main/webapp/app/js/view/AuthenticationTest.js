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

    Ext.define('faceid.view.AuthenticationTest', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.faceid-portlet-logintest',
        title: faceid.i18n.get('application.authenticationTest'),
        layout: 'fit',
        items: [
            {
                xtype: 'form',
                layout: 'form',
                border: false,
                bodyPadding: 5,
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 75
                },
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: faceid.i18n.get('authentication.account'),
                        name: 'account',
                        allowBlank: false
                    },
                    {
                        fieldLabel: faceid.i18n.get('authentication.password'),
                        name: 'password',
                        inputType: 'password',
                        allowBlank: false
                    }
                ],
                buttons: [
                    {
                        text: faceid.i18n.get('ok'),
                        formBind: true,
                        handler: function (thisBtn) {
                            var me = thisBtn.up('faceid-portlet-logintest');
                            me.fireEvent('login', thisBtn.up('form').getForm().getValues());
                            me.disable();
                        }
                    },
                    {
                        text: faceid.i18n.get('cancel'),
                        handler: function (thisBtn) {
                            var me = thisBtn.up('faceid-portlet-logintest');
                            me.down('form').getForm().reset();
                        }
                    }
                ]
            }
        ]
    });
}());
