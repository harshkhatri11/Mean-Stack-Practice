import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PipeComponent } from './pipe/pipe.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'userProfileDetails', component: UserProfileDetailsComponent },
      { path: 'pipe', component: PipeComponent },

      {
        path: 'ems',
        loadChildren: () =>
          import('./employee-management/employee-management.module').then(
            (m) => m.EmployeeManagementModule
          ),
      },
    ],
  },
  { path: 'forbidden', component: ForbiddenPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
