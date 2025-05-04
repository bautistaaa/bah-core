import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

export type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

type Side = 'top' | 'right' | 'bottom' | 'left';
@Component({
  selector: 'lib-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  animations: [
    trigger('popoverAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
/**
 * this is just a POC for the popover component
 * it is not production ready and should not be used as is
 */
export class PopoverComponent {
  @Input() position: Position = 'bottom';
  @Input() contentClass = '';
  @Input() triggerClass = '';
  @Input() set isOpen(value: boolean) {
    this.open.set(value);
  }

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('popoverContent') popoverContent!: ElementRef;
  @ViewChild('trigger') triggerElement!: ElementRef;

  open = signal(false);
  popoverStyles = signal<Record<string, string>>({});

  constructor(private elementRef: ElementRef) {
    effect(() => {
      if (this.open()) {
        setTimeout(() => this.updatePosition(), 0);
      }
    });
  }

  toggle(): void {
    this.open.update((value) => !value);
    this.openChange.emit(this.open());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target)) {
      this.open.set(false);
      this.openChange.emit(false);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.open()) {
      this.updatePosition();
    }
  }

  private updatePosition(): void {
    if (!this.triggerElement || !this.popoverContent) return;

    const triggerRect =
      this.triggerElement.nativeElement.getBoundingClientRect();
    const popoverRect =
      this.popoverContent.nativeElement.getBoundingClientRect();
    const [side, align = 'center'] = this.position.split('-') as [
      string,
      string?
    ];

    const styles: Record<Side, string> = {} as Record<Side, string>;

    // Calculate position based on side
    switch (side) {
      case 'top':
        styles.bottom = `${window.innerHeight - triggerRect.top + 8}px`;
        break;
      case 'right':
        styles.left = `${triggerRect.right + 8}px`;
        break;
      case 'bottom':
        styles.top = `${triggerRect.bottom + 8}px`;
        break;
      case 'left':
        styles.right = `${window.innerWidth - triggerRect.left + 8}px`;
        break;
    }

    // Calculate alignment
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          styles.left = `${triggerRect.left}px`;
          break;
        case 'end':
          styles.right = `${window.innerWidth - triggerRect.right}px`;
          break;
        default: // center
          styles.left = `${
            triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
          }px`;
      }
    } else if (side === 'left' || side === 'right') {
      switch (align) {
        case 'start':
          styles.top = `${triggerRect.top}px`;
          break;
        case 'end':
          styles.bottom = `${window.innerHeight - triggerRect.bottom}px`;
          break;
        default: // center
          styles.top = `${
            triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
          }px`;
      }
    }

    this.popoverStyles.set(styles);
  }
}
