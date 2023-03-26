import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { AwsUploadService } from 'src/app/services/aws-upload.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  constructor(
    private awsUploadService: AwsUploadService,
    private categoryService: CategoryService
  ) {}

  file: File | null = null;
  error: string = '';
  loading: boolean = false;
  uploading: any = {
    thumbnail: false,
    trailer: false,
  };

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

      this.uploading[type] = true;

      this.awsUploadService
        .uploadFile(this.file, type)
        .then((res) => {
          this.uploading[type] = false;
          console.log(res.Location);

          if (type === 'thumbnail') {
            this.movie.thumbnailUrl = res.Location;
          } else {
            this.movie.trailerUrl = res.Location;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  addMovie() {
    console.log(this.movie);
  }

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe((res: ApiResponse) => {
      this.categories = res.data;
      this.loading = false;
    });
  }
}
