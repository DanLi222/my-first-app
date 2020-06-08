import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  user: SocialUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Access user info from local storage
   */
  getUser() {
    this.authService.authState.subscribe((user) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log('user dashboard name: ' + this.user.name);
    });
  }
}
