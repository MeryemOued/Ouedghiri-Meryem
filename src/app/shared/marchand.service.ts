import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marchand } from './marchand.model';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { jsDocComment } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class MarchandService {
  constructor(private httpClient: HttpClient) {}
  // marchand : Marchand;
  readonly baseURL = 'https://localhost:44341/api/Marchand';
  FormData: Marchand = new Marchand();
  list: Marchand[];
  ma: any;
  refreshTable() {
    this.httpClient
      .get(this.baseURL)
      .toPromise()
      .then((res) => {this.list = res as unknown as Marchand[]});
  }
  public upload(formData: FormData) {
    return this.httpClient.post(`http://localhost:44341/api/Upload`, formData, {
      reportProgress: true,
      observe: 'events', 
    });
  }



  createService(data: any) {
    return this.httpClient.post(this.baseURL, data);
  }

  putService(data: any) {

    console.log("PUT")
    console.log(data)
    return this.httpClient.put(`${this.baseURL}`, data);
  }
  getService() {
    return this.httpClient.get(this.baseURL);
  }
  deleteService(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  getIdService(id: any) {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  downloadfile(name: string, id: any) {
    this.httpClient.get(`${this.baseURL}/${id}`).subscribe(
      (pdf) => {
        // const blob = new Blob([pdf],{type:'application/pdf'});
        const doc = new jsPDF();
        const fileName = name + 'pdf';

        console.log(JSON.stringify(pdf));

        doc.text(JSON.stringify(pdf), 5, 5);
        doc.save(fileName);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public download(fileUrl: string) {
    return this.httpClient.get(`${this.baseURL}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public getPhotos() {
    return this.httpClient.get(`http://localhost:25835/api/Upload/getPhotos`);
  }
}
