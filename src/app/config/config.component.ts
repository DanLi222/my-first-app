import { Config, ConfigService } from './config.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-config',
  template: '',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
  config: Config;

  constructor(
    private configService: ConfigService,
  ) { }

  showConfig() {
    console.log('show');
    this.configService.fetchCountries()
      .subscribe(data => {
        // this.config = {
        //   Global: data.Global,
        //   Countries: data.Countries
        // };
        console.log('data');
        console.log(data);
      });
  }
}
