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

    Ext.define('faceid.controller.Users', {
        extend: 'Ext.app.Controller',

        views: [
            'Users',
            'UserView'
        ],

        stores: [
            'Users'
        ],

        models: [
            'User'
        ],

        refs: [
            {
                ref: 'userView',
                selector: 'faceid-userview'
            },
            {
                ref: 'usersList',
                selector: 'faceid-portlet-users'
            }
        ],

        saveUser: function (user) {
            console.log('saveUser event', user);

            var me = this;
            user.save({
                success: function () {
                    console.log('user persisted', user);
                    me.getUsersStore().load();
                    me.getUserView().close();
                }
            });
            return user;
        },

        showUser: function (rec) {
            console.log('show user window', rec);
            var user = rec;
            var window = Ext.create('widget.faceid-userview', {});
            window.show();

            var form = window.down('form');
            if (user) {
                var accountField = form.down('[name=account]');
                accountField.disable();
            } else {
                user = Ext.create('faceid.model.User');
            }

            form.loadRecord(user);

        },

        getSelectedUser: function () {
            var me = this;
            var grid = me.getUsersList().down('grid');
            var sm = grid.getSelectionModel();
            if (sm.getCount() < 1) {
                return;
            }
            var selection = sm.getSelection();
            return selection[0];
        },

        addUser: function () {
            console.log('addUser event');
            var me = this;
            me.showUser(null);
        },

        editUser: function () {
            console.log('editUser event');
            var me = this;
            var selected = me.getSelectedUser();
            if (!selected) {
                return;
            }
            me.showUser(selected);
        },

        deleteUser: function () {
            console.log('deleteUser event');

            var me = this;
            var selected = me.getSelectedUser();
            if (!selected) {
                return;
            }

            selected.destroy({
                success: function () {
                    console.log('user removed', selected);
                    me.getUsersStore().load();
                }
            });
        },

        init: function () {
            var me = this;

            me.control({
                'faceid-userview button[action=saveUser]': {
                    click: function (theButton) {
                        var window = theButton.up('window');
                        var form = window.down('form');
                        var rec = form.getRecord();
                        var values = form.getValues();
                        Ext.Object.each(values, function (key, value) {
                            rec.set(key, value);
                        });
                        me.saveUser(rec);
                    }
                },
                'faceid-portlet-users button[action=addUser]': {
                    click: me.addUser
                },
                'faceid-portlet-users button[action=editUser]': {
                    click: me.editUser
                },
                'faceid-portlet-users button[action=deleteUser]': {
                    click: me.deleteUser
                },
                'faceid-portlet-users': {
                    refreshpanel: function () {
                        me.getUsersStore().load();
                    },
                    'render': function () {
                        me.getUsersStore().load();
                    }
                }
            });
        }
    });
}());
