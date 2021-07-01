import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Ínicio', url: '/home', icon: '/assets/images/home-icon.svg' },
    { title: 'Influencers', url: '/influencers', icon: '/assets/images/influencer-icon.svg' },
    { title: 'Postagem', url: '/postagem', icon: '/assets/images/postagem-icon.svg' },
   
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router:Router) {}


  logout(){
    this.router.navigate(['/login'], {replaceUrl:true})
  }
}
