import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddMarchandComponent } from './marchands/add-marchand/add-marchand.component';
import { ListMarchandComponent } from './marchands/list-marchand/list-marchand.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo:'/login' },
  { path: 'login', component: LoginComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'addmarchand', component: AddMarchandComponent },
  { path: 'listmarchand', component: ListMarchandComponent },
  { path: 'addmarchand/:id', component: AddMarchandComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
