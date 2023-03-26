import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apiService: ApiService) {}

  getMoviesByCategory(categoryId: string): Observable<ApiResponse> {
    return this.apiService.get('movies/' + categoryId);
  }
}
