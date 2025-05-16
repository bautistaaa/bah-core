import { Component } from '@angular/core';
import { ToggleComponent } from '@trash-bin/ui/toggle';
import { CodeComponent } from '../code/code.component';
import { TabsComponent, TabPanelComponent } from '../../../../lib/tabs/tabs.component';

@Component({
  selector: 'app-toggle-docs',
  standalone: true,
  imports: [ToggleComponent, CodeComponent, TabsComponent, TabPanelComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1 class="text-4xl font-bold mb-6">Toggle Component</h1>
      <p>The Toggle component is a switch control that allows users to toggle between two states.</p>
      
      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Basic Usage</h3>
          <app-tabs [tabs]="basicTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-toggle [(checked)]="isChecked" label="Toggle me"></lib-toggle>
                  <span>Current state: {{isChecked}}</span>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code 
                [code]="basicCode" 
                [language]="'html'">
              </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>

        <div class="space-y-4">
          <h3>Disabled State</h3>
          <app-tabs [tabs]="disabledTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-toggle [disabled]="true" label="Disabled toggle"></lib-toggle>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code 
                [code]="disabledCode" 
                [language]="'html'">
              </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>
      </div>
    </div>
  `,
})
export class ToggleDocsComponent {
  isChecked = false;

  basicTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  disabledTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  basicCode = `<lib-toggle [(checked)]="isChecked" label="Toggle me"></lib-toggle>`;

  disabledCode = `<lib-toggle [disabled]="true" label="Disabled toggle"></lib-toggle>`;
} 