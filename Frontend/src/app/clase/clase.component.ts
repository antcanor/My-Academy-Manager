import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PatronClasePipe } from '../pipes/patron-clase.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [RouterModule, PatronClasePipe, NgxPaginationModule],
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent {
  private api = inject(ApiService);
  private userService = inject(UserService);
  public token: any;
  public identity: any;
  public clases: any;
  public claseToDelete: any;
  page: number = 1;
  patron: string = '';
  roles: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.loadUser();
    if (this.identity.rol == 'admin') {
      this.getClases();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  loadUser() {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  getSafeHtml(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  confirmDelete(clase: any) {
    this.claseToDelete = clase;
    const modal = document.getElementById('delete-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      overlay.classList.remove('hidden');
      overlay.classList.add('block');
    }
  }

  deleteClase(clase: any) {
    this.api.deleteClase(this.token, clase.id).subscribe(
      (response: any) => {
        this.getClases();
        this.closeModal();
      },
      error => {
        console.log(error);
      }
    );
  }

  closeModal() {
    const modal = document.getElementById('delete-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      overlay.classList.add('hidden');
      overlay.classList.remove('block');
    }
  }
  getClases() {
    return this.api.getClases(this.token).subscribe(
      (response: any) => {
        let clases = response.data;
        this.clases = JSON.parse(clases);
      },
      error => {
        console.log(error);
      }
    );
  }
}

