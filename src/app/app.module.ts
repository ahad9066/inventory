import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HttpReqResInterceptor } from 'src/modules/auth/http-req-res.interceptor';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/modules/shared/shared.module';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

export function ModuleConfigFactory(): AuthModule {
  return {
    baseURL: environment.baseURL,
    spaURL: environment.spaURL,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    ToastrModule.forRoot(),
    ToastContainerModule,
    HttpClientModule,
    AuthModule.forRoot(),
    SharedModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqResInterceptor,
      multi: true,
    },
    {
      provide: AuthModule,
      useFactory: ModuleConfigFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
