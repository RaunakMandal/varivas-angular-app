import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './components/core/add-page/add-page.component';
import { HomeComponent } from './components/core/home/home.component';
import { SingleMovieComponent } from './components/core/single-movie/single-movie.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'movie/:id',
    component: SingleMovieComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddPageComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
