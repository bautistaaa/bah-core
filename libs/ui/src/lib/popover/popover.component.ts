import { Component, ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[libPopoverTrigger]',
  standalone: true,
})
export class PopoverTriggerDirective {
  constructor(public elementRef: ElementRef) {}
}

@Directive({
  selector: '[libPopoverContent]',
  standalone: true,
})
export class PopoverContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'lib-popover',
  standalone: true,
  imports: [CommonModule, PopoverTriggerDirective, PopoverContentDirective],
  template: `
    <div class="relative inline-block">
      <ng-content select="[libPopoverTrigger]"></ng-content>
      <div
        *ngIf="isOpen"
        class="absolute z-50 mt-2 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none"
        [style.top.px]="triggerElement?.getBoundingClientRect()?.bottom + 8"
        [style.left.px]="triggerElement?.getBoundingClientRect()?.left"
      >
        <ng-content select="[libPopoverContent]"></ng-content>
      </div>
    </div>
  `,
})
export class PopoverComponent {
  @ContentChild(PopoverTriggerDirective) trigger!: PopoverTriggerDirective;
  @ContentChild(PopoverContentDirective) content!: PopoverContentDirective;

  isOpen = false;
  triggerElement: HTMLElement | null = null;

  ngAfterViewInit() {
    if (this.trigger?.elementRef?.nativeElement) {
      this.triggerElement = this.trigger.elementRef.nativeElement;
      this.triggerElement.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
} 