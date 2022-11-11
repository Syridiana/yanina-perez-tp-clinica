import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { RegisterComponent } from './Components/register/register.component';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SpecialityListComponent } from './Components/shared/speciality-list/speciality-list.component';
import { VerificationEmailComponent } from './Components/verification-email/verification-email.component';
import { AdminUsersComponent } from './Components/admin/admin-users/admin-users.component';
import { CreateUserComponent } from './Components/admin/create-user/create-user.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { FilterPipe } from './Pipes/filter.pipe';
import { FilterPipePatient } from './Pipes/filterPatient.pipe';
import { FilterPipeSpecialty } from './Pipes/filterSpecialty.pipe';
import { AddAppointmentComponent } from './Components/appointments/add-appointment/add-appointment.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ClassSelectorDirective } from './Directives/class-selector.directive';

registerLocaleData(localeEsAr, 'es-Ar');

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
    ImageLoadingDirective,
    SpecialityListComponent,
    SpecialityListComponent,
    VerificationEmailComponent,
    AdminUsersComponent,
    CreateUserComponent,
    AppointmentsComponent,
    FilterPipe,
    FilterPipePatient,
    FilterPipeSpecialty,
    AddAppointmentComponent,
    ProfileComponent,
    ClassSelectorDirective
  ],
  exports: [ 
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    SpecialtiesC
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
