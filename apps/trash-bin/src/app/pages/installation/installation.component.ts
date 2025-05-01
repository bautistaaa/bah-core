import { Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  standalone: true,
  template: `
    <div class="prose dark:prose-invert">
      <h1>Installation</h1>
      <p>Follow these steps to install and set up our component library in your project.</p>
      <pre><code>npm install &#64;trash-bin/ui</code></pre>
    </div>
  `,
})
export class InstallationComponent {} 