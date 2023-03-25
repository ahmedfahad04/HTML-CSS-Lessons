import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
