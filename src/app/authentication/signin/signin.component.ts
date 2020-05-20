import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  loginForm: FormGroup
  isSubmitted: Boolean = false
  isUnauthorized: Boolean = false
  returnUrl: UrlTree

  constructor(
    private _FormBuilder: FormBuilder,
    private _CommonService: CommonService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm()
    this.returnUrl = this._ActivatedRoute.snapshot.queryParams['returnUrl'] || '/';

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

    this.isUnauthorized = false

    this._CommonService.post('auth/signin', this.loginForm.value).subscribe(res => {
      localStorage.setItem('token', res['token'])
      this._Router.navigateByUrl(this.returnUrl)
    }, err => {
      this.isUnauthorized = true
      console.error(err)
    })
  }

}
