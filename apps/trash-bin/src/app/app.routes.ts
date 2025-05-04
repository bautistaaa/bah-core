import { Route } from '@angular/router';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { ThemingComponent } from './pages/theming/theming.component';
import { ButtonDocsComponent } from './pages/components/button/button.component';
import { ToggleDocsComponent } from './pages/components/toggle/toggle.component';
import { PopoverDocsComponent } from './pages/components/popover/popover.component';
import { DialogDocsComponent } from './pages/components/dialog/dialog.component';

export const appRoutes: Route[] = [
  {
    path: 'docs',
    children: [
      { path: '', component: IntroductionComponent },
      { path: 'installation', component: InstallationComponent },
      { path: 'theming', component: ThemingComponent },
      { path: 'components/button', component: ButtonDocsComponent },
      { path: 'components/toggle', component: ToggleDocsComponent },
      { path: 'components/popover', component: PopoverDocsComponent },
      { path: 'components/dialog', component: DialogDocsComponent },
    ],
  },
  { path: '', redirectTo: '/docs', pathMatch: 'full' },
];
