import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { SingleMovieComponent } from './components/core/single-movie/single-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMovieComponent } from './components/shared/add-movie/add-movie.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BottomsheetComponent } from './components/shared/bottomsheet/bottomsheet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from './components/shared/bottom-nav/bottom-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingleMovieComponent,
    AddMovieComponent,
    NavigationComponent,
    BottomsheetComponent,
    BottomNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatBottomSheetModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
