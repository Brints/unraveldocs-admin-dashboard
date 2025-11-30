import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { ApiKeysComponent } from '../api-keys/api-keys.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AnalyticsComponent, ApiKeysComponent, SettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  user = this.authService.user;

  // Sidebar state
  sidebarOpen = signal(true);

  // Active page state
  activePage = signal<'dashboard' | 'documents' | 'upload' | 'queue' | 'analytics' | 'api-keys' | 'team' | 'settings' | 'help'>('dashboard');

  // Mock dashboard data (replace with real API calls later)
  stats = [
    {
      title: 'Total Documents',
      value: '12,458',
      change: '+12.5%',
      trend: 'up',
      icon: 'document',
      color: 'blue'
    },
    {
      title: 'Processed Today',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: 'check',
      color: 'green'
    },
    {
      title: 'In Queue',
      value: '342',
      change: '-3.1%',
      trend: 'down',
      icon: 'clock',
      color: 'yellow'
    },
    {
      title: 'Failed',
      value: '23',
      change: '+0.5%',
      trend: 'up',
      icon: 'alert',
      color: 'red'
    }
  ];

  recentDocuments = [
    {
      id: 1,
      name: 'Invoice_2024_001.pdf',
      status: 'completed',
      pages: 3,
      accuracy: 99.2,
      date: '2 mins ago',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Contract_Draft_v2.pdf',
      status: 'processing',
      pages: 12,
      accuracy: null,
      date: '5 mins ago',
      size: '5.1 MB'
    },
    {
      id: 3,
      name: 'Receipt_Scan.jpg',
      status: 'completed',
      pages: 1,
      accuracy: 98.7,
      date: '15 mins ago',
      size: '1.2 MB'
    },
    {
      id: 4,
      name: 'Legal_Document.pdf',
      status: 'failed',
      pages: 8,
      accuracy: null,
      date: '1 hour ago',
      size: '3.8 MB'
    },
    {
      id: 5,
      name: 'Medical_Records.pdf',
      status: 'completed',
      pages: 24,
      accuracy: 97.5,
      date: '2 hours ago',
      size: '8.7 MB'
    }
  ];

  recentActivity = [
    {
      type: 'upload',
      message: 'Uploaded 5 new documents',
      time: '10 minutes ago',
      user: 'John Doe'
    },
    {
      type: 'export',
      message: 'Exported data to CSV',
      time: '1 hour ago',
      user: 'Jane Smith'
    },
    {
      type: 'process',
      message: 'Batch processing completed',
      time: '2 hours ago',
      user: 'System'
    },
    {
      type: 'settings',
      message: 'Updated API settings',
      time: '3 hours ago',
      user: 'Admin'
    }
  ];

  quickStats = {
    avgAccuracy: 98.4,
    totalPages: 45678,
    activeUsers: 234,
    apiCalls: 12456
  };

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  navigateTo(page: 'dashboard' | 'documents' | 'upload' | 'queue' | 'analytics' | 'api-keys' | 'team' | 'settings' | 'help'): void {
    this.activePage.set(page);
  }

  logout(): void {
    this.authService.logout();
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      completed: 'green',
      processing: 'blue',
      failed: 'red',
      pending: 'yellow'
    };
    return colors[status] || 'gray';
  }

  getActivityIcon(type: string): string {
    return type;
  }
}

