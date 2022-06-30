import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.page.html',
  styleUrls: ['./companys.page.scss'],
})
export class CompanysPage implements OnInit {



  companys = [
  ]

  filteredCompanys = []
  constructor(private user: UserService, private company:CompanyService) { }

  ngOnInit() {
    this.company.getCompanys().subscribe((ret: []) => {
      this.companys = ret['response']     
      this.filteredCompanys = ret['response'];
    },
      error => {

      })

  }

  
  filter(event){
    const wordToFilter = event.target.value
    if(wordToFilter != null){
      this.filteredCompanys = this.companys.filter(influencer =>{
        return influencer.nome.toLowerCase().includes(wordToFilter.toLowerCase())
      })
    }
  }

}
