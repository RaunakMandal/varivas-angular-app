import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { TransformationService } from 'src/app/services/transformation.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  constructor(
    private router: Router,
    private transformationService: TransformationService
  ) {}

  movie: Movie | undefined;

  getDurationFromMinutes(minutes?: number): string {
    return this.transformationService.getDurationFromMinutes(minutes);
  }

  truncateDescription(description: string): string {
    return description;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (!history.state.movie) {
      this.router.navigate(['/']);
    }

    this.movie = history.state.movie;
  }
}
