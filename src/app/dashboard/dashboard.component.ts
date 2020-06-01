import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public currentUser: any = {};

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
      .catch(() => this.currentUser = {} );
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(this.user);
    // });
  }

  // signOut(): void {
  //   this.authService.signOut().then(success => this.router.navigate(['/login']));
  // }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
