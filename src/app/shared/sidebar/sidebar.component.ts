import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { ROUTES } from './sidebar-routers.config';

// Remove the duplicate import statement for '$'
import $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menuItems: any[] = [];

  constructor(public sidebarService: SidebarService, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Puedes realizar acciones adicionales cuando comienza la navegación.
      }

      if (event instanceof NavigationEnd && this.isWindowDefined() && $(window) !== null && $(window)!.width()! <= 991 && (document.readyState === 'complete' || false)) {
        this.toggleSidebar();
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  private isWindowDefined(): boolean {
    return typeof window !== 'undefined';
  }

  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
    if ($('.wrapper').hasClass('nav-collapsed')) {
      $('.wrapper').removeClass('nav-collapsed');
      $('.sidebar-wrapper').off('hover');
    }
    else {
      $('.wrapper').addClass('nav-collapsed');
      $('.sidebar-wrapper').hover(function () {
        $('.wrapper').addClass('sidebar-hovered');
      }, function () {
        $('.wrapper').removeClass('sidebar-hovered');
      });
    }

  }

  getSidebarStatus() {
    return this.sidebarService.getSidebarState();
  }

  hideSidebar() {
    this.sidebarService.getSidebarState();
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    $.getScript('./assets/js/app-sidebar.js');
  }

  isMenuItemActive(path: string): boolean {
    return this.router.url.includes(path);
  }
  ngAfterViewInit(): void {
  }

}
