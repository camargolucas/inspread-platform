import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  form:FormGroup
  constructor(private router: ActivatedRoute, public env:EnvironmentService) { }
  newPasswordScreen = false;

  ngOnInit() {
   
    if(this.router.snapshot.params['id']){
      this.newPasswordScreen = true;

      this.form = new FormGroup({
        newPassword: new FormControl(''),
        confirmPassword: new FormControl('')
      })

    }else{
      this.form = new FormGroup({
        email: new FormControl('')
      })
    }

    
    
  }

}
