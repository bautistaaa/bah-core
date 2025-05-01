import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-gray-700 dark:bg-gray-800 rounded-lg p-4 my-4 relative group"
    >
      <button
        (click)="copyToClipboard()"
        class="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-200 transition-colors duration-200 border border-gray-600 hover:border-gray-400 rounded cursor-pointer"
      >
        <svg
          *ngIf="!copied"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path
            d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
          />
        </svg>
        <svg
          *ngIf="copied"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <pre
        class="m-0 text-gray-200"
      ><code [class]="language" [innerHTML]="highlightedCode"></code></pre>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .hljs {
          background: transparent;
          color: #e6edf3;
        }

        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #ff7b72;
        }

        .hljs-string,
        .hljs-doctag {
          color: #a5d6ff;
        }

        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #d2a8ff;
        }

        .hljs-attr,
        .hljs-attribute {
          color: #79c0ff;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-built_in,
        .hljs-addition,
        .hljs-variable,
        .hljs-template-variable {
          color: #7ee787;
        }

        .hljs-comment,
        .hljs-quote,
        .hljs-deletion {
          color: #8b949e;
        }
      }

      pre {
        white-space: pre-wrap;
      }

      code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
          Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #e6edf3;
      }
    `,
  ],
})
export class CodeComponent implements OnInit {
  @Input() code = '';
  @Input() language = 'typescript';
  highlightedCode = '';
  copied = false;

  ngOnInit() {
    this.highlightCode();
  }

  private highlightCode() {
    try {
      this.highlightedCode = hljs.highlight(this.code, {
        language: this.language,
      }).value;
    } catch (error) {
      console.error('Error highlighting code:', error);
      this.highlightedCode = this.code;
    }
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }
}
