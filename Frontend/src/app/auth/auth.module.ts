import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MateriaModule } from "../material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserAuthenticationComponent } from "./user-authentication/user-authentication.component";

@NgModule({
  declarations:[
    SignupComponent,
    LoginComponent,
    LandingPageComponent,
    UserAuthenticationComponent
  ],
  imports:[
    MateriaModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
