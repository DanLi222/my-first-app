import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$;
  topCountries$;

  constructor(
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.showGlobal();
  }

  showGlobal() {
    this.configService.fetchCountries()
      .subscribe((res: any) => {
        this.global$ = res.Global;
        this.topCountries$ = res.Countries.sort((a, b) => {
          return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
        }).slice(0, 10);
        this.showCountries();
      });
  }

  showCountries() {
    const countrynumbers = [];
    for (const country of this.topCountries$) {
      countrynumbers.push(
        {
          y: country.TotalConfirmed,
          label: country.Country
        }
      );
    }
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Top 10 Countries'
      },
      data: [{
        type: 'column',
        dataPoints: countrynumbers
      }]
    });
    chart.render();
  }

}
