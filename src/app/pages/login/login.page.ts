import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form:FormGroup
  constructor(
    private router:Router,
    public env:EnvironmentService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
   });
  }


  navigate(route){
    if(route == '/home'){
      this.router.navigate([`${route}`],  { replaceUrl: true });
    }else{
      this.router.navigate([`${route}`]);
    }
   
  }

}
