import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MateriaModule } from '../material.module';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ConfirmationComponent } from '../shared/components/confirmation/confirmation.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SettingComponent } from './setting/setting.component';
import { PipeComponent } from './pipe/pipe.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ErrorComponent,
    HomepageComponent,
    ConfirmationComponent,
    UserProfileDetailsComponent,
    HeaderComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    SidebarComponent,
    UserProfileComponent,
    SettingComponent,
    PipeComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
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
      extend: true,
    }),
  ],
})
export class CoreModule {}
