import { Component } from '@angular/core';
import { ToggleComponent } from '@trash-bin/ui/toggle';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-toggle-docs',
  standalone: true,
  imports: [ToggleComponent, CodeComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1>Toggle Component</h1>
      <p>The Toggle component is a switch control that allows users to toggle between two states.</p>
      
      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Basic Usage</h3>
          <div class="flex gap-4 items-center">
            <lib-toggle [(checked)]="isChecked" label="Toggle me"></lib-toggle>
            <span>Current state: {{isChecked}}</span>
          </div>
          
          <app-code 
            [code]="basicCode" 
            [language]="'html'">
          </app-code>
        </div>

        <div class="space-y-4">
          <h3>Disabled State</h3>
          <div class="flex gap-4 items-center">
            <lib-toggle [disabled]="true" label="Disabled toggle"></lib-toggle>
          </div>

          <app-code 
            [code]="disabledCode" 
            [language]="'html'">
          </app-code>
        </div>
      </div>
    </div>
  `,
})
export class ToggleDocsComponent {
  isChecked = false;

  basicCode = `<lib-toggle [(checked)]="isChecked" label="Toggle me"></lib-toggle>`;

  disabledCode = `<lib-toggle [disabled]="true" label="Disabled toggle"></lib-toggle>`;
} 