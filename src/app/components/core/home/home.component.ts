import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiError } from 'src/app/models/api-error.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { BottomsheetComponent } from '../../shared/bottomsheet/bottomsheet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private bottomSheet: MatBottomSheet
  ) {}

  loading: boolean = true;
  error: ApiError = {
    error: false,
    message: '',
  };

  categories: Category[] = [];

  moviesLoading: boolean = true;

  fetchCategoryWiseMovies(categoryId: string): void {
    this.movieService
      .getMoviesByCategory(categoryId)
      .subscribe((response: ApiResponse) => {
        this.moviesLoading = false;

        if (response.error) {
          this.error = response.error;
          return;
        }

        this.categories.forEach((category: Category) => {
          if (category._id === categoryId) {
            category.movies = response.data;
            category.loading = false;
          }
        });
      });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((response: ApiResponse) => {
      this.loading = false;

      if (response.error) {
        this.error = response.error;
        return;
      }

      this.categories = response.data.map((category: Category) => {
        category.loading = true;
        this.fetchCategoryWiseMovies(category._id as string);
        return category;
      });
    });
  }

  openBottomSheet(movie: Movie): void {
    this.bottomSheet.open(BottomsheetComponent, {
      data: {
        movie,
      },
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }
}
