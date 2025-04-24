import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@bah-core/ui/button';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bah-core';
  isLoading = false;

  handleClick(): void {
    console.log('Button clicked!');
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }
}
