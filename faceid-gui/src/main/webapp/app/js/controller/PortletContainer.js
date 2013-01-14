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

    Ext.define('faceid.controller.PortletContainer', {
        extend: 'Ext.app.Controller',

        views: [
            'ApplicationViewport',
            'ApplicationContainer',
            'PortletContainer',
            'AuthenticationLog',
            'AuthenticationTest',
            'Users'
        ],

        stores: [
            'PanelSettings'
        ],

        models: [
            'PanelSettings'
        ],

        refs: [
            {
                ref: 'portlets',
                selector: 'faceid-portlet-container'
            }
        ],

        portletDefaults: {
            'faceid-portlet-users': {
                xtype: 'faceid-portlet-users',
                x: 2,
                y: 29,
                width: 500,
                height: 200
            },
            'faceid-portlet-logintest': {
                xtype: 'faceid-portlet-logintest',
                x: 502,
                y: 29,
                width: 300,
                height: 200
            },
            'faceid-portlet-log': {
                xtype: 'faceid-portlet-log',
                x: 2,
                y: 229,
                width: 800,
                height: 300
            }
        },

        showPortlet: function (xtype, settings) {
            console.log('showPortlet', xtype, settings);
            var container = this.getPortlets();
            if (settings) {
                container.showPortlet(xtype, settings);
            } else {
                var self = this;
                var store = self.getPanelSettingsStore();
                store.load(function (records) {
                    var mySettings = null;
                    Ext.Array.each(records, function (rec) {
                        if (rec.get('portletXtype') === xtype) {
                            mySettings = rec;
                            return false; // break the loop
                        }
                    });
                    if (!mySettings) {
                        mySettings = self.saveSettings(self.portletDefaults[xtype]);
                    }
                    container.showPortlet(xtype, mySettings);
                });
            }
        },

        saveSettings: function (data) {
            var settings = Ext.create('faceid.model.PanelSettings');
            settings.set('portletXtype', data.xtype);
            settings.set('x', data.x);
            settings.set('y', data.y);
            settings.set('width', data.width);
            settings.set('height', data.height);

            console.log('saving portlet settings', settings);

            settings.save();
            return settings;
        },

        savePanelPositions: function () {
            console.log('action: savePanelPositions');
            var self = this;

            // WORKAROUND: removeAll does not work with 'localstorage'.
            // Extjs bug or am I doing something wrong [most likely :O)]?
            self.getPanelSettingsStore().load(function (records) {
                Ext.Array.each(records, function (rec) {
                    rec.destroy();
                });
            });

            var container = self.getPortlets();
            var portlets = container.query('faceid-portlet');
            Ext.Array.each(portlets, function (portlet) {
                if (portlet.isVisible()) {
                    var position = portlet.getPosition();
                    var size = portlet.getSize();

                    self.saveSettings({
                        xtype: portlet.getXType(),
                        x: position[0],
                        y: position[1],
                        width: size.width,
                        height: size.height
                    });
                }
            });
        },

        loadPortlets: function () {
            var self = this;
            self.getPanelSettingsStore().load(function (records, operation, success) {
                var panelSettings = records;
                if (Ext.isEmpty(panelSettings)) {
                    panelSettings = [];
                    console.log('There is no settings found... Using defaults.');
                    panelSettings.push(self.saveSettings(self.portletDefaults['faceid-portlet-users']));
                    panelSettings.push(self.saveSettings(self.portletDefaults['faceid-portlet-logintest']));
                    panelSettings.push(self.saveSettings(self.portletDefaults['faceid-portlet-log']));
                }
                Ext.Array.each(panelSettings, function (rec) {
                    self.showPortlet(rec.get('portletXtype'), rec);
                });
            });
        },

        init: function () {
            var self = this;

            self.control({
                'faceid-viewport faceid-application-container toolbar button[action=togglePanel]': {
                    click: function (button) {
                        self.showPortlet(button.panelType);
                    }
                },
                'faceid-viewport faceid-application-container toolbar button[action=save-positions]': {
                    click: self.savePanelPositions
                },
                'faceid-viewport faceid-application-container': {
                    render: function (thisPanel) {
                        console.log('faceid-application-container rendered', thisPanel);
                        self.loadPortlets();
                    }
                }
            });
        }
    });
}());
