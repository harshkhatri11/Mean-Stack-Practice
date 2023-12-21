import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { FormsModule } from '@angular/forms';
import { MateriaModule } from 'src/app/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeComponent } from './dialog/employee/employee.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { OnboardEmployeeComponent } from './dialog/onboard-employee/onboard-employee.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeComponent,
    OnboardEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    FormsModule,
    MateriaModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true
    }),
  ]
})
export class EmployeeManagementModule {
  // constructor(protected translateService: TranslateService) {
  //   const currentLang = translateService.currentLang;
  //   translateService.currentLang = '';
  //   translateService.use(currentLang);
  // }
 }
