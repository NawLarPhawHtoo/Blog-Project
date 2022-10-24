import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl,FormGroup,FormBuilder,Validators,NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup | any;
  name = '';
  description = '';
  image = '';
  content = '';
  isLoadingResults: boolean = false;

  constructor(private router:Router,private categoryServcie:CategoryService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      content: ['']
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.categoryServcie.addCategory(this.categoryForm.value).subscribe((res: any) => {
      console.log(res);
      const id: any = res.data._id;
      console.log(id);
      this.isLoadingResults = false;
      this.router.navigate(['/category/details',id]);
    });
  }

}
