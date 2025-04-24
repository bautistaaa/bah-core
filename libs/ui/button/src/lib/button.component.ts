import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  tertiary: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
} as const;

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3.5 py-2 text-base',
  lg: 'px-4 py-2.5 text-lg',
} as const;

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-md font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors' as const;

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const disabledClasses = this.disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer';

    return `${BASE_CLASSES} ${SIZE_CLASSES[this.size]} ${
      VARIANTS[this.variant]
    } ${disabledClasses}`;
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
