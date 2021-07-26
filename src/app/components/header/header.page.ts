import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EnvironmentService } from 'src/app/services/environment.service';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  pageName
  constructor(private route:ActivatedRoute, public env:EnvironmentService, public popoverController: PopoverController) {
    this.pageName = this.route.snapshot.data['title']
   }

  ngOnInit() {
    console.log(this.pageName)
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
    console.log('onDidDismiss resolved with role', role);
  }
}


