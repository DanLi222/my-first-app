import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  signInWithFB(): void {
    this.userService.fbLogin().then(() => {
      console.log('Called service from login component');
      this.router.navigate(['/dashboard']);
    });
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    //                 .then((userData) => {
    //                   console.log('Data' + userData);
    //                   this.router.navigate(['/dashboard']);
    //                 });
  }

}
