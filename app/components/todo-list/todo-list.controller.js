'use strict';

var TodoListController = (function () {
  /*@ngInject*/
  function TodoListController(TodoListService) {
    this.TodoListService = TodoListService;
    this.data = [];
    this.loadDefaultData();
  }

  TodoListController.prototype.loadDefaultData = function () {
    this.data = this.TodoListService.getTodoList();
  }

  TodoListController.prototype.addItem = function (item) {
    this.data.push({
      id: Date.now() + '',
      name: item,
      checked: false,
    })
  }

  TodoListController.prototype.removeItem = function (id) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
        return;
      }
    }
  }

  TodoListController.prototype.removeSelectedItems = function () {

    var i = 0;
    while (i < this.data.length) {
      var x = "123"
      if (this.data[i].checked) {
        this.data.splice(i, 1)
      } else {
        ++i;
      }
    }
  }

  return TodoListController;
})();

module.exports = TodoListController;