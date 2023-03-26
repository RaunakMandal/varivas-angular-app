import { Movie } from './movie.model';

export interface Category {
  _id?: string;
  name: string;

  movies?: Movie[];
  loading?: boolean;
}
