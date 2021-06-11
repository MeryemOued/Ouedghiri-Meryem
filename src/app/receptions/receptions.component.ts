import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { stat } from 'fs';
import { concat } from 'rxjs';
import { Marchand } from '../shared/marchand.model';
import { MarchandService } from '../shared/marchand.service';
import { PayementService } from '../shared/payement.service';

@Component({
  selector: 'app-receptions',
  templateUrl: './receptions.component.html',
  styleUrls: ['./receptions.component.css'],
})
export class ReceptionsComponent implements OnInit {
  Form!: FormGroup;
  public statue = false;
  inputValue?: string;
  searchValue: any;
  selectedMarchand: Marchand;
  loading = true;


  // secret_code:string = "";
  constructor(
    public service: MarchandService,
    public Pservice: PayementService,
    public fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.service.refreshTable();
    this.Pservice.refreshTable();

    console.log('rec');
    this.Form = this.fb.group({
      searchValue: '',
      requeset_id: '',
      idMerchant : 0,
      amount: "0",
      fees: 0,
      marchand_code: '',
      hmac: '',
      json_data: '',
      token: '',
      status : false,
      date_expiration: '',
      date_request: '',
      Merchant : new Marchand(),
      // secret_code: [null, [Validators.required]],
    });
  }
  onSearchChange(value: Marchand) {
    this.selectedMarchand = value;
    console.log( this.selectedMarchand);
    console.log( this.selectedMarchand);
  }
  PostToken(token: any) {
    let state;

    console.log(token);
    this.Pservice.Tokenstatue(token).subscribe((res) => {
      console.log(res);
      state = res;
    });
  }
  AddPayement() {
        console.log('addm');
    console.log(this.selectedMarchand);
    this.Form.controls["idMerchant"].setValue(this.selectedMarchand);

    this.Pservice.createService(this.Form.value).subscribe(
      (res) => {

        console.log("AddPayement")
        console.log(this.Form.value);
         console.log(res)
   
        this.Pservice.refreshTable();

      },
      (err) => {
        console.log(err);
      }
    );

  }
  onSubmit() {
  
    this.AddPayement();
    console.log(this.Pservice.list);
  }


}
