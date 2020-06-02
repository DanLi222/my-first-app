import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  data$;
  mapData$;
  countries$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log('user dashboard name: ' + user.name);
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut().then(success => this.router.navigate(['/login']));
  }

  fetchData() {
    this.data$ = this.configService.fetchData()
      .subscribe( res => {
      this.data$ = res;
        console.log('data ' + JSON.stringify(res));
      this.mapData$ = Object.keys(this.data$)
                            .map(key => ({type: key, value: this.data$[key]}));
      console.log('mapData' + JSON.stringify(this.mapData$));
      console.log(this.mapData$);
    });
  }

  fetchCountries() {
    this.countries$ = this.configService.fetchCountries()
      .subscribe(res => {
        console.log(res);
        console.log('res' + res);
        this.countries$ = res;
        // this.countries$ = Object.keys(res)
        //                         .map(key => ({type: key, value: this.data$[key]}));
        // console.log('countries: ' + JSON.stringify(this.countries$));
      });
  }
}
