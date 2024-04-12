import { CommonModule } from '@angular/common';
import { Component, inject, HostListener, DoCheck } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../user.service';




@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{

  
  constructor(private sanitizer: DomSanitizer) { }
  private api=inject(ApiService)
  private userService=inject(UserService)
  public identity: any;
  public token: any;
  
  ngDoCheck(){
    this.loadUser();
  }
  
  getSafeHtml(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
 getMenu(){
  return this.api.getMenu();
 }


  isMenuVisible: boolean = false; // Inicialmente el menú está oculto

  toggleDropdown(): void {
    this.isMenuVisible = !this.isMenuVisible; // Alternar la visibilidad
  }

  isMobileMenuVisible: boolean = false; // Estado inicial del menú móvil, oculto

  toggleMobileMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible; // Alternar la visibilidad del menú móvil
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    const windowWidth = event.target.innerWidth;

    if (windowWidth >= 650) {
      this.isMobileMenuVisible = false;
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuVisible = false; // Cierra el menú móvil
  }

  loadUser(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  

}