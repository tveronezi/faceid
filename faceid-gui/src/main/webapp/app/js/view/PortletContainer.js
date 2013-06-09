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

    Ext.define('faceid.view.PortletContainer', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.faceid-portlet-container',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        border: false,
        items: [
            {
                width: '100%',
                flex: 1,
                border: false,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        padding: '5 5 5 5',
                        xtype: 'faceid-portlet-log',
                        flex: 1
                    },
                    {
                        padding: '5 5 5 0',
                        border: false,
                        xtype: 'panel',
                        width: 300,
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'faceid-portlet-logintest',
                                width: '100%',
                                height: 145
                            }
                        ]
                    }
                ]
            },
            {
                padding: '0 5 5 5',
                xtype: 'faceid-portlet-users',
                width: '100%',
                flex: 1
            }
        ]
    });
}());
