import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  label: string;
  value: number;
}

interface TimeSeriesData {
  date: string;
  documents: number;
  accuracy: number;
  errors: number;
}

interface TopDocument {
  name: string;
  processedCount: number;
  avgAccuracy: number;
  totalPages: number;
}

interface UserActivity {
  user: string;
  uploads: number;
  downloads: number;
  apiCalls: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  // Selected time period
  selectedPeriod = signal<'7d' | '30d' | '90d' | '1y'>('30d');

  // Key Performance Indicators
  kpis = [
    {
      title: 'Total Documents Processed',
      value: '45,283',
      change: '+12.5%',
      trend: 'up' as const,
      icon: 'document',
      color: 'blue'
    },
    {
      title: 'Average Accuracy',
      value: '98.4%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: 'chart',
      color: 'green'
    },
    {
      title: 'Processing Time',
      value: '2.3s',
      change: '-15.3%',
      trend: 'down' as const,
      icon: 'clock',
      color: 'purple'
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.8%',
      trend: 'up' as const,
      icon: 'check',
      color: 'indigo'
    }
  ];

  // Document processing trend (last 30 days)
  processingTrend: TimeSeriesData[] = [
    { date: 'Nov 01', documents: 1240, accuracy: 98.2, errors: 12 },
    { date: 'Nov 05', documents: 1580, accuracy: 98.5, errors: 8 },
    { date: 'Nov 10', documents: 1820, accuracy: 98.1, errors: 15 },
    { date: 'Nov 15', documents: 1950, accuracy: 98.7, errors: 7 },
    { date: 'Nov 20', documents: 2100, accuracy: 98.9, errors: 5 },
    { date: 'Nov 25', documents: 2240, accuracy: 98.4, errors: 9 },
    { date: 'Nov 30', documents: 2380, accuracy: 98.6, errors: 6 }
  ];

  // Document types distribution
  documentTypes: ChartData[] = [
    { label: 'PDF', value: 45 },
    { label: 'Images (JPG/PNG)', value: 30 },
    { label: 'Scanned Documents', value: 15 },
    { label: 'Receipts', value: 7 },
    { label: 'Other', value: 3 }
  ];

  // Processing status distribution
  statusDistribution: ChartData[] = [
    { label: 'Completed', value: 89 },
    { label: 'Processing', value: 7 },
    { label: 'Failed', value: 2 },
    { label: 'Queued', value: 2 }
  ];

  // Top performing documents
  topDocuments: TopDocument[] = [
    { name: 'Invoice_Template_2024.pdf', processedCount: 1247, avgAccuracy: 99.2, totalPages: 3741 },
    { name: 'Contract_Standard.pdf', processedCount: 892, avgAccuracy: 98.9, totalPages: 10704 },
    { name: 'Receipt_Scanner.jpg', processedCount: 756, avgAccuracy: 97.8, totalPages: 756 },
    { name: 'Medical_Records.pdf', processedCount: 623, avgAccuracy: 98.5, totalPages: 14952 },
    { name: 'Legal_Document.pdf', processedCount: 445, avgAccuracy: 99.1, totalPages: 3560 }
  ];

  // User activity
  userActivity: UserActivity[] = [
    { user: 'John Doe', uploads: 234, downloads: 189, apiCalls: 1240 },
    { user: 'Jane Smith', uploads: 198, downloads: 156, apiCalls: 980 },
    { user: 'Mike Johnson', uploads: 176, downloads: 142, apiCalls: 876 },
    { user: 'Sarah Williams', uploads: 134, downloads: 98, apiCalls: 654 },
    { user: 'Tom Brown', uploads: 112, downloads: 87, apiCalls: 543 }
  ];

  // Peak usage hours
  peakHours: ChartData[] = [
    { label: '00:00', value: 45 },
    { label: '04:00', value: 23 },
    { label: '08:00', value: 156 },
    { label: '12:00', value: 234 },
    { label: '16:00', value: 189 },
    { label: '20:00', value: 98 }
  ];

  // Error analysis
  errorTypes = [
    { type: 'Low Image Quality', count: 156, percentage: 42 },
    { type: 'Unsupported Format', count: 89, percentage: 24 },
    { type: 'File Size Too Large', count: 67, percentage: 18 },
    { type: 'Corrupted File', count: 45, percentage: 12 },
    { type: 'Network Timeout', count: 14, percentage: 4 }
  ];

  // API usage statistics
  apiStats = {
    totalCalls: 12456,
    successRate: 99.6,
    avgResponseTime: 145, // ms
    topEndpoints: [
      { endpoint: '/api/ocr/process', calls: 5678, avgTime: 230 },
      { endpoint: '/api/documents/list', calls: 3456, avgTime: 45 },
      { endpoint: '/api/export/csv', calls: 2134, avgTime: 89 },
      { endpoint: '/api/auth/validate', calls: 1188, avgTime: 12 }
    ]
  };

  // Storage statistics
  storageStats = {
    totalUsed: 45.8, // GB
    totalLimit: 100, // GB
    documentsCount: 12458,
    avgDocumentSize: 3.7, // MB
    breakdown: [
      { type: 'Documents', size: 32.4, percentage: 71 },
      { type: 'Images', size: 8.9, percentage: 19 },
      { type: 'Exports', size: 3.2, percentage: 7 },
      { type: 'Temporary', size: 1.3, percentage: 3 }
    ]
  };

  changePeriod(period: '7d' | '30d' | '90d' | '1y'): void {
    this.selectedPeriod.set(period);
    // In real app, fetch data for selected period
    console.log('Period changed to:', period);
  }

  getMaxValue(data: ChartData[]): number {
    return Math.max(...data.map(d => d.value));
  }

  getBarHeight(value: number, max: number): number {
    return (value / max) * 100;
  }

  getProcessingTrendMaxValue(): number {
    return Math.max(...this.processingTrend.map(d => d.documents));
  }

  getStatusOffset(index: number): number {
    const sumBefore = this.statusDistribution.slice(0, index).reduce((sum, s) => sum + s.value, 0);
    return -(sumBefore / 100) * 502.65;
  }

  getUserInitials(userName: string): string {
    return userName.split(' ').map(n => n[0]).join('');
  }

  exportReport(): void {
    console.log('Exporting analytics report...');
    // Implement export functionality
  }
}

