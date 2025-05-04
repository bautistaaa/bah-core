import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() contentClass = '';
  @Input() closeOnBackdropClick = false;
  
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialogContent') dialogContent!: ElementRef;

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.open && this.closeOnBackdropClick) {
      const target = event.target as HTMLElement;
      const dialogElement = this.dialogContent?.nativeElement;
      
      if (dialogElement && !dialogElement.contains(target)) {
        this.close();
      }
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
  }
}
