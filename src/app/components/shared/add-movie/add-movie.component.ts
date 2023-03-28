import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { AwsUploadService } from 'src/app/services/aws-upload.service';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  constructor(
    private awsUploadService: AwsUploadService,
    private categoryService: CategoryService,
    private movieService: MovieService
  ) {}

  file: File | null = null;
  thumbnailFile: File | null = null;
  trailerFile: File | null = null;

  element: HTMLElement | null = null;
  error: string = '';
  loading: boolean = false;

  categories: Category[] = [];

  movie: Movie = {
    title: '',
    description: '',
    releaseYear: 2000,
    rating: 10,
    ageRating: '',
    duration: 60,
    category: '',
    thumbnailUrl: '',
    trailerUrl: '',
  };

  onFileChange(e: Event, type: string) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;

    if (type === 'thumbnail' && files[0].size > 1000000) {
      this.error = 'File size must be less than 1MB';
      return;
    }

    if (type === 'trailer' && files[0].size > 100000000) {
      this.error = 'File size must be less than 100MB';
      return;
    }

    if (target.files?.length) {
      this.file = target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) =>
        type === 'thumbnail'
          ? ((this.movie.thumbnailUrl = e.target.result),
            (this.thumbnailFile = this.file))
          : ((this.movie.trailerUrl = e.target.result),
            (this.trailerFile = this.file));
      reader.readAsDataURL(this.file);
    }
  }

  removeAttachment(type: string) {
    if (type === 'thumbnail') {
      this.movie.thumbnailUrl = '';
    } else {
      this.movie.trailerUrl = '';
    }
  }

  async addMovie() {
    if (
      !this.movie.title ||
      !this.movie.description ||
      !this.movie.category ||
      !this.movie.ageRating
    ) {
      this.error = 'Please fill all the fields';
      return;
    }

    this.loading = true;

    if (!this.thumbnailFile) {
      this.loading = false;
      this.error = 'Please upload a thumbnail';
      return;
    }

    await this.awsUploadService
      .uploadFile(this.thumbnailFile, 'thumbnail')
      .then((res) => {
        this.movie.thumbnailUrl = res.Location;
      })
      .catch((err) => {
        this.loading = false;
        this.error = err;
      });

    if (!this.trailerFile) {
      this.loading = false;
      this.error = 'Please upload a trailer';
      return;
    }

    await this.awsUploadService
      .uploadFile(this.trailerFile, 'trailer')
      .then((res) => {
        this.movie.trailerUrl = res.Location;
      })
      .catch((err) => {
        this.loading = false;
        this.error = err;
      });

    this.movieService
      .addNewMovie(this.movie)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error.message;
          return [];
        })
      )
      .subscribe((res: ApiResponse) => {
        this.loading = false;

        this.movie = {
          title: '',
          description: '',
          releaseYear: 2000,
          rating: 10,
          ageRating: '',
          duration: 60,
          category: '',
          thumbnailUrl: '',
          trailerUrl: '',
        };
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe((res: ApiResponse) => {
      this.categories = res.data;
      this.loading = false;
    });
  }
}
