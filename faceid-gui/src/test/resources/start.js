Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'faceid': 'src/main/webapp/app/js',
        'test': 'src/test/javascript/test'
    }
});

// Wrapping it because we don't the "tests" variable available outside this file.
(function () {

    // Don't forget to put a new entry here whenever you add a new test file.
    var tests = [
        'test.I18N'
    ];

    Ext.onReady(function () {
        // Load all the test modules before starting.
        Ext.require(tests, function () {
            jasmine.getEnv().addReporter(
                new jasmine.HtmlReporter()
            );
            // Run tests!
            jasmine.getEnv().execute();
        });
    });

})();
