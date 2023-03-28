import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { ApiError } from 'src/app/models/api-error.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categoryName: string = '';
  existingCategories: Category[] = [];

  loading: boolean = false;
  error: ApiError = { error: false, message: '' };
  success: boolean = false;

  addCategory() {
    if (this.categoryName === '') {
      this.error.error = true;
      this.error.message = 'Category name cannot be empty';
      return;
    }

    this.loading = true;
    this.error.error = false;
    this.success = false;

    this.categoryService
      .addCategory(this.categoryName)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.error.error = true;
          this.error.message = err.error.error;

          this.loading = false;

          return [];
        }),
        map((res: ApiResponse) => {
          this.existingCategories.push(res.data);
          this.categoryName = '';
          this.success = true;
        })
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.error.error = true;
          this.error.message =
            err.status === 0 ? 'Server is down' : err.error.error;
          return [];
        })
      )
      .subscribe((res: ApiResponse) => {
        this.existingCategories = res.data;
      });
  }
}
