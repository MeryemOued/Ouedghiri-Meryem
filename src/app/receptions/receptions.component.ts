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

  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  // secret_code:string = "";
  constructor(
    public service: MarchandService,
    public Pservice: PayementService,
    public fb: FormBuilder
  ) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    this.service.refreshTable();

    this.Pservice.refreshTable();

    console.log('rec');
    this.Form = this.fb.group({
      searchValue: '',
      requeset_id: '',
      amount: 0,
      fees: 0,
      marchand_code: '',
      hmac: '',
      json_data: '',
      token: '',
      date_expiration: '',
      date_request: '',
      // secret_code: [null, [Validators.required]],
    });
  }
  onSearchChange(value: Marchand) {
    this.selectedMarchand = value;
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
    let token;
    console.log(this.Form.value);
    this.Pservice.createService(this.Form.value).subscribe(
      (res) => {
        console.log(this.Form.value);
        console.log(res);
        //  console.log(res)
        token = res;
        if (token != null) {
          this.statue = true;
        }
        // console.log(this.Form.value)
        // this.resetForm(form);
        // this.service.refreshTable();

        this.Form.controls['token'].setValue(res);
        this.Pservice.refreshTable();

        //this.PostToken(token)
      },
      (err) => {
        console.log('not ok');
        console.log(err);
      }
    );
    console.log('TOKEN');
    console.log(token);
  }
  onSubmit() {
    const marchand_code = this.Form.controls['marchand_code'].value;
    const amount = this.Form.controls['amount'].value;

    // const secretKey = this.Form.controls["hmac"].value;
    const hmac = amount + '' + marchand_code + '';
    //hmac.concat(secretKey)
    //this.Form.controls['hmac'].setValue(hmac)
    console.log(hmac + 'hmac');
    this.Form.controls['hmac'].setValue(hmac);
    this.Form.controls['requeset_id'].setValue(marchand_code + '' + amount);
    this.AddPayement();
    console.log(this.Pservice.list);
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
  ];
}
