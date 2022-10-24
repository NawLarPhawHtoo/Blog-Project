import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | any = {
    category_id: '',
    id:null,
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

  constructor(private route:ActivatedRoute,private postService:PostService,private router:Router) { }

  ngOnInit(): void {
    this.getPostDetails(this.route.snapshot.params['id']);
  }

  getPostDetails(id: any) {
    this.postService.getPost(id).subscribe((res: any) => {
      this.post = res.data;
      console.log(this.post);
      this.isLoadingResults = false;
    });
  }

  deletePost(id: any) {
    this.isLoadingResults = true;
    this.postService.deletePost(id).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/post']);
    });
  }
}
