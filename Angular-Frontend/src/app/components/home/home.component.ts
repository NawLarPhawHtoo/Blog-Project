import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] | any = [];
  isLoadingResults: boolean = false;

  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.homeService.getPosts().subscribe((res: any) => {
      this.posts = res.data;
      console.log(this.posts);
      this.isLoadingResults = false;
    });
  }

}
