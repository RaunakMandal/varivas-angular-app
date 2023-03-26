import { ApiError } from './api-error.model';

export interface ApiResponse {
  success: boolean;
  count?: number;
  data: any;
  error?: ApiError;
}
