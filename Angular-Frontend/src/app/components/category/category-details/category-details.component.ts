import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category|any = {
    id:null,
    name: '',
    description: '',
    image: '',
    content: '',
    updated:null
  };
  isLoadingResults: boolean = true;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.getCategoryDetails(this.route.snapshot.params['id']);
  }
  getCategoryDetails(id: any) {
    this.categoryService.getCategory(id).subscribe((res: any) => {
      this.category = res.data;
      console.log(this.category);
      this.isLoadingResults = false;
    });
  }

  deleteCategory(id: any) {
    this.isLoadingResults = true;
    this.categoryService.deleteCategory(id).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/category']);
    });
  }

}
