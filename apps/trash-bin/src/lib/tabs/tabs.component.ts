import {
  Component,
  type ElementRef,
  ViewChildren,
  type QueryList,
  type AfterViewInit,
  signal,
  effect,
  inject,
  Input,
  ContentChildren,
  QueryList as ContentQueryList,
  AfterContentInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme-service/theme-service';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  template: `
    <div [class.hidden]="!isActive" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabPanelComponent {
  @Input() id!: string;
  isActive = false;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TabPanelComponent],
  template: `
    <div class="flex flex-col w-full" [class.dark]="themeService.theme() === 'dark'" [class.bg-[#0e0f11]]="themeService.theme() === 'dark'" role="tablist">
      <!-- Tab Navigation -->
      <div class="w-full border-none shadow-none relative flex items-center" [class.bg-transparent]="themeService.theme() === 'dark'">
        <div class="p-0">
          <div class="relative">
            <!-- Hover Highlight -->
            <div 
              class="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
              [style.left]="hoverStyle()['left']"
              [style.width]="hoverStyle()['width']"
              [style.opacity]="hoveredTabId() !== null ? 1 : 0">
            </div>

            <!-- Active Indicator -->
            <div 
              class="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
              [style.left]="activeStyle()['left']"
              [style.width]="activeStyle()['width']">
            </div>

            <!-- Tabs -->
            <div class="relative flex space-x-[6px] items-center">
              @for (tab of tabs; track tab.id) {
                <button 
                  #tabRef
                  type="button"
                  role="tab"
                  [attr.aria-selected]="tab.id === activeTabIdSignal()"
                  [attr.aria-controls]="tab.id"
                  class="px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] border-0 bg-transparent"
                  [class.text-[#0e0e10]]="tab.id === activeTabIdSignal() && themeService.theme() !== 'dark'"
                  [class.dark:text-white]="tab.id === activeTabIdSignal() && themeService.theme() === 'dark'"
                  [class.text-[#0e0f1199]]="tab.id !== activeTabIdSignal() && themeService.theme() !== 'dark'"
                  [class.dark:text-[#ffffff99]]="tab.id !== activeTabIdSignal() && themeService.theme() === 'dark'"
                  (mouseenter)="onMouseEnter(tab.id)"
                  (mouseleave)="onMouseLeave()"
                  (click)="setActiveTab(tab.id)"
                  (keydown.enter)="setActiveTab(tab.id)"
                  (keydown.space)="setActiveTab(tab.id); $event.preventDefault()">
                  <div class="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
                    {{ tab.label }}
                  </div>
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="w-full">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TabsComponent implements AfterViewInit, AfterContentInit, OnInit {
  protected themeService = inject(ThemeService);
  
  @Input({ required: true }) tabs: Tab[] = [];
  @Input() activeTabId: string | null = null;
  @ContentChildren(TabPanelComponent) tabPanels!: ContentQueryList<TabPanelComponent>;

  hoveredTabId = signal<string | null>(null);
  activeTabIdSignal = signal<string>('');
  hoverStyle = signal<{ [key: string]: string }>({});
  activeStyle = signal<{ [key: string]: string }>({
    left: '0px',
    width: '0px',
  });

  @ViewChildren('tabRef') tabRefs!: QueryList<ElementRef>;

  ngOnInit() {
    // Set the first tab as active by default if no activeTabId is provided
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabIdSignal.set(this.tabs[0].id);
      this.activeTabId = this.tabs[0].id;
    }
  }

  constructor() {
    // Set up effects to react to signal changes
    effect(() => {
      const tabId = this.hoveredTabId();
      if (tabId !== null) {
        const index = this.tabs.findIndex(tab => tab.id === tabId);
        const elements = this.tabRefs?.toArray();
        if (elements && elements[index]) {
          const element = elements[index].nativeElement;
          this.hoverStyle.set({
            left: `${element.offsetLeft}px`,
            width: `${element.offsetWidth}px`,
          });
        }
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const tabId = this.activeTabIdSignal();
      const index = this.tabs.findIndex(tab => tab.id === tabId);
      const elements = this.tabRefs?.toArray();
      if (elements && elements[index]) {
        const element = elements[index].nativeElement;
        this.activeStyle.set({
          left: `${element.offsetLeft}px`,
          width: `${element.offsetWidth}px`,
        });
      }

      // Update tab panel visibility
      this.tabPanels?.forEach(panel => {
        panel.isActive = panel.id === tabId;
      });
    }, { allowSignalWrites: true });

    // Update active tab ID when input changes
    effect(() => {
      if (this.activeTabId) {
        this.activeTabIdSignal.set(this.activeTabId);
      }
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit() {
    // Initialize active tab indicator position
    setTimeout(() => {
      const index = this.tabs.findIndex(tab => tab.id === this.activeTabIdSignal());
      const elements = this.tabRefs.toArray();
      if (elements && elements[index]) {
        const element = elements[index].nativeElement;
        this.activeStyle.set({
          left: `${element.offsetLeft}px`,
          width: `${element.offsetWidth}px`,
        });
      }
    });
  }

  ngAfterContentInit() {
    // Set initial active state for tab panels
    this.tabPanels?.forEach(panel => {
      panel.isActive = panel.id === this.activeTabIdSignal();
    });
  }

  onMouseEnter(tabId: string) {
    this.hoveredTabId.set(tabId);
  }

  onMouseLeave() {
    this.hoveredTabId.set(null);
  }

  setActiveTab(tabId: string) {
    this.activeTabIdSignal.set(tabId);
    this.activeTabId = tabId;
  }
}
