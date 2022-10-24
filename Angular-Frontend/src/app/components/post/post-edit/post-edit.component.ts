import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup | any;
  category_id = '';
  id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  reference = '';
  postImage = '';
  updated: Date | any = null;
  isLoadingResults: boolean = false;
  categories: Category[] | any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private categoryService: CategoryService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getPost(this.route.snapshot.params['id']);
    this.postForm = this.fb.group({
      category_id:[''],
      title: ['', Validators.required],
      author: [''],
      description: [''],
      content: [''],
      reference: [''],
      postImage: ['']
    });
  }
  getPost(id: any) {
    this.postService.getPost(id).subscribe((res: any) => {
      console.log(res);
      this.id = res.data._id;
      this.postForm.setValue({
        category_id:res.data.category_id,
        title: res.data.title,
        author: res.data.author,
        description: res.data.description,
        content: res.data.content,
        reference: res.data.reference,
        postImage: res.data.postImage
      });
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
      this.isLoadingResults = false;
    });
  }

  onFormSubmit() {
    console.log(this.id);
    this.isLoadingResults = true;
    this.postService.updatePost(this.id, this.postForm.value).subscribe((res: any) => {
      const id = res.data._id;
      this.isLoadingResults = false;
      this.router.navigate(['/post/details',id]);
    });
  }
  postDetails() {
    this.router.navigate(['/post/details', this.id]);
  }

}
