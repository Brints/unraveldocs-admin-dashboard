import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  documentProcessed: boolean;
  weeklyReport: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  pushNotifications: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
}

interface ApiSettings {
  webhookUrl: string;
  retryAttempts: number;
  timeout: number;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  // Active tab
  activeTab = signal<'profile' | 'notifications' | 'security' | 'api' | 'billing' | 'team'>('profile');

  // User Profile
  userProfile = signal<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    role: 'Administrator',
    avatar: 'JD'
  });

  // Notification Settings
  notificationSettings = signal<NotificationSettings>({
    emailNotifications: true,
    documentProcessed: true,
    weeklyReport: true,
    securityAlerts: true,
    marketingEmails: false,
    pushNotifications: true
  });

  // Security Settings
  securitySettings = signal<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 30,
    loginNotifications: true
  });

  // API Settings
  apiSettings = signal<ApiSettings>({
    webhookUrl: 'https://api.example.com/webhook',
    retryAttempts: 3,
    timeout: 30
  });

  // Billing Info
  billingInfo = {
    plan: 'Professional',
    price: '$99/month',
    nextBilling: '2024-12-30',
    paymentMethod: '•••• •••• •••• 4242',
    usage: {
      documents: 8934,
      limit: 10000,
      percentage: 89
    }
  };

  // Team Members
  teamMembers = [
    { name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', avatar: 'JD', status: 'active' },
    { name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Editor', avatar: 'JS', status: 'active' },
    { name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Viewer', avatar: 'MJ', status: 'active' },
    { name: 'Sarah Williams', email: 'sarah.w@company.com', role: 'Editor', avatar: 'SW', status: 'invited' }
  ];

  // Recent activity
  recentActivity = [
    { action: 'Changed password', timestamp: '2 hours ago' },
    { action: 'Updated profile information', timestamp: '1 day ago' },
    { action: 'Enabled two-factor authentication', timestamp: '3 days ago' },
    { action: 'Added new team member', timestamp: '5 days ago' }
  ];

  changeTab(tab: 'profile' | 'notifications' | 'security' | 'api' | 'billing' | 'team'): void {
    this.activeTab.set(tab);
  }

  updateProfile(): void {
    console.log('Updating profile:', this.userProfile());
    alert('Profile updated successfully!');
  }

  updateNotifications(): void {
    console.log('Updating notifications:', this.notificationSettings());
    alert('Notification settings updated!');
  }

  updateSecurity(): void {
    console.log('Updating security:', this.securitySettings());
    alert('Security settings updated!');
  }

  updateApiSettings(): void {
    console.log('Updating API settings:', this.apiSettings());
    alert('API settings updated!');
  }

  changePassword(): void {
    alert('Password change functionality would open a modal here');
  }

  enable2FA(): void {
    this.securitySettings.update(s => ({ ...s, twoFactorAuth: !s.twoFactorAuth }));
    alert('Two-factor authentication ' + (this.securitySettings().twoFactorAuth ? 'enabled' : 'disabled'));
  }

  inviteTeamMember(): void {
    alert('Invite team member modal would open here');
  }

  removeTeamMember(member: any): void {
    if (confirm(`Remove ${member.name} from the team?`)) {
      console.log('Removing team member:', member);
    }
  }

  uploadAvatar(): void {
    alert('Avatar upload functionality would open here');
  }

  cancelSubscription(): void {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      alert('Subscription cancellation process would start here');
    }
  }

  upgradeSubscription(): void {
    alert('Upgrade subscription modal would open here');
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process would start here');
    }
  }

  exportData(): void {
    alert('Data export would start here');
  }
}

