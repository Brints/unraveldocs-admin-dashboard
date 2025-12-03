import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { ApiKeysComponent } from '../api-keys/api-keys.component';
import { SettingsComponent } from '../settings/settings.component';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AnalyticsComponent, ApiKeysComponent, SettingsComponent, TeamComponent],
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

  // Documents page state
  documentSearchQuery = signal('');
  documentFilterStatus = signal<'all' | 'completed' | 'processing' | 'failed' | 'pending'>('all');
  documentSortBy = signal<'date' | 'name' | 'size' | 'accuracy'>('date');
  selectedDocuments = signal<number[]>([]);
  documentViewMode = signal<'grid' | 'list'>('list');

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

  // All documents for documents page
  allDocuments = [
    {
      id: 1,
      name: 'Invoice_2024_001.pdf',
      status: 'completed',
      pages: 3,
      accuracy: 99.2,
      date: '2024-11-30T14:30:00',
      dateFormatted: '2 mins ago',
      size: '2.4 MB',
      sizeBytes: 2516582,
      type: 'PDF',
      uploadedBy: 'John Doe',
      category: 'Invoice',
      tags: ['financial', 'invoice', '2024'],
      extractedText: 4250,
      thumbnail: 'invoice-thumb.jpg'
    },
    {
      id: 2,
      name: 'Contract_Draft_v2.pdf',
      status: 'processing',
      pages: 12,
      accuracy: null,
      date: '2024-11-30T14:25:00',
      dateFormatted: '5 mins ago',
      size: '5.1 MB',
      sizeBytes: 5348557,
      type: 'PDF',
      uploadedBy: 'Jane Smith',
      category: 'Legal',
      tags: ['contract', 'legal', 'draft'],
      extractedText: null,
      thumbnail: 'contract-thumb.jpg'
    },
    {
      id: 3,
      name: 'Receipt_Scan.jpg',
      status: 'completed',
      pages: 1,
      accuracy: 98.7,
      date: '2024-11-30T14:15:00',
      dateFormatted: '15 mins ago',
      size: '1.2 MB',
      sizeBytes: 1258291,
      type: 'JPG',
      uploadedBy: 'Mike Johnson',
      category: 'Receipt',
      tags: ['receipt', 'expense'],
      extractedText: 850,
      thumbnail: 'receipt-thumb.jpg'
    },
    {
      id: 4,
      name: 'Legal_Document.pdf',
      status: 'failed',
      pages: 8,
      accuracy: null,
      date: '2024-11-30T13:30:00',
      dateFormatted: '1 hour ago',
      size: '3.8 MB',
      sizeBytes: 3985408,
      type: 'PDF',
      uploadedBy: 'Sarah Williams',
      category: 'Legal',
      tags: ['legal', 'document'],
      extractedText: null,
      thumbnail: 'legal-thumb.jpg'
    },
    {
      id: 5,
      name: 'Medical_Records.pdf',
      status: 'completed',
      pages: 24,
      accuracy: 97.5,
      date: '2024-11-30T12:30:00',
      dateFormatted: '2 hours ago',
      size: '8.7 MB',
      sizeBytes: 9123840,
      type: 'PDF',
      uploadedBy: 'Dr. Emily Brown',
      category: 'Medical',
      tags: ['medical', 'records', 'confidential'],
      extractedText: 18500,
      thumbnail: 'medical-thumb.jpg'
    },
    {
      id: 6,
      name: 'Business_Proposal_2024.pdf',
      status: 'completed',
      pages: 45,
      accuracy: 96.8,
      date: '2024-11-30T10:00:00',
      dateFormatted: '4 hours ago',
      size: '12.3 MB',
      sizeBytes: 12897689,
      type: 'PDF',
      uploadedBy: 'Robert Taylor',
      category: 'Business',
      tags: ['proposal', 'business', '2024'],
      extractedText: 35000,
      thumbnail: 'proposal-thumb.jpg'
    },
    {
      id: 7,
      name: 'Tax_Returns_2023.pdf',
      status: 'completed',
      pages: 18,
      accuracy: 99.5,
      date: '2024-11-29T16:20:00',
      dateFormatted: '1 day ago',
      size: '4.5 MB',
      sizeBytes: 4718592,
      type: 'PDF',
      uploadedBy: 'Lisa Anderson',
      category: 'Financial',
      tags: ['tax', 'financial', '2023'],
      extractedText: 12300,
      thumbnail: 'tax-thumb.jpg'
    },
    {
      id: 8,
      name: 'Employee_Handbook.pdf',
      status: 'completed',
      pages: 68,
      accuracy: 98.1,
      date: '2024-11-29T14:00:00',
      dateFormatted: '1 day ago',
      size: '15.8 MB',
      sizeBytes: 16567828,
      type: 'PDF',
      uploadedBy: 'HR Department',
      category: 'HR',
      tags: ['hr', 'handbook', 'employee'],
      extractedText: 52000,
      thumbnail: 'handbook-thumb.jpg'
    },
    {
      id: 9,
      name: 'Research_Paper_AI.pdf',
      status: 'pending',
      pages: 32,
      accuracy: null,
      date: '2024-11-29T11:30:00',
      dateFormatted: '2 days ago',
      size: '7.2 MB',
      sizeBytes: 7549747,
      type: 'PDF',
      uploadedBy: 'David Chen',
      category: 'Research',
      tags: ['research', 'ai', 'academic'],
      extractedText: null,
      thumbnail: 'research-thumb.jpg'
    },
    {
      id: 10,
      name: 'Marketing_Plan_Q1.pdf',
      status: 'completed',
      pages: 22,
      accuracy: 97.9,
      date: '2024-11-28T09:15:00',
      dateFormatted: '3 days ago',
      size: '6.1 MB',
      sizeBytes: 6396313,
      type: 'PDF',
      uploadedBy: 'Marketing Team',
      category: 'Marketing',
      tags: ['marketing', 'plan', 'q1'],
      extractedText: 16800,
      thumbnail: 'marketing-thumb.jpg'
    },
    {
      id: 11,
      name: 'Insurance_Policy.pdf',
      status: 'completed',
      pages: 15,
      accuracy: 98.9,
      date: '2024-11-27T15:45:00',
      dateFormatted: '4 days ago',
      size: '3.2 MB',
      sizeBytes: 3355443,
      type: 'PDF',
      uploadedBy: 'Admin',
      category: 'Insurance',
      tags: ['insurance', 'policy'],
      extractedText: 9800,
      thumbnail: 'insurance-thumb.jpg'
    },
    {
      id: 12,
      name: 'Training_Materials.pdf',
      status: 'failed',
      pages: 42,
      accuracy: null,
      date: '2024-11-27T10:20:00',
      dateFormatted: '4 days ago',
      size: '18.5 MB',
      sizeBytes: 19398656,
      type: 'PDF',
      uploadedBy: 'Training Dept',
      category: 'Training',
      tags: ['training', 'materials'],
      extractedText: null,
      thumbnail: 'training-thumb.jpg'
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

  // System Analytics Data
  systemAnalytics = {
    uptime: {
      days: 45,
      hours: 12,
      minutes: 34,
      percentage: 99.98
    },
    serverHealth: {
      status: 'healthy',
      responseTime: 45, // ms
      errorRate: 0.02 // percentage
    },
    resources: {
      cpu: {
        usage: 42,
        cores: 8,
        temperature: 65
      },
      memory: {
        used: 12.4,
        total: 32,
        percentage: 38.75
      },
      storage: {
        used: 450,
        total: 1000,
        percentage: 45
      },
      network: {
        inbound: 125.5,
        outbound: 89.3
      }
    },
    services: [
      { name: 'API Server', status: 'running', uptime: 99.99, port: 3000 },
      { name: 'Database', status: 'running', uptime: 99.97, port: 5432 },
      { name: 'Redis Cache', status: 'running', uptime: 99.95, port: 6379 },
      { name: 'OCR Engine', status: 'running', uptime: 99.89, port: 8080 },
      { name: 'File Storage', status: 'running', uptime: 99.99, port: 9000 },
      { name: 'Queue Worker', status: 'degraded', uptime: 98.45, port: 4000 }
    ],
    performance: {
      requestsPerMinute: 1250,
      avgResponseTime: 125,
      activeConnections: 342,
      queuedJobs: 28
    },
    security: {
      failedLoginAttempts: 12,
      blockedIPs: 5,
      activeTokens: 456,
      lastSecurityScan: '2 hours ago'
    }
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

  getServiceStatusColor(status: string): string {
    const colors: Record<string, string> = {
      running: 'green',
      degraded: 'yellow',
      stopped: 'red',
      starting: 'blue'
    };
    return colors[status] || 'gray';
  }

  getResourceColor(percentage: number): string {
    if (percentage >= 80) return 'red';
    if (percentage >= 60) return 'yellow';
    return 'green';
  }

  formatUptime(): string {
    const { days, hours, minutes } = this.systemAnalytics.uptime;
    return `${days}d ${hours}h ${minutes}m`;
  }

  getHealthStatusColor(status: string): string {
    const colors: Record<string, string> = {
      healthy: 'green',
      warning: 'yellow',
      critical: 'red'
    };
    return colors[status] || 'gray';
  }

  // Document management methods
  get filteredDocuments() {
    let filtered = [...this.allDocuments];

    // Apply status filter
    if (this.documentFilterStatus() !== 'all') {
      filtered = filtered.filter(doc => doc.status === this.documentFilterStatus());
    }

    // Apply search filter
    const searchQuery = this.documentSearchQuery().toLowerCase();
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery) ||
        doc.category.toLowerCase().includes(searchQuery) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }

    // Apply sorting
    const sortBy = this.documentSortBy();
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'size':
          return b.sizeBytes - a.sizeBytes;
        case 'accuracy':
        {
          const accA = a.accuracy || 0;
          const accB = b.accuracy || 0;
          return accB - accA;
        }
        default:
          return 0;
      }
    });

    return filtered;
  }

  get completedDocumentsCount(): number {
    return this.allDocuments.filter(d => d.status === 'completed').length;
  }

  get processingDocumentsCount(): number {
    return this.allDocuments.filter(d => d.status === 'processing' || d.status === 'pending').length;
  }

  get failedDocumentsCount(): number {
    return this.allDocuments.filter(d => d.status === 'failed').length;
  }

  setDocumentFilter(status: 'all' | 'completed' | 'processing' | 'failed' | 'pending'): void {
    this.documentFilterStatus.set(status);
  }

  setDocumentSort(sortBy: 'date' | 'name' | 'size' | 'accuracy'): void {
    this.documentSortBy.set(sortBy);
  }

  toggleDocumentSelection(docId: number): void {
    const selected = this.selectedDocuments();
    if (selected.includes(docId)) {
      this.selectedDocuments.set(selected.filter(id => id !== docId));
    } else {
      this.selectedDocuments.set([...selected, docId]);
    }
  }

  selectAllDocuments(): void {
    const allIds = this.filteredDocuments.map(doc => doc.id);
    this.selectedDocuments.set(allIds);
  }

  deselectAllDocuments(): void {
    this.selectedDocuments.set([]);
  }

  isDocumentSelected(docId: number): boolean {
    return this.selectedDocuments().includes(docId);
  }

  get selectedCount(): number {
    return this.selectedDocuments().length;
  }

  downloadDocument(docId: number): void {
    const doc = this.allDocuments.find(d => d.id === docId);
    console.log('Downloading document:', doc?.name);
    // TODO: Implement actual download logic with API call
  }

  viewDocument(docId: number): void {
    const doc = this.allDocuments.find(d => d.id === docId);
    console.log('Viewing document:', doc?.name);
    // TODO: Implement document viewer
  }

  deleteDocument(docId: number): void {
    const doc = this.allDocuments.find(d => d.id === docId);
    if (confirm(`Are you sure you want to delete "${doc?.name}"?`)) {
      console.log('Deleting document:', doc?.name);
      // TODO: Implement actual delete with API call
      const index = this.allDocuments.findIndex(d => d.id === docId);
      if (index > -1) {
        this.allDocuments.splice(index, 1);
      }
    }
  }

  retryDocument(docId: number): void {
    const doc = this.allDocuments.find(d => d.id === docId);
    console.log('Retrying document processing:', doc?.name);
    // TODO: Implement retry with API call
  }

  exportSelectedDocuments(): void {
    console.log('Exporting selected documents:', this.selectedDocuments());
    // TODO: Implement export functionality
  }

  deleteSelectedDocuments(): void {
    if (confirm(`Are you sure you want to delete ${this.selectedCount} document(s)?`)) {
      console.log('Deleting selected documents:', this.selectedDocuments());
      // TODO: Implement bulk delete with API call
    }
  }

  toggleViewMode(): void {
    this.documentViewMode.update(mode => mode === 'list' ? 'grid' : 'list');
  }

  getFileIcon(type: string): string {
    return type.toLowerCase();
  }
}

