import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  form:FormGroup
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('')
    })
  }

}
