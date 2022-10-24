import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  postForm: FormGroup | any;
  category_id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  reference = '';
  postImage = '';
  isLoadingResults: boolean = false;
  categories: Category[]|any = [];

  constructor(private router:Router,private postService:PostService,private categoryService:CategoryService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();
    this.postForm = this.fb.group({
      category_id: ['', Validators.required],
      title: ['', Validators.required],
      author: [''],
      description: [''],
      content: [''],
      reference: [''],
      postImage: ['']
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.postService.addPost(this.postForm.value).subscribe((res: any) => {
      const id = res.data._id;
      this.isLoadingResults = false;
      this.router.navigate(['/post/details', id]);
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
      this.isLoadingResults = false;
    });
  }

}
