Ext.define('test.I18N', {
    singleton: true,
    requires: ['faceid.i18n'],
    constructor: function () {
        describe('I18N test', function () {
            it('should show the application name', function () {
                var str = faceid.i18n.get('application.name');
                expect(str).toEqual('faceid');
            });
            it('should show the parameterized message', function () {
                var str = faceid.i18n.get('test.with.param', {
                    myParam: 'Yeah'
                });
                expect(str).toEqual('This is for test only. Yeah!');
            });
        });
    }
});


