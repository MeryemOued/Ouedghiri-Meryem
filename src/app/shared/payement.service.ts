import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operations } from './model/operations';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44341/api/Operation';
  FormData: Operations = new Operations();
  list: Operations[];
  
  createService(data: any) {
    
    console.log(data)
    return this.httpClient.post(this.baseURL, data);
  }

}
