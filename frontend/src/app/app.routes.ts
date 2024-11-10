import {Routes} from '@angular/router';
import {
  AssociationOverviewPageComponent
} from './feature/association-overview-page/association-overview-page.component';
import {AssociationPageComponent} from './feature/association-page/association-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AssociationOverviewPageComponent,
    // data: {breadcrumb: 'lbl.welcome'}
  },
  {
    path: 'association',
    component: AssociationOverviewPageComponent,
    // data: {breadcrumb: 'lbl.welcome'}
  },
  {
    path: 'association/:displayName',  // Dynamischer Parameter hinzugefügt
    component: AssociationPageComponent,
    // data: { breadcrumb: 'lbl.welcome' }
  },
];
