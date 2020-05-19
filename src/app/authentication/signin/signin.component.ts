import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  loginForm: FormGroup
  isSubmitted: Boolean = false

  constructor(
    private _FormBuilder: FormBuilder,
    private _CommonService: CommonService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.loginForm = this._FormBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return this.isSubmitted = true
    }

    this._CommonService.post('auth/signin', this.loginForm.value).subscribe(res => {
      localStorage.setItem('token', res['token'])
    }, err => {
      console.error(err)
    })
  }

}
