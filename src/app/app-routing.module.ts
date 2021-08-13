import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { DataTableComponent } from './data-table/data-table.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  { path:'add', component:AddUserComponent},
  { path:'edit/:id', component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
