import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/tareasinterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  #tasks = signal<Task[]>([]);

  public tasks = this.#tasks.asReadonly();

  public addTask(task: Task): void {
    this.#tasks.update((currentTasks) => [...currentTasks, task]);
  }
  public toggleTask(taskTitle: string): void {
    this.#tasks.update((currentTasks) =>
      currentTasks.map(task => 
        task.title === taskTitle ? { ...task, completed: !task.completed } : task
      )
    );
  }
}

