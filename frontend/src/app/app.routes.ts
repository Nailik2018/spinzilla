import {Routes} from '@angular/router';
import {AssociationPageComponent} from './feature/association-page/association-page.component';

export const routes: Routes = [
  {
    path: 'association',
    component: AssociationPageComponent,
    // data: {breadcrumb: 'lbl.welcome'}
  },
];
