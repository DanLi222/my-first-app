import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config/config.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries;
  error;
  list = ['A', 'B', 'C', 'D', 'E', 'F',
          'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.showCountries();
  }

  /**
   * Get a list of countries
   */
  showCountries() {
    this.configService.getCountries()
      .subscribe(res => {
        this.countries = res;
        console.log(res);
      }, err => this.error = err);
  }

  /**
   * Go to the right position in the page
   * @param letter
   */
  gotoAnchor(letter: string) {
    document.querySelector('#' + letter).scrollIntoView();
  }

  /**
   * Classify countries based on first letter
   * @param letter
   */
  getCountries(letter: string) {
    const selectedCountry = [];
    for (const country of this.countries) {
      if (country.Country.charAt(0) === letter) {
        selectedCountry.push(country.Country);
      }
    }
    return selectedCountry;
  }
}
