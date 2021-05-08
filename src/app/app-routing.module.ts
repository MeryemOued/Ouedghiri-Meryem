import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMarchandComponent } from './add-marchand/add-marchand.component';
import { ListMarchandComponent } from './list-marchand/list-marchand.component';

const routes: Routes = [  { path: 'addmarchand', component: AddMarchandComponent },{ path: 'listmarchand', component: ListMarchandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
