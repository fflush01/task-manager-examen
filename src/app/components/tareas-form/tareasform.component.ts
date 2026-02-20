import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../interfaces/tareasinterface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="sendTask()">
      <div class="input-container">
        <input 
          formControlName="title" 
          placeholder="¿Qué hay que hacer?" 
          class="main-input"
        >
        @if (form.controls.title.invalid && form.controls.title.touched) {
          <span class="error-msg">Dato requerido</span>
        }
      </div>

      <div class="actions">
        <select formControlName="priority" class="minimal-select">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit" [disabled]="form.invalid" class="add-btn">
          <span>+</span> Agregar
        </button>
      </div>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
      padding: 0 4px; /* Sin bordes externos para máxima limpieza */
    }

    .input-container {
      display: flex;
      flex-direction: column;
    }

    .main-input {
      border: none;
      border-bottom: 2px solid #eee;
      padding: 12px 0;
      font-size: 1.2rem;
      font-weight: 300;
      outline: none;
      transition: border-color 0.3s;
      background: transparent;
    }

    .main-input:focus {
      border-bottom-color: #262626;
    }

    .actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
    }

    .minimal-select {
      border: 1px solid #eee;
      background: #f9f9f9;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      color: #666;
      cursor: pointer;
      outline: none;
    }

    .add-btn {
      background: #262626;
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 20px; /* Estilo de botón tipo 'pill' */
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.1s;
    }

    .add-btn:active { transform: scale(0.95); }
    .add-btn:disabled { background: #eee; color: #aaa; cursor: not-allowed; }

    .error-msg {
      color: #ff4d4f;
      font-size: 0.7rem;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
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