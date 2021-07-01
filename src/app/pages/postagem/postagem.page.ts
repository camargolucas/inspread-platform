import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
})
export class PostagemPage implements OnInit {
  postagens = [
    {
      nome:'Isabel Ferreira dos Santos',
      story:'1',
      reels:'2',
      feed:'2',
      data: '2/10/2016',
     
    },
    {
      nome:'Isabel Ferreira dos Santos',
      story:'1',
      reels:'2',
      feed:'2',
      data: '25/10/2020',
     
    },
    {
      nome:'Isabel Ferreira dos Santos',
      story:'1',
      reels:'2',
      feed:'2',
      data: '25/10/2019',
     
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
