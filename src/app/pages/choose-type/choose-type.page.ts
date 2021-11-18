import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.page.html',
  styleUrls: ['./choose-type.page.scss'],
})
export class ChooseTypePage implements OnInit {

  constructor(private router:Router, public env: EnvironmentService) { }

  ngOnInit() {
  }


  navigate(route) {
    console.log(route)
    if (route == '/home') {
      this.router.navigate([`${route}`], { replaceUrl: true });
    } else {
      this.router.navigate([`${route}`]);
    }
  }
}
