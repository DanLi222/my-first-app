import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  url = 'https://api.covid19api.com/summary';

  constructor(private http: HttpClient) { }

  /**
   * Handle error message
   * @param error
   */
  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Do api get call
   */
  fetchCountries(): Observable<object> {
    return this.http.get(this.url)
      .pipe(
        catchError(ConfigService.handleError)
      );
  }
}
