// Wozi App
// ========
// Author: Thomas Derflinger

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        db = $cordovaSQLite.openDB({name: "vocs.db", location:"default"});
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS vocabulary (id integer primary key, source text, dest text, cat integer)");
        console.log("aftr voc.db");
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);
    
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/vocs',
            views: {
                'tab-chats': {
                    cache: false,
                    templateUrl: 'templates/tab-vocs.html',
                    controller: 'VocsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/vocs/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/voc-detail.html',
                    controller: 'VocDetailCtrl'
                }
            }
        })

    .state('tab.learn', {
        url: '/learn',
        views: {
            'tab-learn': {
                templateUrl: 'templates/tab-learn.html',
                controller: 'LearnCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

});