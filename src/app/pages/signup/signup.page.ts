import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form:FormGroup
  constructor(public env:EnvironmentService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      tel: new FormControl(''),
      qtFollowers: new FormControl(''),
      linkSocialMedia: new FormControl(''),
      email: new FormControl(''),
      confirmEmail: new FormControl(''),
      password: new FormControl(''),      
      confirmPassword: new FormControl(''),      
    })
  }

}
