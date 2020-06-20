import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  summaryUrl = 'https://api.covid19api.com/summary';
  countriesUrl = 'https://api.covid19api.com/countries';
  countryUrl1 = 'https://api.covid19api.com/dayone/country/';
  countryUrl2 = '/status/confirmed';
  private countryUrl: string;
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
   * Do api get call for a overall of the globe
   */
  getSummary(): Observable<object> {
    return this.http.get(this.summaryUrl)
      .pipe(
        catchError(ConfigService.handleError)
      );
  }

  /**
   * Do api call for country list
   */
  getCountries(): Observable<object> {
    return this.http.get(this.countriesUrl)
      .pipe(
        catchError(ConfigService.handleError)
      );
  }

  /**
   * Do api call for a required country
   */
  getCountryData(name: string): Observable<object> {
    this.countryUrl = this.countryUrl1 + name + this.countryUrl2;
    return this.http.get(this.countryUrl)
      .pipe(
        catchError(ConfigService.handleError)
      );
  }
}
