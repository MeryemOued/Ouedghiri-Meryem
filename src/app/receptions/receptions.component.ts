import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat } from 'rxjs';
import { MarchandService } from '../shared/marchand.service';
import { PayementService } from '../shared/payement.service';

@Component({
  selector: 'app-receptions',
  templateUrl: './receptions.component.html',
  styleUrls: ['./receptions.component.css']
})
export class ReceptionsComponent implements OnInit {
  Form!: FormGroup;

  constructor(public service: MarchandService, public Pservice: PayementService,public fb: FormBuilder,

    ) { }

  ngOnInit(): void {
    console.log("rec")
        this.Form = this.fb.group({
          request_id: "",
          amount: 0,
          fees: 0,
          marchand_code: [null, [Validators.required]],
          hmac: [null, [Validators.required]],
          secret_code: [null, [Validators.required]],
    });
  } 
   AddPayement(){
    this.Pservice.createService(this.Form.value).subscribe(
      (res) => {
        console.log(this.Form.value)
        // this.resetForm(form);
        // this.service.refreshTable();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    const marchand_code = this.Form.controls["marchand_code"].value+""; 
    const amount = this.Form.controls["amount"].value;
    const secretKey = this.Form.controls["secret_code"].value;
    const hmac = amount +""+marchand_code+""+secretKey;
    //hmac.concat(secretKey)
    //this.Form.controls['hmac'].setValue(hmac)
    console.log(hmac+"hmac"); 
    this.Form.controls["hmac"].setValue(hmac)
    this.Form.controls["request_id"].setValue(marchand_code+""+amount)
    this.AddPayement();
  }

   listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park'
    }
  ];

}
