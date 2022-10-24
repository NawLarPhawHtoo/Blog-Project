import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description'];
  data: Post[] | any = [];
  isLoadingResults: boolean = true;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res: any) => {
      this.data = res.data;
      console.log(this.data);
      this.isLoadingResults = false;
    });
  }

}
