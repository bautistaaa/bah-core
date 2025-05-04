import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  standalone: true,
  template: `
    <div class="prose dark:prose-invert">
      <h1 class="text-4xl font-bold mb-6">Introduction</h1>
      <p>Welcome to our component library documentation. This guide will help you get started with our UI components.</p>
    </div>
  `,
})
export class IntroductionComponent {} 