import { formatCurrency } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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

  public photos: string[] = [];

  @Output() public onUploadFinished = new EventEmitter();
  constructor(
    public fb: FormBuilder,
    public _i18n: NzI18nService,
    public service: MarchandService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private fileService: MarchandService
  ) {}
  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileService.upload(formData).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });
    // this.Form.controls['imgPath'].setValue(fileToUpload.name);
    console.log(this.Form.controls['imgPath']);
    console.log(fileToUpload);
  };

  
  // NOTIFICATION
  createNotification(type: string, titl: string): void {
    this.notification.create(
      type,
      titl + '',
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

  onSubmit() {
    let req: any;
    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].updateValueAndValidity();
    }

    if (this.route.snapshot.paramMap.get('idMerchant')) {


      if (this.Form.valid) {

        const id = this.route.snapshot.paramMap.get('idMerchant');
     
        // this.Form.controls['idMerchant'].setValue(id);
        this.UpdateRow();
        this.createNotification('info', 'Modifier');
        this.router.navigate(['/listmarchand']);
      }
    } else {
      if (this.Form.valid) {
        // this.Form.controls["imgPath"].setValue(this.response.dbPath);
        console.log('ADD NOW');
      console.log(this.fileService.getPhotos())
        this.AddMarchand();
        this.showModal();
        this.createNotification('success', 'Ajouter');
        this.resetForm();
      } else {
        this.createNotification('error', 'Erreur');
      }
    }
  }

  // ADD-MARCHAND

  AddMarchand() {
    this.service.createService(this.Form.value).subscribe(
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
  UpdateRow() {
    const value = this.Form.value;
    // console.log( "UP" +value)
    // console.log(this.Form.value)
    this.service.putService(value).subscribe(
      (res) => {
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
    const id = this.route.snapshot.paramMap.get('idMerchant');
    if (id != null) {
      this.service.getIdService(id).subscribe((res) => {
        this.dataform = res;
        this.Form = this.fb.group({
          idMerchant: this.dataform.idMerchant,
          phoneNumber: this.dataform.phoneNumber,
          phoneNumberPrefix: ['+212'],
          firstname: this.dataform.firstname,
          lastname: this.dataform.lastname,
          matricule: this.dataform.matricule,
          address: this.dataform.address,
          cin: this.dataform.cin,
          childrenNumber: this.dataform.childrenNumber,
          // activiter: this.dataform.activiter,
          monthly: this.dataform.Monthly,
          // service: this.dataform.service,
          dateBirth: this.dataform.dateBirth,
          statue: this.dataform.statue,
        });
      });
      console.log('update');
    } else {
      console.log('submite');
    }

    this.Form = this.fb.group({
      phoneNumberPrefix: ['+212'],
      idMerchant: 0,
      phoneNumber: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      matricule: [null, [Validators.required]],
      address: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      childrenNumber: [0, [Validators.required]],
      // activiter: [null, [Validators.required]],
      monthly: [0, [Validators.required]],
      // service: [null, [Validators.required]],
      dateBirth: [null],
      statue: [false],
      // imgPath: '',
    });
  }
  // UPLOAD
  // handleChange({ file, fileList }: NzUploadChangeParam): void {
  //   const Statue= file.status;

  //   if (Statue!== 'uploading') {
  //     console.log(file, fileList);
  //   }
  //   if (Statue=== 'done') {
  //     this.msg.success(`${file.name} file uploaded successfully.`);
  //   } else if (Statue=== 'error') {
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
