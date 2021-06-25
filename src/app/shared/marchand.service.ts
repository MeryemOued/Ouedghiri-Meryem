import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marchand } from './marchand.model';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { jsDocComment } from '@angular/compiler';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalRef } from 'ng-zorro-antd-mobile';
import { Platform } from './model/platform';
import { Activity } from './model/activity';

@Injectable({
  providedIn: 'root',
})
export class MarchandService {
  constructor(private httpClient: HttpClient) {}
  // marchand : Marchand;
  readonly baseURL = 'https://localhost:44341/api/Marchand';
  FormData: Marchand = new Marchand();
  list: Marchand[];
  listPlatform: Platform[];
  listActivity: Activity[];

  ma: any;
  ///////////PLATFORM////////////
  getPlatform() {
    return this.httpClient
      .get(`https://localhost:44341/api/Platform`)
      .subscribe((res) => {
        console.log(res);
      });
  }
  ////////
  refreshTable() {
    this.httpClient
      .get(this.baseURL)
      .toPromise()
      .then((res) => {
        this.list = res as unknown as Marchand[];
      });
  }
  refreshPlatform() {
    this.httpClient
      .get(`https://localhost:44341/api/Platform`)
      .toPromise()
      .then((res) => {
        this.listPlatform = res as unknown as Platform[];
        console.log(res);
      });
  }

  refreshActivity() {
    this.httpClient
      .get(`https://localhost:44341/api/Activite`)
      .toPromise()
      .then((res) => {
        this.listActivity = res as unknown as Activity[];
        console.log(res);
      });
  }
  public upload(formData: FormData) {
    return this.httpClient.post(
      `https://localhost:44341/api/Attachement/upload`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  createAttachement(data: any) {
    console.log(data);
    console.log('attach');
    return this.httpClient.post(
      `https://localhost:44341/api/Attachement`,
      data
    );
  }

  file = '7al';

  createService(data: any) {
    console.log(data);
    return this.httpClient.post(this.baseURL, data);
  }

  putService(data: any) {
    console.log('PUT');
    console.log(data);
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

  //////////////////////// CASH PLUS /////////////////////////////
  public postToken(data: any) {
    return this.httpClient.post(`https://localhost:44341/api/Operation`, data);
  }
}
