import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  expiresAt: string | null;
  status: 'active' | 'revoked' | 'expired';
  permissions: string[];
  usage: {
    totalCalls: number;
    callsToday: number;
    callsThisMonth: number;
    lastCallAt: string | null;
  };
}

interface ApiKeyUsageStats {
  keyId: string;
  date: string;
  calls: number;
}

@Component({
  selector: 'app-api-keys',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.css']
})
export class ApiKeysComponent {
  // API Keys list
  apiKeys = signal<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'uvd_prod_xK9mP2wL5nQ7rT4vY8zA',
      createdAt: '2024-10-15T10:30:00Z',
      lastUsed: '2024-11-30T14:25:00Z',
      expiresAt: null,
      status: 'active',
      permissions: ['read', 'write', 'delete'],
      usage: {
        totalCalls: 45678,
        callsToday: 234,
        callsThisMonth: 12456,
        lastCallAt: '2024-11-30T14:25:00Z'
      }
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'uvd_dev_aB3cD4eF5gH6iJ7kL8mN',
      createdAt: '2024-11-01T09:15:00Z',
      lastUsed: '2024-11-29T16:45:00Z',
      expiresAt: '2025-11-01T00:00:00Z',
      status: 'active',
      permissions: ['read', 'write'],
      usage: {
        totalCalls: 8934,
        callsToday: 89,
        callsThisMonth: 3421,
        lastCallAt: '2024-11-29T16:45:00Z'
      }
    },
    {
      id: '3',
      name: 'Testing API Key',
      key: 'uvd_test_oP9qR8sT7uV6wX5yZ4',
      createdAt: '2024-09-20T14:20:00Z',
      lastUsed: '2024-11-15T11:30:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      status: 'active',
      permissions: ['read'],
      usage: {
        totalCalls: 2345,
        callsToday: 12,
        callsThisMonth: 456,
        lastCallAt: '2024-11-15T11:30:00Z'
      }
    },
    {
      id: '4',
      name: 'Archived Integration Key',
      key: 'uvd_arch_1A2b3C4d5E6f7G8h9I',
      createdAt: '2024-08-10T08:00:00Z',
      lastUsed: '2024-10-30T10:00:00Z',
      expiresAt: null,
      status: 'revoked',
      permissions: ['read', 'write'],
      usage: {
        totalCalls: 15678,
        callsToday: 0,
        callsThisMonth: 0,
        lastCallAt: '2024-10-30T10:00:00Z'
      }
    }
  ]);

  // Modal states
  showCreateModal = signal(false);
  showDeleteModal = signal(false);
  showDetailsModal = signal(false);
  selectedKey = signal<ApiKey | null>(null);

  // New key form
  newKeyName = signal('');
  newKeyPermissions = signal<string[]>(['read']);
  newKeyExpiry = signal<string | null>(null);

  // Generated key (shown after creation)
  generatedKey = signal<string | null>(null);

  // Usage statistics
  usageStats: ApiKeyUsageStats[] = [
    { keyId: '1', date: 'Nov 24', calls: 1840 },
    { keyId: '1', date: 'Nov 25', calls: 2100 },
    { keyId: '1', date: 'Nov 26', calls: 1950 },
    { keyId: '1', date: 'Nov 27', calls: 2240 },
    { keyId: '1', date: 'Nov 28', calls: 2180 },
    { keyId: '1', date: 'Nov 29', calls: 2012 },
    { keyId: '1', date: 'Nov 30', calls: 234 }
  ];

  // Available permissions
  availablePermissions = [
    { value: 'read', label: 'Read', description: 'View documents and data' },
    { value: 'write', label: 'Write', description: 'Create and update documents' },
    { value: 'delete', label: 'Delete', description: 'Delete documents' },
    { value: 'admin', label: 'Admin', description: 'Full access to all resources' }
  ];

  // Rate limits
  rateLimits = {
    perMinute: 60,
    perHour: 1000,
    perDay: 10000,
    perMonth: 100000
  };

  openCreateModal(): void {
    this.showCreateModal.set(true);
    this.newKeyName.set('');
    this.newKeyPermissions.set(['read']);
    this.newKeyExpiry.set(null);
    this.generatedKey.set(null);
  }

  closeCreateModal(): void {
    this.showCreateModal.set(false);
    this.generatedKey.set(null);
  }

  togglePermission(permission: string): void {
    const current = this.newKeyPermissions();
    if (current.includes(permission)) {
      this.newKeyPermissions.set(current.filter(p => p !== permission));
    } else {
      this.newKeyPermissions.set([...current, permission]);
    }
  }

  generateApiKey(): void {
    const name = this.newKeyName();
    if (!name.trim()) {
      alert('Please enter a key name');
      return;
    }

    // Generate a random API key
    const randomKey = 'uvd_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newKey: ApiKey = {
      id: String(this.apiKeys().length + 1),
      name: name,
      key: randomKey,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      expiresAt: this.newKeyExpiry() ? new Date(this.newKeyExpiry()!).toISOString() : null,
      status: 'active',
      permissions: this.newKeyPermissions(),
      usage: {
        totalCalls: 0,
        callsToday: 0,
        callsThisMonth: 0,
        lastCallAt: null
      }
    };

    this.apiKeys.update(keys => [newKey, ...keys]);
    this.generatedKey.set(randomKey);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('API key copied to clipboard!');
    });
  }

  openDeleteModal(key: ApiKey): void {
    this.selectedKey.set(key);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedKey.set(null);
  }

  confirmDelete(): void {
    const key = this.selectedKey();
    if (key) {
      this.apiKeys.update(keys =>
        keys.map(k => k.id === key.id ? { ...k, status: 'revoked' as const } : k)
      );
      this.closeDeleteModal();
    }
  }

  openDetailsModal(key: ApiKey): void {
    this.selectedKey.set(key);
    this.showDetailsModal.set(true);
  }

  closeDetailsModal(): void {
    this.showDetailsModal.set(false);
    this.selectedKey.set(null);
  }

  regenerateKey(key: ApiKey): void {
    if (confirm('Are you sure you want to regenerate this key? The old key will be immediately revoked.')) {
      const newRandomKey = 'uvd_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.apiKeys.update(keys =>
        keys.map(k => k.id === key.id ? { ...k, key: newRandomKey, createdAt: new Date().toISOString() } : k)
      );
      alert('Key regenerated successfully! New key: ' + newRandomKey);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'green';
      case 'revoked': return 'red';
      case 'expired': return 'yellow';
      default: return 'gray';
    }
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  getRelativeTime(dateString: string | null): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  getMaxUsage(stats: ApiKeyUsageStats[]): number {
    return Math.max(...stats.map(s => s.calls), 1);
  }

  getBarHeight(value: number, max: number): number {
    return (value / max) * 100;
  }
}

