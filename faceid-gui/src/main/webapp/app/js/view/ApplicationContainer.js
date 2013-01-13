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

Ext.define('faceid.view.ApplicationContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-application-container',
    layout: 'fit',
    tbar: [
        '->',
        '-',
        {
            action: 'save-positions',
            text: faceid.i18n.get('application.save.positions')
        }
    ],
    items: [
        {
            xtype: 'faceid-portlet-container'
        }
    ],
    initComponent: function () {
        console.log('initComponent', 'ApplicationContainer');
        this.callParent(arguments);
    }
});