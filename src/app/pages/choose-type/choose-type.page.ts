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


  navigate(route, param) {

      this.router.navigate([`${route}/${param}`]);

  }
}
