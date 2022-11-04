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

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: VerificationEmailComponent },
  {
    path: 'admin',
    loadChildren: () => import('../app/Components/admin/admin-routing.module')
      .then(m => m.AdminRoutingModule),
    canActivate: [AdminGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'addAppointment', component: AddAppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
