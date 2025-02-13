import * as movieRequests from './requests/movies';
import * as genreRequests from './requests/genres';
import * as reviewRequests from './requests/reviews';

const MoviesService = {
  ...movieRequests,
  ...genreRequests,
  ...reviewRequests,
};

export default MoviesService;
