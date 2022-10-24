import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-bycategory',
  templateUrl: './bycategory.component.html',
  styleUrls: ['./bycategory.component.scss']
})
export class BycategoryComponent implements OnInit {

  posts: Post[] | any = [];
  isLoadingResults: boolean = true;

  constructor(private route:ActivatedRoute,private router:Router,private homeService:HomeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getPostsByCategory(this.route.snapshot.params['id']);
    });

  }
  getPostsByCategory(id: any) {
    this.posts = [];
    this.homeService.getPostByCategory(id).subscribe((res: any) => {
      this.posts = res.data;
      console.log(this.posts);
      this.isLoadingResults = false;
    });
  }
}
