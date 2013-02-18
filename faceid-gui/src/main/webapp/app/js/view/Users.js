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

    Ext.define('faceid.view.Users', {
        extend: 'faceid.view.Portlet',
        alias: 'widget.faceid-portlet-users',
        title: faceid.i18n.get('application.users'),
        layout: 'fit',
        items: [
            {
                xtype: 'grid',
                store: 'Users',
                border: false,
                columns: [
                    {
                        text: faceid.i18n.get('user.account'),
                        dataIndex: 'account',
                        width: '100px'
                    },
                    {
                        text: faceid.i18n.get('user.name'),
                        dataIndex: 'name',
                        width: '100px'
                    },
                    {
                        text: faceid.i18n.get('user.groups'),
                        dataIndex: 'groups',
                        flex: 1
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
        ],
        bbar: [
            {
                action: 'addUser',
                icon: 'app/resources/img/user_add.png'
            },
            {
                action: 'editUser',
                icon: 'app/resources/img/user_edit.png'
            },
            {
                action: 'deleteUser',
                icon: 'app/resources/img/user_delete.png'
            }
        ]
    });
}());
