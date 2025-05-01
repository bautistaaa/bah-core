import { Component } from '@angular/core';

@Component({
  selector: 'app-theming',
  standalone: true,
  template: `
    <div class="prose dark:prose-invert">
      <h1>Theming</h1>
      <p>Learn how to customize the look and feel of our components to match your brand.</p>
    </div>
  `,
})
export class ThemingComponent {} 