import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  goTo(postagem){ 
    this.router.navigate(['/postagem-modal'])
    localStorage.setItem('postagem', JSON.stringify(postagem))
  }

  filteredPosts = []
  filter(event){
    const wordToFilter = event.target.value
    if(wordToFilter != null){
      this.filteredPosts = this.postagens.filter(post =>{
        return post.nome.toLowerCase().includes(wordToFilter.toLowerCase())
      })
    }
  }

  ngOnInit() {
    this.filteredPosts = this.postagens
  }

}
