import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddMarchandComponent } from './marchands/add-marchand/add-marchand.component';
import { ListMarchandComponent } from './marchands/list-marchand/list-marchand.component';
import { ReceptionsComponent } from './receptions/receptions.component';

const routes: Routes = [
  // { path: '', pathMatch:'full',redirectTo:'/login' },
 { path: '', component: LoginComponent },
  // { path: 'layout', component: LayoutComponent },
  { path: 'addmarchand', component: AddMarchandComponent },
  { path: 'listmarchand', component: ListMarchandComponent },
  { path: 'receptions', component: ReceptionsComponent },
  { path: 'addmarchand/:idMerchant', component: AddMarchandComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
