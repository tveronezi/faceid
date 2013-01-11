Ext.define('test.PortletContainerController', {
    singleton: true,
    requires: ['faceid.controller.PortletContainer'],
    constructor: function () {
        describe('PortletContainerController test', function () {
            var oExtCreateFn;

            beforeEach(function () {
                oExtCreateFn = Ext.create;
            });

            afterEach(function () {
                Ext.create = oExtCreateFn;
            });

            it('should save the settings', function () {
                var saveExecuted = false;
                var data = {
                    xtype: 'my-xtype',
                    x: 1,
                    y: 2,
                    width: 3,
                    height: 4
                };
                Ext.create = function (name, args) {
                    var obj = oExtCreateFn(name, args);
                    if (name === 'faceid.model.PanelSettings') {
                        obj.save = function () {
                            saveExecuted = true;
                            expect(this.get('portletXtype')).toBe(data.xtype);
                            expect(this.get('x')).toBe(data.x);
                            expect(this.get('y')).toBe(data.y);
                            expect(this.get('width')).toBe(data.width);
                            expect(this.get('height')).toBe(data.height);
                        };
                    }
                    return obj;
                };

                var definition = classDefinitions['faceid.controller.PortletContainer'];
                var settings = definition.saveSettings(data);
                expect(settings).not.toBe(null);
            });
        });
    }
});


