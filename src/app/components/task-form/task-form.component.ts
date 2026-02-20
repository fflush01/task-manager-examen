import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="sendTask()">
      <div class="input-group">
        <input formControlName="title" placeholder="Título de la tarea">
        @if (form.controls.title.invalid && form.controls.title.touched) {
          <small class="error">El título es obligatorio</small>
        }
      </div>

      <select formControlName="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" [disabled]="form.invalid">Agregar Tarea</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
      padding: 20px;
      background: #fdfdfd;
      border-radius: 8px;
      border: 1px dashed #d9d9d9;
      align-items: flex-start;
    }

    .input-group { display: flex; flex-direction: column; gap: 4px; }

    input, select {
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      outline: none;
      font-size: 0.9rem;
      background: white;
    }

    input:focus { border-color: #40a9ff; }

    .error { color: #ff4d4f; font-size: 0.75rem; }

    button {
      background: #262626;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    button:hover:not(:disabled) { background: #404040; }
    button:disabled { background: #d9d9d9; cursor: not-allowed; }
  `]
})
export class TaskFormComponent {
  private readonly _fb = inject(FormBuilder);
  
  public onAddTask = output<Task>();

  public form = this._fb.nonNullable.group({
    title: ['', [Validators.required]],
    priority: ['Low' as 'Low' | 'Medium' | 'High']
  });

  public sendTask(): void {
    if (this.form.invalid) return;
    
    const newTask: Task = {
      ...this.form.getRawValue(),
      completed: false
    };
    
    this.onAddTask.emit(newTask);
    this.form.reset({ priority: 'Low' });
  }
}