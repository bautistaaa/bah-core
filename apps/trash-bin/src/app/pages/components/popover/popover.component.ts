import { Component } from '@angular/core';
import { PopoverComponent } from '@trash-bin/ui/popover';
import { CodeComponent } from '../code/code.component';
import {
  TabsComponent,
  TabPanelComponent,
} from '../../../../lib/tabs/tabs.component';

@Component({
  selector: 'app-popover-docs',
  standalone: true,
  imports: [PopoverComponent, CodeComponent, TabsComponent, TabPanelComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1 class="text-4xl font-bold mb-6">Popover Component</h1>
      <p>The Popover component provides a floating element that can be used to display additional content or actions.</p>
      
      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Basic Usage</h3>
          <app-tabs [tabs]="basicTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-popover position="bottom">
                    <button popoverTrigger class="cursor-pointer">Click me</button>
                    <div popoverContent class="p-4">Your popover content here</div>
                  </lib-popover>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="basicCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>
      </div>
    </div>
  `,
})
export class PopoverDocsComponent {
  basicTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  basicCode = `<lib-popover position="bottom">
  <button popoverTrigger class="cursor-pointer">Click me</button>
  <div popoverContent class="p-4">Your popover content here</div>
</lib-popover>`;
}
