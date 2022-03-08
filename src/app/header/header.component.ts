import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private navLinksSubscription!: Subscription;
  navbarLinksArray: any[] = [];
  breadcrumbLinks: string[] = [];
  profileName = '';

  constructor(private headerService: HeaderService, private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.headerService.initializeHeaderLinks();
      }
    });

    this.navLinksSubscription = this.headerService.headerData
    .subscribe((headerObject: any) => {
      if(headerObject && Object.keys(headerObject).length > 0 && headerObject.headerLinks) {
        this.navbarLinksArray = headerObject.headerLinks;
      }
      if(headerObject && Object.keys(headerObject).length > 0 && headerObject.breadcrumbLinks) {
        this.breadcrumbLinks = headerObject.breadcrumbLinks;
      }
      this.profileName = headerObject && headerObject.profileName ? headerObject.profileName : '';
    });
  }

  navLinkClicked(urlLabel: string) {
    if(urlLabel === 'logout') {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    this.navLinksSubscription.unsubscribe();
  }

}
