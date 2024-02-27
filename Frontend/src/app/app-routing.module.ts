import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './auth/landing-page/landing-page.component';
import { HomepageComponent } from './core/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: HomepageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/core.module').then((m) => m.CoreModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
