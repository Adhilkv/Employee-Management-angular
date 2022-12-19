import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFilesComponent } from './user-files/user-files.component';
import { UserComponent } from './user/user.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:'',component : UserComponent},
  {path:'login',component : UserComponent},
  {path:'AdminLogin',component:AdminLoginComponent},
  {path:'UserPanal',component : UserFilesComponent,canActivate:[RouteGuardService]},
  {path:'logout',component:LogoutComponent,canActivate:[RouteGuardService]},
  {path:'AdminPanal',component:AdminPanalComponent,canActivate:[RouteGuardService]},
  {path:'NewUser/:username',component:AddUserComponent,canActivate:[RouteGuardService]},
  {path:'update/:username',component:ChangePasswordComponent,canActivate:[RouteGuardService]},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
