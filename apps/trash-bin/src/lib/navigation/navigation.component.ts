import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  isDark = false;
  private document = inject(DOCUMENT);

  ngOnInit() {
    this.isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        (this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false));
    this.updateTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.isDark) {
      this.document.documentElement.classList.add('dark');
      this.document.documentElement.style.colorScheme = 'dark';
    } else {
      this.document.documentElement.classList.remove('dark');
      this.document.documentElement.style.colorScheme = 'light';
    }
  }
}
