import { Component } from '@angular/core';
import { PopoverComponent } from '@trash-bin/ui/popover';

@Component({
  standalone: true,
  imports: [PopoverComponent],
  template: `
    <lib-popover position="bottom">
      <!-- Trigger element with popoverTrigger directive -->
      <button popoverTrigger>Click me</button>

      <!-- Content with popoverContent directive -->
      <div popoverContent class="p-4">Your popover content here</div>
    </lib-popover>
  `,
})
export class PopoverDocsComponent {}
