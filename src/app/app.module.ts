import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { RegisterComponent } from './Components/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonsDirective } from './Directives/seasons.directive';
import { SeasonsHoverDirective } from './Directives/seasons-hover.directive';
import { SeasonsKeyboardDirective } from './Directives/seasons-keyboard.directive';
import { NavComponent } from './Components/shared/nav/nav.component';
import { SpecialtiesC } from './Entities/specialties';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Views/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { SpinnerComponent } from './Components/shared/spinner/spinner.component';
import { ImageLoadingDirective } from './Directives/image-loading.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SeasonsDirective,
    SeasonsHoverDirective,
    SeasonsKeyboardDirective,
    NavComponent,
    LoginComponent,
    HomeComponent,
    SpinnerComponent,
    ImageLoadingDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    
  ],
  providers: [
    SpecialtiesC
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
