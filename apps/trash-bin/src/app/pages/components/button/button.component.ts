import { Component } from '@angular/core';
import { ButtonComponent } from '@trash-bin/ui/button';
import { CodeComponent } from '../code/code.component';
import {
  TabsComponent,
  TabPanelComponent,
} from '../../../../lib/tabs/tabs.component';

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, TabsComponent, TabPanelComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1 class="text-4xl font-bold mb-6">Button Component</h1>
      <p>
        The Button component is a versatile UI element that can be used for
        various actions.
      </p>

      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Variants</h3>
          <app-tabs [tabs]="variantTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4">
                  <lib-button>Primary</lib-button>
                  <lib-button variant="secondary">Secondary</lib-button>
                  <lib-button variant="tertiary">Tertiary</lib-button>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="variantsCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>

        <div class="space-y-4">
          <h3>Sizes</h3>
          <app-tabs [tabs]="sizeTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-button size="sm">Small</lib-button>
                  <lib-button size="md">Medium</lib-button>
                  <lib-button size="lg">Large</lib-button>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="sizesCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>
      </div>
    </div>
  `,
})
export class ButtonDocsComponent {
  variantTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  sizeTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  variantsCode = `<lib-button>Primary</lib-button>
<lib-button variant="secondary">Secondary</lib-button>
<lib-button variant="tertiary">Tertiary</lib-button>`;

  sizesCode = `<lib-button size="sm">Small</lib-button>
<lib-button size="md">Medium</lib-button>
<lib-button size="lg">Large</lib-button>`;
}
