import { formatCurrency } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Marchand } from 'src/app/shared/marchand.model';
import { MarchandService } from 'src/app/shared/marchand.service';
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
  validateForm!: FormGroup;
// marchandObj={
// nom:"nn"
// }

  constructor(
    public fb: FormBuilder,
    public _i18n: NzI18nService,
    public service: MarchandService,
    private route:ActivatedRoute,
    private router :Router
  ) {}



onSubmit(form:NgForm){
if(this.service.FormData.id==0)
this.insertRow(form);
else
this.UpdateRow(form)
console.log("exist")
}

insertRow(form:NgForm){
  console.log("onsubmite")
  this.service.createService().subscribe(
    res=>{
      this.resetForm(form);
      this.service.refreshTable();
  },
  err=>{console.log(err);}
    )
}
UpdateRow(form:NgForm){
  console.log("put")
  this.service.putService().subscribe(res=>{
    this.resetForm(form);
    this.service.refreshTable();
  },
  err=>{console.log(err);}
    )
}
resetForm(form:NgForm){
  form.form.reset();
  this.service.FormData=new Marchand();
}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumberPrefix: ['+212'],
      phoneNumber: [null, [Validators.required]],
      agree: [false],
    });
}}
