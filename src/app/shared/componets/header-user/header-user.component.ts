import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "@modules/auth/Service/auth.service";

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) { }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }
  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

}
