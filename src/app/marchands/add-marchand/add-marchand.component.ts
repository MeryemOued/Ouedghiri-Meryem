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
  console.log("onsubmite")

  this.service.createService().subscribe(res=>{
  },
  err=>{console.log(err);}
    )
}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumberPrefix: ['+212'],
      phoneNumber: [null, [Validators.required]],
      agree: [false],
    });
    localStorage.setItem('nom', 'value');
      // GET ID FROM LIST-MARCHAND
//       let id = this.route.snapshot.paramMap.get("id");
//       this.marchandObj.nom =id+"";
// console.log(id+"ID");
this.route.queryParams.subscribe((params)=>{
  console.log("DATA IS" +params)
})
let data = this.route.snapshot.params;
console.log("DATA IS" +data)
//       this.marchandObj.nom =id+"";
  }
  



}
