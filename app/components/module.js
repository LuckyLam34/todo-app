'use strict';

var angular = require('angular');
var TodoListController = require('./todo-list/todo-list.controller');

angular
	.module('myApp.components', [])
	.controller('TodoListController', TodoListController)
	.config(/*@ngInject*/function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'todoList',
        url: '/',
        templateUrl: 'app/components/todo-list/todo-list.html',
        controller: 'TodoListController',
        controllerAs: 'vm'
      });
      // .state({
      //   name: 'hotelDetail',
      //   url: '/hotels/:id',
      //   data: { isAdmin: false },
      //   templateUrl: 'app/components/hotel/hotel-detail/hotel-detail.html',
      //   controller: 'HotelDetailController',
      //   controllerAs: 'hotelDetail'
      // })
    $urlRouterProvider.otherwise('/');
	});