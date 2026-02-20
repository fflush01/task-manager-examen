import { Component, input, output } from '@angular/core';
import { Task } from '../../interfaces/tareasinterface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  template: `
    <div class="card" [class]="task().priority">
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input 
          type="checkbox" 
          [checked]="task().completed" 
          (change)="onToggle.emit(task().title)" 
        />
        <h3 [class.completed-text]="task().completed" style="margin: 0;">
          {{ task().title }}
        </h3>
      </label>
      <small style="display: block; margin-top: 5px;">Prioridad: {{ task().priority }}</small>
    </div>
  `,
  styles: [`
    .card { padding: 10px; margin-bottom: 8px; background: #f9f9f9; border-radius: 4px; }
    .completed-text { text-decoration: line-through; color: #888; }
    .High { border-left: 5px solid red; }
    .Medium { border-left: 5px solid orange; }
    .Low { border-left: 5px solid green; }
  `]
})
export class TaskCardComponent {
  public task = input.required<Task>();
  
  public onToggle = output<string>(); 
}