/* globals QUnit, test, asyncTest */
(function (global) {

    // block QUnit to try autostart without being ready
    global.QUnit.config.autostart = false;

    // jquery no conflict 
    var $$ = global.$$ = global.jQuery.noConflict(true);

    /**
     * Utility helpers.
     *
     *   * `log` Function - wrapper to allow logs to be output without causing browser error
     *   * `__hasProp` Function - checking for properties that are not part of prototype
     *   * `__extends` Function - extending object and adding constructor reference
     *
     * @api public
     */
    var UTILS = {
        log: function (s) {
            if (global.console) {
                console.log(s);
            }
        },
        registerTest: function (name, test) {
            global.QUnitRunner.registerTest(name, test);
        },
        __hasProp: Object.prototype.hasOwnProperty,
        __extends: function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) {
                    child[key] = parent[key];
                }
            }

            function CTor() {
                this.constructor = child;
            }
            if (parent.prototype) {
                CTor.prototype = parent.prototype;
                child.prototype = new CTor();
                child.__super__ = parent.prototype;
            }
            return child;
        }
    },
        log = UTILS.log,
        registerTest = UTILS.registerTest,
        __hasProp = UTILS.__hasProp,
        __extends = UTILS.__extends;

    // poluting namespace
    // TODO: maybe get rid of this and just add UTILS to

    global.log = log;
    global.registerTest = registerTest;

    // create our singleton / factory
    global.QUnitRunner = new global.QUnitRunnerClass();

    // TODO: create a nicer method to wrap this startup
    // start runner with json config file
    $$(function () {

        // read configuration from a file called 'config.json'
        $$.getJSON('config.json', function (data) {

            global.QUnitRunner.start($$.extend({}, {
                workspace: window.frames[0],
                jQuery: $$
            }, data));
        })
            .fail(function () {
                global.alert(
                    "Failed to load config.json, please make sure this file exist and it is correctly formatted."
                );
            });

    });

}(this));
