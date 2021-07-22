import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  pageName
  constructor(private route:ActivatedRoute, public env:EnvironmentService) {
    this.pageName = this.route.snapshot.data['title']
   }

  ngOnInit() {
    console.log(this.pageName)
  }

}
