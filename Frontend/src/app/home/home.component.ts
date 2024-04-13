import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Encapsula tu código JavaScript aquí si es necesario
    // Por ejemplo, si necesitas ejecutar algo cuando el componente se inicia
    // o después de que se hayan renderizado las vistas

    // ==== for menu scroll
    const pageLink = document.querySelectorAll(".ud-menu-scroll");

    pageLink.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const targetHref = elem.getAttribute("href");
        if (targetHref) {
          const targetElement = document.querySelector(targetHref) as HTMLElement; // Especificamos el tipo HTMLElement
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth"
            });
            // Ajustar el desplazamiento vertical después del scroll
            window.scrollBy(0, -60); // Reduzco el desplazamiento en 60px
          }
        }
      });
    });

    // ==== for faq buttons
    const faqs = document.querySelectorAll(".single-faq");
    faqs.forEach((el) => {
      const faqBtn = el.querySelector(".faq-btn");
      if (faqBtn) {
        faqBtn.addEventListener("click", () => {
          const icon = el.querySelector(".icon");
          const faqContent = el.querySelector(".faq-content");
          if (icon && faqContent) {
            icon.classList.toggle("rotate-180");
            faqContent.classList.toggle("hidden");
          }
        });
      }
    });

    // Suscribirse al evento de desplazamiento
    window.document.addEventListener("scroll", this.onScroll);
  }

  // Función para el evento de desplazamiento
  onScroll(event: Event) {
    const sections = document.querySelectorAll(".ud-menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      if (val) {
        const refElement = document.querySelector(val) as HTMLElement; // Especificamos el tipo HTMLElement
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement &&
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          const menuScroll = document.querySelector(".ud-menu-scroll");
          if (menuScroll) {
            menuScroll.classList.remove("active");
          }
          currLink.classList.add("active");
        } else {
          currLink.classList.remove("active");
        }
      }
    }
  }
}



