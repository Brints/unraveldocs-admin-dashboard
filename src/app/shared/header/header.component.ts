import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() transparent: boolean = false;
  @Input() fixed: boolean = true;

  mobileMenuOpen = false;

  navigationItems = [
    { label: 'Features', link: '#features' },
    { label: 'Pricing', link: '#pricing' },
    { label: 'Testimonials', link: '#testimonials' },
    { label: 'Docs', link: '#' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.mobileMenuOpen = false;
  }
}

