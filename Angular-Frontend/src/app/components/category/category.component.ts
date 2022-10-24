import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';
import { MatTable } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['categoryName', 'description'];
  data: Category[] | any = [];
  isLoadingResults: boolean = true;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: any) => {
      console.log(res);
      // this.users=res.data;
      this.data= res.data;
      this.isLoadingResults = false;
      // console.log(this.users)
    });

  }
}
