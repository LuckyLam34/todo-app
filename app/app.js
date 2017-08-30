'use strict';

var angular = require('angular');

//------ require all the needed modules here
require('./components/module');
require('./services/module');

angular
  .module('myApp', [
    require('angular-animate'),
    require('angular-ui-bootstrap'),
    require('angular-ui-router'),

    'myApp.services',
    'myApp.components'
  ])
 .config(/*@ngInject*/function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  });

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
