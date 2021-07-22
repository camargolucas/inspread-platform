import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from './services/environment.service';
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

  sideMenu = 'end'

  hideMenu = [
    'login',
    'signup',
    'password-recovery'
  ]

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router:Router, private activatedRoute: ActivatedRoute, public env:EnvironmentService) {
     
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //console.log(this.router.url.toString().split('/'))
    setTimeout(() => {
      console.log()
    }, 400);
   
    
  }
  get isLogin(){
    return this.router.url == "/login"
  }

  logout(){
    this.router.navigate(['/login'], {replaceUrl:true})
  }

 


}
