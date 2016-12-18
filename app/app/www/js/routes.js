angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.estudiants', {
    cache: false,
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/estudiants.html',
        controller: 'estudiantsCtrl'
      }
    }
  })

  .state('menu.assignatures', {
    cache: false,
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/assignatures.html',
        controller: 'assignaturesCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
    .state('menu.modificarEstudiant', {
      url: '/page4/:id',
      views: {
        'side-menu21': {
          templateUrl: 'templates/modificarEstudiant.html',
          controller: 'modificarEstudiantCtrl'
        }
      }
    }).state('menu.filtr', {
    url: '/page5',
    views: {
      'side-menu21': {
    templateUrl: 'templates/filtr.html',
    controller: 'filtrCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')



});
