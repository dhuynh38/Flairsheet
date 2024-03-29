import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import 'hammerjs';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadComponent } from './upload/upload.component';

import { ConfigService } from './services/config/config.service';
import { ContentService } from './services/content/content.service';
import { FileService } from './services/file/file.service';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { RedirectService } from './services/redirect/redirect.service';
import { SessionService } from './services/session/session.service';
import { UploadService } from './services/upload/upload.service';
import { UserService } from './services/user/user.service';

/**
 * The root module that handles delcaring components, importing modules,
 * and providing services to components.
 */
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    PageNotFoundComponent,
    SignupComponent,
    SidebarComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    InfiniteScrollModule,
    MaterialModule,
    ReactiveFormsModule,
    RoutingModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    ConfigService,
    ContentService,
    FileService,
    RedirectService,
    SessionService,
    UploadService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
