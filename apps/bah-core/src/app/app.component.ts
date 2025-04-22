import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@bah-core/ui/button';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bah-core';
}
