import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import * as CanvasJS from '../canvasjs.min';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data$;
  global$;
  topCountries$;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private config: ConfigComponent
  ) { }

  ngOnInit(): void {
    this.global$ = this.config.showConfig();
    // this.configService.fetchData()
    //     .subscribe( res => {
    //       console.log('data ' + JSON.stringify(res));
    //       this.data$ = res;
    //   });
    console.log('config data');
    console.log(this.global$);
    // this.configService.fetchCountries()
    //     .subscribe(data => {
    //       this.config = {
    //       Global: (data as any).Global,
    //       Countries: (data as any).Countries};
    //       this.global$ = this.config.Global;
    //       // this.topCountries$ = res.Countries.sort((a, b) => {
    //       //   return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
    //       // }).slice(0, 10);
    //       // const countrynumbers = [];
    //       // for (const country of this.topCountries$) {
    //       //   countrynumbers.push(
    //       //     {
    //       //       y: country.TotalConfirmed,
    //       //       label: country.Country
    //       //     }
    //       //   );
    //       // }
    //       this.topCountries$ = this.config.Countries.sort((a, b) => {
    //         return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1;
    //          }).slice(0, 10);
    //       const chart = new CanvasJS.Chart('chartContainer', {
    //         animationEnabled: true,
    //         exportEnabled: true,
    //         title: {
    //           text: 'Top 10 Countries'
    //         },
    //         data: [{
    //           type: 'column',
    //           dataPoints: [
    //             { y: this.topCountries$[0].TotalConfirmed, label: this.topCountries$[0].Country },
    //             { y: this.topCountries$[1].TotalConfirmed, label: this.topCountries$[1].Country },
    //             { y: this.topCountries$[2].TotalConfirmed, label: this.topCountries$[2].Country },
    //             { y: this.topCountries$[3].TotalConfirmed, label: this.topCountries$[3].Country },
    //             { y: this.topCountries$[4].TotalConfirmed, label: this.topCountries$[4].Country },
    //             { y: this.topCountries$[5].TotalConfirmed, label: this.topCountries$[5].Country },
    //             { y: this.topCountries$[6].TotalConfirmed, label: this.topCountries$[6].Country },
    //             { y: this.topCountries$[7].TotalConfirmed, label: this.topCountries$[7].Country },
    //             { y: this.topCountries$[8].TotalConfirmed, label: this.topCountries$[8].Country },
    //             { y: this.topCountries$[9].TotalConfirmed, label: this.topCountries$[9].Country }
    //           ]
    //         }]
    //       });
    //       chart.render();
    //     });
  }

  // signOut(): void {
  //   this.authService.signOut().then(success => this.router.navigate(['/login']));
  // }

}
