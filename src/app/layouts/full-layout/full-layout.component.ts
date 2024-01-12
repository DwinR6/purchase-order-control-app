import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss'
})
export class FullLayoutComponent implements OnInit {

  constructor(public sidebarService: SidebarService, private router: Router) {

  }

  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }

  getSidebarState() {
    return this.sidebarService.getSidebarState();
  }

  hideSidebar() {
    this.sidebarService.getSidebarState();
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }


}
