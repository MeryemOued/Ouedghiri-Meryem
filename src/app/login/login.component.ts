import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification/authentification.service';
import { SignInData } from '../shared/model/signInData';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFormValid = false;
  areCredentialsInvalid = false;

  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){

      this.checkCredentials(this.validateForm);
    //   console.log("login")
    }
   
  }

  constructor(private fb: FormBuilder , private router: Router,
    private authenticationService: AuthentificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  private checkCredentials(validateForm: FormGroup) {
    console.log(validateForm.value.userName);
    console.log(validateForm.value.password);
    const signInData = new SignInData(validateForm.value.userName, validateForm.value.password);
    if (!this.authenticationService.authenticate(signInData)) {
console.log("invalid")
    }
  }

}
