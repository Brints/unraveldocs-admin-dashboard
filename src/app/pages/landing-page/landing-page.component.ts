import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  // Features data
  features = [
    {
      icon: 'scan',
      title: 'Advanced OCR Technology',
      description: 'Extract text from images with 99% accuracy using state-of-the-art AI and Tesseract OCR engine.'
    },
    {
      icon: 'lightning',
      title: 'Lightning Fast Processing',
      description: 'Process thousands of documents in seconds with our optimized cloud infrastructure.'
    },
    {
      icon: 'shield',
      title: 'Enterprise Security',
      description: 'Your data is encrypted end-to-end and complies with GDPR, SOC 2, and ISO 27001 standards.'
    },
    {
      icon: 'formats',
      title: 'Multiple Formats',
      description: 'Support for PDF, JPG, PNG, TIFF, and more. Export to JSON, CSV, XML, or plain text.'
    },
    {
      icon: 'api',
      title: 'RESTful API',
      description: 'Integrate seamlessly with your existing workflow using our comprehensive API documentation.'
    },
    {
      icon: 'team',
      title: 'Team Collaboration',
      description: 'Share documents, manage permissions, and collaborate with your team in real-time.'
    }
  ];

  // Pricing plans
  pricingPlans = [
    {
      name: 'Starter',
      price: '29',
      period: 'month',
      description: 'Perfect for individuals and small projects',
      features: [
        '1,000 pages/month',
        'Basic OCR',
        'Email support',
        'API access',
        '5 team members'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '99',
      period: 'month',
      description: 'Best for growing businesses',
      features: [
        '10,000 pages/month',
        'Advanced OCR + AI',
        'Priority support',
        'API access',
        'Unlimited team members',
        'Custom integrations',
        'Analytics dashboard'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale operations',
      features: [
        'Unlimited pages',
        'Advanced OCR + AI',
        '24/7 dedicated support',
        'API access',
        'Unlimited team members',
        'Custom integrations',
        'Analytics dashboard',
        'SLA guarantee',
        'On-premise option'
      ],
      highlighted: false
    }
  ];

  // Testimonials
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      company: 'TechCorp Inc.',
      image: 'SJ',
      quote: 'Unraveldocs has transformed our document processing workflow. The accuracy and speed are phenomenal!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CTO, DataFlow',
      company: 'DataFlow Solutions',
      image: 'MC',
      quote: 'The API integration was seamless. We processed over 100,000 documents in the first month alone.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      company: 'LegalDocs Pro',
      image: 'ER',
      quote: 'Best OCR solution on the market. Customer support is exceptional and the accuracy is unmatched.',
      rating: 5
    }
  ];

  // Stats
  stats = [
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '10M+', label: 'Documents Processed' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '24/7', label: 'Support Available' }
  ];

  // Scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

