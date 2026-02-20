// src/app/components/content/content.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { TaskService } from '../../services/tareasservice';
import { TaskFormComponent } from '../tareas-form/tareasform.component';
import { TaskControlsComponent } from '../tareas-controls/tareascontrols.component';
import { TaskCardComponent } from '../tareascard/tareascard.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [TaskFormComponent, TaskControlsComponent, TaskCardComponent],
  template: `
    <main style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      <h2>Gestor de Tareas</h2>
      
      <app-task-form (onAddTask)="taskService.addTask($event)" />
      
      <app-task-controls (onFilterChange)="currentFilter.set($event)" />

      <section>
        @for (item of filteredTasks(); track item.title) {
          <app-task-card [task]="item" (onToggle)="taskService.toggleTask($event)" />
        } @empty {
          <p>No hay tareas en esta vista.</p>
        }
      </section>
    </main>
  `
})
export class ContentComponent {
  public taskService = inject(TaskService);
  public currentFilter = signal<'all' | 'completed' | 'pending'>('all');

  public filteredTasks = computed(() => {
    const allTasks = this.taskService.tasks();
    const filter = this.currentFilter();

    if (filter === 'completed') return allTasks.filter(t => t.completed);
    if (filter === 'pending') return allTasks.filter(t => !t.completed);
    return allTasks;
  });
}