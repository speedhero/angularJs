module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'vendor/jquery/jquery-1.11.0.min.js',
            'vendor/bootstrap/bootstrap.js',
            'vendor/moment/moment.js',
            'vendor/moment/locate/zh-cn.js',
            'vendor/metisMenu/metisMenu.js',
            'vendor/mousetrap/mousetrap.js',
            'vendor/underscore/underscore-min.js',
            'vendor/angular-file-upload/angular-file-upload-shim.js',
            'vendor/angular/angular.js',
            'vendor/angular-cookies/angular-cookies.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-ui-router/angular-ui-router.js',
            'vendor/angular-file-upload/angular-file-upload.js',
            'vendor/angular-bootstrap-datetimepicker/datetimepicker.js',
            'vendor/ng-table/ng-table.js',
            'vendor/ngDialog/js/ngDialog.js',
            'vendor/ngPopover/ngPopover.js',
            'vendor/angular-hotkeys/angular-hotkeys.js',
            'vendor/angular-xeditable/xeditable.js',
            'vendor/md5/md5.js',
            'vendor/excellentexport/excellentexport.min.js',
            'vendor/angular-mocks/angular-mocks.js',  //important 识别mock各类函数
            'js/main.js',
            'js/config.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};