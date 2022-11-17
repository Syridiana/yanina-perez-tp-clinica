import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerificationEmailComponent } from './Components/verification-email/verification-email.component';
import { AdminGuard } from './guards/admin-guard.guard';
import { HomeComponent } from './Views/home/home.component';
import { redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { AddAppointmentComponent } from './Components/appointments/add-appointment/add-appointment.component';
import { ProfileComponent } from './Components/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'isRight' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight' } },
  { path: 'verification', component: VerificationEmailComponent, data: { animation: 'isRight' } },
  {
    path: 'admin',
    loadChildren: () => import('../app/Components/admin/admin-routing.module')
      .then(m => m.AdminRoutingModule),
    canActivate: [AdminGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'appointments', component: AppointmentsComponent, data: { animation: 'isRight' } },
  { path: 'addAppointment', component: AddAppointmentComponent, data: { animation: 'isRight' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
