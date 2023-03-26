import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getCategories(): Observable<ApiResponse> {
    return this.apiService.get('categories');
  }
}
