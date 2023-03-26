import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  constructor(private router: Router) {}

  movie: Movie | undefined;

  ngOnInit(): void {
    if (!history.state.movie) {
      this.router.navigate(['/']);
    }

    this.movie = history.state.movie;
  }
}
