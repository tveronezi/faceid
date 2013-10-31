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

    Ext.define('faceid.view.AuthenticationLog', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.faceid-portlet-log',
        title: faceid.i18n.get('application.log'),
        layout: 'fit',
        items: [
            {
                xtype: 'grid',
                border: false,
                store: 'AuthenticationLog',
                columns: [
                    {
                        text: faceid.i18n.get('authentication.date'),
                        width: 130,
                        dataIndex: 'timestamp',
                        renderer: function (value) {
                            var date = new Date(value);
                            return Ext.Date.format(date, 'Y-n-j g:i:s A');
                        }
                    },
                    {
                        text: faceid.i18n.get('authentication.account'),
                        dataIndex: 'account',
                        flex: 1
                    },
                    {
                        text: faceid.i18n.get('authentication.type'),
                        dataIndex: 'type',
                        flex: 1,
                        renderer: function (value) {
                            return faceid.i18n.get('authentication.type.' + value);
                        }
                    }
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
        ]
    });
}());
