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

    Ext.define('faceid.view.UserView', {
        extend: 'Ext.window.Window',
        alias: 'widget.faceid-userview',
        title: faceid.i18n.get('application.user.edit'),
        height: 200,
        width: 400,
        layout: 'fit',
        modal: true,
        border: false,
        items: [
            {
                xtype: 'form',
                frame: false,
                defaults: {
                    anchor: '100%'
                },
                bodyPadding: '5 5 5 5',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: faceid.i18n.get('user.name'),
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'account',
                        fieldLabel: faceid.i18n.get('user.account'),
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'password',
                        fieldLabel: faceid.i18n.get('user.password'),
                        inputType: 'password'
                    },
                    {
                        xtype: 'textfield',
                        name: 'groups',
                        fieldLabel: faceid.i18n.get('user.groups'),
                        allowBlank: true
                    }
                ]
            }
        ],
        buttons: [
            {
                text: faceid.i18n.get('ok'),
                formBind: true,
                action: 'saveUser'
            },
            {
                text: faceid.i18n.get('cancel'),
                handler: function (thisBtn) {
                    var self = thisBtn.up('faceid-userview');
                    self.close();
                }
            }
        ]
    });
}());
