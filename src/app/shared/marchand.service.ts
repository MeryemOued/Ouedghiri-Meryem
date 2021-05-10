import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marchand } from './marchand.model';

@Injectable({
  providedIn: 'root'
})
export class MarchandService {

  constructor( private httpClient:HttpClient) { }
  // marchand : Marchand;
  readonly baseURL ='http://localhost:25835/api/Marchands'
   FormData: Marchand = new Marchand();
   list:Marchand[];


   createService(){
     return this.httpClient.post(this.baseURL,this.FormData);
   }
refreshTable(){
  this.httpClient.get(this.baseURL)
  .toPromise()
  .then(res=>this.list=res as Marchand[]);
}


}
