import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Movie } from 'src/app/models/movie.model';

import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss'],
})
export class BottomsheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private router: Router
  ) {}

  @Input() movie?: Movie;

  openSingleMoviePage(): void {
    this.bottomSheetRef?.dismiss();

    this.router.navigate(['movie', this.movie?.title], {
      state: { movie: this.movie },
    });
  }

  ngOnInit(): void {
    this.movie = this.data.movie;

    console.log(this.movie?.trailerUrl);

    console.log(this.bottomSheetRef);
  }
}
