import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  productLinks = [
    { label: 'Features', link: '#features' },
    { label: 'Pricing', link: '#pricing' },
    { label: 'API', link: '#' },
    { label: 'Integrations', link: '#' },
    { label: 'Documentation', link: '#' }
  ];

  companyLinks = [
    { label: 'About Us', link: '#' },
    { label: 'Blog', link: '#' },
    { label: 'Careers', link: '#' },
    { label: 'Contact', link: '#' },
    { label: 'Partners', link: '#' }
  ];

  legalLinks = [
    { label: 'Privacy Policy', link: '#' },
    { label: 'Terms of Service', link: '#' },
    { label: 'Cookie Policy', link: '#' },
    { label: 'Security', link: '#' },
    { label: 'Compliance', link: '#' }
  ];

  resourcesLinks = [
    { label: 'Help Center', link: '#' },
    { label: 'Tutorials', link: '#' },
    { label: 'API Reference', link: '#' },
    { label: 'Status', link: '#' },
    { label: 'Community', link: '#' }
  ];

  socialLinks = [
    {
      name: 'Twitter',
      icon: 'twitter',
      link: 'https://twitter.com'
    },
    {
      name: 'GitHub',
      icon: 'github',
      link: 'https://github.com'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: 'https://linkedin.com'
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      link: 'https://youtube.com'
    }
  ];
}

