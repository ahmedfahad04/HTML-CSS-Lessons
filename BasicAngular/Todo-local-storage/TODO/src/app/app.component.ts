import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  todoList: Todo[] = [];
  
  constructor(private todoService: TodoService) {
    this.todoList = todoService.getList();
  }

  // -------------------- Save the list to localStorage
  onAddItem(form: NgForm): void {

    if (form.value.title == ''){
      alert("Please Enter a valid title");
      return;
    }

    this.todoList.push({id: Date.now(), title: form.value.title, isCompleted: false});
    form.resetForm();
    this.todoService.save(this.todoList);
  }

  onToggleDone(id: number): void {
    let todo = this.todoList.filter(x => x.id == id)[0];
    todo.isCompleted = !todo.isCompleted;
    this.todoService.save(this.todoList);
  }

  onRemoveItem(id: number): void {
    let todo = this.todoList.filter(x => x.id == id)[0];
    let index = this.todoList.indexOf(todo, 0);
    if (index > -1) {
      this.todoList.splice(index, 1);
      this.todoService.save(this.todoList);
    }
  }
  // -------------------- Done Saving

  todos: Todo[] = [
    new Todo(1, 'Learn Angular', false), 
    new Todo(2, 'Do SPL2', false),
  ];

  trackId: number = 0;

  onSubmit(form: NgForm) {
    let todo = new Todo(this.trackId, form.value.title, false);
    this.todos.push(todo);
    form.resetForm();
    this.trackId++;
  }

  onComplete(id: number) {
    let todo = this.todos.filter(x => x.id == id)[0];
    todo.isCompleted = !todo.isCompleted;
  }

  onDelete(id: number) {
    let todo = this.todos.filter(x => x.id == id)[0];
    let index = this.todos.indexOf(todo, 0);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }
}
