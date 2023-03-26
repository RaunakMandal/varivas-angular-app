import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.API_URL}/${endpoint}`);
  }

  post(endpoint: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.API_URL}/${endpoint}`,
      data
    );
  }
}
