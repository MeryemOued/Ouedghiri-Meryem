import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-add-marchand',
  templateUrl:'./add-marchand.component.html',
  styleUrls: ['./add-marchand.component.css']
})
export class AddMarchandComponent implements OnInit {
  selectedValue = null;
  // switchValue=true;
  date = null;


  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  onOk(result: Date | Date[] | null): void {
    console.log("onOk", result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log("onCalendarChange", result);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder ,_i18n: NzI18nService)  {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+212'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }
  }

