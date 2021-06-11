import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  pageName
  constructor(private route:ActivatedRoute) {
    this.pageName = this.route.snapshot.data['title']
   }

  ngOnInit() {
    console.log(this.pageName)
  }

}
