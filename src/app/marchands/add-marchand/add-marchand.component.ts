import { formatCurrency } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { table } from 'console';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Marchand } from 'src/app/shared/marchand.model';
import { MarchandService } from 'src/app/shared/marchand.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpEventType } from '@angular/common/http';
// import { marchandsdata } from "src/app/files/marchandsdata.data";

@Component({
  selector: 'app-add-marchand',
  templateUrl: './add-marchand.component.html',
  styleUrls: ['./add-marchand.component.css'],
})
export class AddMarchandComponent implements OnInit {
  selectedValue = null;
  switchValue = true;
  date = null;
  submitted = false;
  dataform: any;
  marchand: Marchand;
  Form!: FormGroup;
  marchands: any;
  public progress: number;
  public message: string;
  public response: {dbPath: ''};

  public photos: string[] = [];
  @Output() public onUploadFinished = new EventEmitter();
  constructor(
    public fb: FormBuilder,
    public _i18n: NzI18nService,
    public service: MarchandService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService
    

  ) {}


// NOTIFICATION
createNotification(type: string,titl:string): void {
  this.notification.create(
    type,
   titl+"",
    'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  );
}
// GET DATA
  getData() {
    this.service.getService().subscribe(
      (data) => {
        return (this.marchands = data);
      },
      (err) => {
        console.log('DATA NOT FOUND');
      }
    );
  }

onSubmit(value: any) {
let req :any;
  for (const i in this.Form.controls) {
    this.Form.controls[i].markAsDirty();
    this.Form.controls[i].updateValueAndValidity();
  }

if(this.route.snapshot.paramMap.get('id')){
  if(this.Form.valid){
      console.log('UPDATE NOW')
  const id = this.route.snapshot.paramMap.get('id');
  value.id = id;
  this.UpdateRow(value)
  this.createNotification('info','Modifier');
  this.router.navigate(['/listmarchand'])
  }


}
else{
  if(this.Form.valid){
    // this.Form.controls["imgPath"].setValue(this.response.dbPath);
  console.log('ADD NOW')
  this.AddMarchand(value);
  this.showModal();
  this.createNotification('success','Ajouter');
   this.resetForm();
  }
  else{
    this.createNotification('error','Erreur');
  }



}

  }

// ADD-MARCHAND

AddMarchand(value:any){

   this.service.createService(value).subscribe(
        (res) => {
          // this.resetForm(form);
          this.service.refreshTable();
        },
        (err) => {
          console.log(err);
        }
      );
}
  getDataById(id: any) {
    this.service.getIdService(id).subscribe((res) => {
      this.dataform = res;
    });
    return this.dataform;
  }
  UpdateRow(value:any) {
    this.service.putService(value).subscribe(
      (res) => {
        
console.log(value.id)
        this.service.refreshTable();
      },
      (err) => {
        console.log(err);
      }
    );
  }
   resetForm() {
 this.Form.reset();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getIdService(id).subscribe((res) => {
        this.dataform = res;
        this.Form = this.fb.group({
          id : this.dataform.id,
          ntel: this.dataform.ntel,
          phoneNumberPrefix: ['+212'],
          nom: this.dataform.nom,
          matricule: this.dataform.matricule,
          adress: this.dataform.adress,
          cin: this.dataform.cin,
          nombreenfants: this.dataform.nombreenfants,
          activiter: this.dataform.activiter,
          soldecourant: this.dataform.soldecourant,
          service: this.dataform.service,
          datenaissance: this.dataform.datenaissance,
          status: this.dataform.status,

        });
      });
      console.log('update');
    } else {
      console.log('submite');
    }

    this.Form = this.fb.group({
      phoneNumberPrefix: ['+212'],
      id: [0],
      ntel: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      matricule: [null, [Validators.required]],
      adress: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      nombreenfants: [0, [Validators.required]],
      activiter: [null, [Validators.required]],
      soldecourant: [0, [Validators.required]],
      service: [null, [Validators.required]],
      datenaissance: [null],
      status: [false],
    });
  }
  // UPLOAD
  // handleChange({ file, fileList }: NzUploadChangeParam): void {
  //   const status = file.status;
    
  //   if (status !== 'uploading') {
  //     console.log(file, fileList);
  //   }
  //   if (status === 'done') {
  //     this.msg.success(`${file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     this.msg.error(`${file.name} file upload failed.`);
  //   }
  // }
  isVisible = false;
  isConfirmLoading = false;


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
