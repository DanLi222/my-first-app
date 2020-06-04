import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  fetchData(): Observable<object> {
    return this.http.get('https://api.covid19api.com/world/total');
  }

  fetchCountries(): Observable<object> {
    return this.http.get('https://api.covid19api.com/summary');
  }
}
