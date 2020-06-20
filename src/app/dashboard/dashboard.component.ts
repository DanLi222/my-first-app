import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$: {
    totalConfirmed,
    totalDeath,
    totalRecovered
  };
  topCountries$;
  error;

  constructor(
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.showSummary();
  }

  /**
   *  Show overall data
   */
  showSummary() {
    this.configService.getSummary()
      .subscribe((res: any) => {
        // Populate global object
        this.global$ = {
          totalConfirmed: res.Global.TotalConfirmed,
          totalDeath: res.Global.TotalDeaths,
          totalRecovered: res.Global.TotalRecovered
        };
        // Get top 10 countries
        this.topCountries$ = res.Countries.sort((a, b) => {
          return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
        }).slice(0, 10);
        this.showCountries();
      }, err => {
        this.error = err;
      });

  }

  /**
   *  Show top 10 countries data
   */
  showCountries() {
    // Prepare data points
    const countrynumbers = [];
    for (const country of this.topCountries$) {
      countrynumbers.push(
        {
          y: country.TotalConfirmed,
          label: country.Country
        }
      );
    }
    // Create chart using CanvasJS
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
