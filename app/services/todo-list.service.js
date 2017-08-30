'use strict';

var TodoListService = (function() {
  /*@ngInject*/
  function TodoListService() {
    
  }
  
  TodoListService.prototype.getTodoList = function() {
    return [
      {
        id: '1',
        name: 'Groceries',
        checked: false,
      },
      {
        id: '2',
        name: 'Client Presentation',
        checked: false,
      },
      {
        id: '3',
        name: 'Get A Vet Appointment',
        checked: false,
      }
    ]
  }
  
  return TodoListService;
})();

module.exports = TodoListService;