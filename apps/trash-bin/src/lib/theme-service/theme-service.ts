import { Injectable, signal } from "@angular/core"
import { DOCUMENT } from "@angular/common"
import { inject } from "@angular/core"

export type Theme = "light" | "dark"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private document = inject(DOCUMENT)
  private window = this.document.defaultView

  public theme = signal<Theme>("light")

  constructor() {
    this.initializeTheme()
  }

  private initializeTheme(): void {
    // Get theme from localStorage or default to system preference
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      this.theme.set(storedTheme)
      this.applyTheme(storedTheme)
    } else {
      // Use system preference as initial default
      const systemPrefersDark = this.window?.matchMedia("(prefers-color-scheme: dark)").matches ?? false
      const initialTheme: Theme = systemPrefersDark ? "dark" : "light"
      this.theme.set(initialTheme)
      localStorage.setItem("theme", initialTheme)
      this.applyTheme(initialTheme)
    }
  }

  public setTheme(newTheme: Theme): void {
    this.theme.set(newTheme)
    localStorage.setItem("theme", newTheme)
    this.applyTheme(newTheme)
  }

  public toggleTheme(): void {
    const currentTheme = this.theme()
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)
  }

  private applyTheme(theme: Theme): void {
    if (theme === "dark") {
      this.document.documentElement.classList.add("dark")
      this.document.documentElement.style.colorScheme = "dark"
    } else {
      this.document.documentElement.classList.remove("dark")
      this.document.documentElement.style.colorScheme = "light"
    }
  }
}
