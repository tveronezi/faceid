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

    Ext.define('faceid.view.Information', {
        extend: 'Ext.window.Window',
        alias: 'widget.faceid-information-window',
        title: faceid.i18n.get('application.about'),
        height: 200,
        width: 500,
        layout: 'fit',
        modal: true,
        items: {
            xtype: 'panel',
            border: false,
            autoScroll: true,
            loader: {
                url: 'app/js/view/about.html',
                autoLoad: true
            }
        }
    });
}());
