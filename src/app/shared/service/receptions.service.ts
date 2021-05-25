import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateToken } from '../model/generate-token';

@Injectable({
  providedIn: 'root'
})
export class ReceptionsService {
  
  constructor(private httpClient: HttpClient) { }
  readonly baseURL = '/cpws/cpmarchand/index.cfm?endpoint=/generate_token';
  FormData1 : GenerateToken = new GenerateToken();
  token:""
  list1 : GenerateToken[];
  generateToken(data:any) {
    return this.httpClient.post(this.baseURL, data).toPromise().then(val=> 
      console.log(val))
  }

}
