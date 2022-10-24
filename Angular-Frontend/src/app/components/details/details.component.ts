import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  post: Post | any = {
    category_id: '',
    id: '',
    title: '',
    author: '',
    description: '',
    content: '',
    reference: '',
    postImage: '',
    created: null,
    updated: null
  };
  isLoadingResults: boolean = true;

  constructor(private route:ActivatedRoute,private homeService:HomeService,private router:Router) { }

  ngOnInit(): void {
    this.getPostDetails(this.route.snapshot.params['id']);
  }
  getPostDetails(id: any) {
    this.homeService.getPost(id).subscribe((res: any) => {
      this.post = res.data;
      console.log(this.post);
      console.log(this.post.title);
      this.isLoadingResults = false;
    });
  }

}
