import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  Global: object;
  Countries: any[];
}

@Injectable()
export class ConfigService {
  configUrl = 'https://api.covid19api.com/summary';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<object> {
    return this.http.get('https://api.covid19api.com/world/total');
  }

  fetchCountries(): Observable<object> {
    return this.http.get<Config>(this.configUrl);
  }
}
