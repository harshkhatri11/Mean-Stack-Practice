import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MateriaModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';

@NgModule({
  declarations: [LandingPageComponent, UserAuthenticationComponent],
  imports: [MateriaModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
