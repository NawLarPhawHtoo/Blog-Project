import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl,FormBuilder,FormGroup,NgForm,Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup | any;
  id = '';
  name = '';
  description = '';
  image = '';
  content = '';
  updated: Date | any = null;
  isLoadingResults: boolean = false;

  constructor(private router:Router,private route:ActivatedRoute,private categoryService:CategoryService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params['id']);
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      content: ['']
    });
  }

  getCategory(id: any) {
    this.categoryService.getCategory(id).subscribe((res: any) => {
      console.log(res);
      this.id = res.data._id;
      this.categoryForm.setValue({
        name: res.data.name,
        description: res.data.description,
        image: res.data.image,
        content:res.data.content
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log(this.id);
    this.categoryService.updateCategory(this.id, this.categoryForm.value).subscribe((res: any) => {
      const id = res.data.id;
      this.isLoadingResults = false;
      this.router.navigate(['/category/details',this.id]);
    });
  }
  categoryDetails() {
    this.router.navigate(['/category/details',this.id]);
  }

}
