'use strict';

var angular = require('angular');
var TodoListService = require('./todo-list.service');

angular
	.module('myApp.services', [])
	.service('TodoListService', TodoListService);