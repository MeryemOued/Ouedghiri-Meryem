import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operations } from './model/operations';

@Injectable({
  providedIn: 'root',
})
export class PayementService {
  constructor(private httpClient: HttpClient) {}
  readonly baseURL = 'https://localhost:44341/api/Operation';
  FormData: Operations = new Operations();
  list: Operations[];
  refreshTable() {
    this.httpClient.get<Operations[]>(this.baseURL).subscribe((res) => {
      this.list = res;
    });
  }
  createService(data: any) {
    console.log(data);
    console.log('data');
    return this.httpClient.post(this.baseURL, data, { responseType: 'text' });
  }
  Tokenstatue(data: any) {
    console.log(data);
    return this.httpClient.post(this.baseURL, data);
  }
}
