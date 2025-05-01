import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-container bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-4">
      <pre class="m-0"><code [class]="language" [innerHTML]="highlightedCode"></code></pre>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .hljs {
        background: transparent;
        color: #24292e;
      }
      
      .dark .hljs {
        color: #e6edf3;
      }
      
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #d73a49;
      }
      
      .dark .hljs-keyword,
      .dark .hljs-selector-tag,
      .dark .hljs-subst {
        color: #ff7b72;
      }
      
      .hljs-string,
      .hljs-doctag {
        color: #032f62;
      }
      
      .dark .hljs-string,
      .dark .hljs-doctag {
        color: #a5d6ff;
      }
      
      .hljs-title,
      .hljs-section,
      .hljs-selector-id {
        color: #6f42c1;
      }
      
      .dark .hljs-title,
      .dark .hljs-section,
      .dark .hljs-selector-id {
        color: #d2a8ff;
      }
      
      .hljs-attr,
      .hljs-attribute {
        color: #005cc5;
      }
      
      .dark .hljs-attr,
      .dark .hljs-attribute {
        color: #79c0ff;
      }
      
      .hljs-symbol,
      .hljs-bullet,
      .hljs-built_in,
      .hljs-addition,
      .hljs-variable,
      .hljs-template-variable {
        color: #22863a;
      }
      
      .dark .hljs-symbol,
      .dark .hljs-bullet,
      .dark .hljs-built_in,
      .dark .hljs-addition,
      .dark .hljs-variable,
      .dark .hljs-template-variable {
        color: #7ee787;
      }
      
      .hljs-comment,
      .hljs-quote,
      .hljs-deletion {
        color: #6a737d;
      }
      
      .dark .hljs-comment,
      .dark .hljs-quote,
      .dark .hljs-deletion {
        color: #8b949e;
      }
    }
    
    pre {
      white-space: pre-wrap;
    }
    
    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      font-size: 14px;
      line-height: 1.5;
    }
  `]
})
export class CodeComponent implements OnInit {
  @Input() code = '';
  @Input() language = 'typescript';
  highlightedCode = '';

  ngOnInit() {
    this.highlightCode();
  }

  private highlightCode() {
    try {
      this.highlightedCode = hljs.highlight(this.code, { language: this.language }).value;
    } catch (error) {
      console.error('Error highlighting code:', error);
      this.highlightedCode = this.code;
    }
  }
} 