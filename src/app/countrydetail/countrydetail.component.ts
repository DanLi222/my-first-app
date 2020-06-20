import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConfigService} from '../config/config.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-countrydetail',
  templateUrl: './countrydetail.component.html',
  styleUrls: ['./countrydetail.component.css']
})
export class CountrydetailComponent implements OnInit {
  countryName;
  countryData;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.setCountryName();
  }

  /**
   * Get country name through route param
   */
  setCountryName(){
    this.route.params.subscribe(
      param => {
        this.countryName = param.name;
        this.getCountryDate(this.countryName);
      }
    );
  }

  /**
   * Get data for country
   */
  getCountryDate(name: string){
    this.configService.getCountryData(name).subscribe(
      res => {
        this.countryData = res;
        this.showCountryDetail();
      });
  }

  /**
   * Show country detailed data
   */
  showCountryDetail(){
    // Prepare data points
    const points = [];
    this.countryData.forEach( (day: any) => {
      points.push({
        label: day.Date,
        y: day.Cases
      });
    });
    console.log(points);
    // Create a chart
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: this.countryName + ' Accumulated Confirmed Cases'
      },
      data: [
        {
          type: 'line',
          dataPoints: points
        }
      ]
    });
    chart.render();
  }
}
