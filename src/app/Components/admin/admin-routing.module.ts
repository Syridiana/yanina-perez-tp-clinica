import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { AdminGuard } from 'src/app/guards/admin-guard.guard';
import { RegisterComponent } from '../register/register.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { InformesComponent } from './informes/informes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'especialistas', component: AdminUsersComponent },
  { path: 'new/users', component: CreateUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'informes', component: InformesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
