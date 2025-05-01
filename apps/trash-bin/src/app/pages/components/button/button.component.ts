import { Component } from '@angular/core';
import { ButtonComponent } from '@trash-bin/ui/button';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [ButtonComponent, CodeComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1>Button Component</h1>
      <p>The Button component is a versatile UI element that can be used for various actions.</p>
      
      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Variants</h3>
          <div class="flex gap-4">
            <lib-button>Primary</lib-button>
            <lib-button variant="secondary">Secondary</lib-button>
            <lib-button variant="tertiary">Tertiary</lib-button>
          </div>
          
          <app-code 
            [code]="variantsCode" 
            [language]="'html'">
          </app-code>
        </div>

        <div class="space-y-4">
          <h3>Sizes</h3>
          <div class="flex gap-4 items-center">
            <lib-button size="sm">Small</lib-button>
            <lib-button size="md">Medium</lib-button>
            <lib-button size="lg">Large</lib-button>
          </div>

          <app-code 
            [code]="sizesCode" 
            [language]="'html'">
          </app-code>
        </div>
      </div>
    </div>
  `,
})
export class ButtonDocsComponent {
  variantsCode = `<lib-button>Primary</lib-button>
<lib-button variant="secondary">Secondary</lib-button>
<lib-button variant="tertiary">Tertiary</lib-button>`;

  sizesCode = `<lib-button size="sm">Small</lib-button>
<lib-button size="md">Medium</lib-button>
<lib-button size="lg">Large</lib-button>`;
} 