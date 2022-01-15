import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EnvironmentService } from 'src/app/services/environment.service';
import { UserService } from 'src/app/services/user.service';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  pageName
  constructor(private route:ActivatedRoute, public env:EnvironmentService, public popoverController: PopoverController, public _DomSanitizationService: DomSanitizer, public user:UserService) {
    this.pageName = this.route.snapshot.data['title']
   }

  ngOnInit() {

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();

  }
}


