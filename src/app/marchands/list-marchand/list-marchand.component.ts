import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Marchand } from 'src/app/shared/marchand.model';
import { MarchandService } from 'src/app/shared/marchand.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Platform } from 'src/app/shared/model/platform';

@Component({
  selector: 'app-list-marchand',
  templateUrl: './list-marchand.component.html',
  styleUrls: ['./list-marchand.component.css'],
})
export class ListMarchandComponent implements OnInit {


  matricule: string;
  marchands: any = [];
  nom : any;
  Form!:FormGroup
  isVisible =false;
  isCollapsed = false;
  selectedRow: any;
  constructor(
    public service: MarchandService,
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.service.refreshTable();
    this.service.refreshPlatform();
    this.service.refreshActivity();
    this.Form = this.fb.group({   
      nom: "",
    });
  }

  // EditMarchand(selectedRow: Marchand) {
  //   this.service.FormData = Object.assign({}, selectedRow);
  // }
  // CRUD DELETE
  deleteService(id: number = 0) {
    if (confirm('supprimer?')) {
      this.service.deleteService(id).subscribe(
        (res) => {
          this.service.refreshTable();
          // this.toastr.success('OK','est Supprimer!')
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  // SERACH
  copylistOfData = this.service.list;
;
visible = false;

open(row :any): void {
  this.visible = true;
  this.selectedRow=row;
  console.log(row)
  console.log(row.id)
}

close(): void {
  this.visible = false;
}
showModal(row:any): void {
  this.selectedRow=row;
  console.log(row)
  console.log(row.id)
  this.isVisible = true;
}

handleOk(row:any,id:any): void {
  console.log(id)
  //this.service.downloadfile(row,id);
  console.log('Button ok clicked!');
  //this.isVisible = false;

}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
}
}

