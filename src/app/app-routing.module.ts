import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'home', component: DataTableComponent, canActivate: [AuthGuard]},
  {path:'login',component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
