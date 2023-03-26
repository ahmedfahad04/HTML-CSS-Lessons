import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private readonly STORAGE_KEY = 'todo_list';
  
  save(list: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  }
  
  getList(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
