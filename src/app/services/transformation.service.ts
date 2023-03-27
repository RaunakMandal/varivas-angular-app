import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  constructor() {}

  truncateDescription(description?: string): string {
    if ((description?.length as number) > 150) {
      return description?.substring(0, 150) as string;
    } else {
      return description as string;
    }
  }

  getDurationFromMinutes(minutes?: number): string {
    if (minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      return `${hours}h ${mins}m`;
    } else {
      return '';
    }
  }
}
