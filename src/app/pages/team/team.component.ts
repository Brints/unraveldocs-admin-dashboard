import { Component, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member' | 'Viewer';
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinedDate: string;
  lastActive: string;
  documentsProcessed: number;
  accuracy: number;
  permissions: string[];
  phone?: string;
  location?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  // State management
  searchQuery = signal('');
  filterRole = signal<'all' | 'Admin' | 'Manager' | 'Member' | 'Viewer'>('all');
  filterStatus = signal<'all' | 'active' | 'inactive' | 'pending'>('all');
  sortBy = signal<'name' | 'role' | 'documents' | 'joined'>('name');
  selectedMembers = signal<number[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');
  showAddModal = signal(false);
  showEditModal = signal(false);
  selectedMember = signal<TeamMember | null>(null);

  // Team members data
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@unraveldocs.com',
      role: 'Admin',
      avatar: 'JD',
      status: 'active',
      department: 'Engineering',
      joinedDate: '2023-01-15',
      lastActive: '2 mins ago',
      documentsProcessed: 1250,
      accuracy: 98.5,
      permissions: ['all'],
      phone: '+1 (555) 123-4567',
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@unraveldocs.com',
      role: 'Manager',
      avatar: 'JS',
      status: 'active',
      department: 'Operations',
      joinedDate: '2023-03-20',
      lastActive: '15 mins ago',
      documentsProcessed: 980,
      accuracy: 97.8,
      permissions: ['manage_team', 'view_analytics', 'process_documents'],
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, USA'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@unraveldocs.com',
      role: 'Member',
      avatar: 'MJ',
      status: 'active',
      department: 'Engineering',
      joinedDate: '2023-05-10',
      lastActive: '1 hour ago',
      documentsProcessed: 750,
      accuracy: 96.2,
      permissions: ['process_documents', 'view_own_analytics'],
      phone: '+1 (555) 345-6789',
      location: 'Austin, USA'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@unraveldocs.com',
      role: 'Manager',
      avatar: 'SW',
      status: 'active',
      department: 'Customer Success',
      joinedDate: '2023-02-28',
      lastActive: '30 mins ago',
      documentsProcessed: 1100,
      accuracy: 98.1,
      permissions: ['manage_team', 'view_analytics', 'process_documents'],
      phone: '+1 (555) 456-7890',
      location: 'Seattle, USA'
    },
    {
      id: 5,
      name: 'David Chen',
      email: 'david.chen@unraveldocs.com',
      role: 'Member',
      avatar: 'DC',
      status: 'active',
      department: 'Engineering',
      joinedDate: '2023-06-15',
      lastActive: '3 hours ago',
      documentsProcessed: 620,
      accuracy: 95.8,
      permissions: ['process_documents', 'view_own_analytics'],
      phone: '+1 (555) 567-8901',
      location: 'Boston, USA'
    },
    {
      id: 6,
      name: 'Emily Brown',
      email: 'emily.brown@unraveldocs.com',
      role: 'Member',
      avatar: 'EB',
      status: 'active',
      department: 'Operations',
      joinedDate: '2023-07-01',
      lastActive: '2 hours ago',
      documentsProcessed: 890,
      accuracy: 97.3,
      permissions: ['process_documents', 'view_own_analytics'],
      phone: '+1 (555) 678-9012',
      location: 'Chicago, USA'
    },
    {
      id: 7,
      name: 'Robert Taylor',
      email: 'robert.taylor@unraveldocs.com',
      role: 'Viewer',
      avatar: 'RT',
      status: 'active',
      department: 'Finance',
      joinedDate: '2023-08-10',
      lastActive: '1 day ago',
      documentsProcessed: 0,
      accuracy: 0,
      permissions: ['view_analytics'],
      phone: '+1 (555) 789-0123',
      location: 'Miami, USA'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@unraveldocs.com',
      role: 'Member',
      avatar: 'LA',
      status: 'inactive',
      department: 'Engineering',
      joinedDate: '2023-04-05',
      lastActive: '2 weeks ago',
      documentsProcessed: 450,
      accuracy: 94.5,
      permissions: ['process_documents', 'view_own_analytics'],
      phone: '+1 (555) 890-1234',
      location: 'Portland, USA'
    },
    {
      id: 9,
      name: 'Kevin Martinez',
      email: 'kevin.martinez@unraveldocs.com',
      role: 'Member',
      avatar: 'KM',
      status: 'pending',
      department: 'Operations',
      joinedDate: '2024-11-28',
      lastActive: 'Never',
      documentsProcessed: 0,
      accuracy: 0,
      permissions: ['process_documents'],
      phone: '+1 (555) 901-2345',
      location: 'Denver, USA'
    },
    {
      id: 10,
      name: 'Amanda Wilson',
      email: 'amanda.wilson@unraveldocs.com',
      role: 'Viewer',
      avatar: 'AW',
      status: 'active',
      department: 'Marketing',
      joinedDate: '2023-09-20',
      lastActive: '5 hours ago',
      documentsProcessed: 0,
      accuracy: 0,
      permissions: ['view_analytics'],
      phone: '+1 (555) 012-3456',
      location: 'Los Angeles, USA'
    }
  ];

  // Computed properties
  get filteredMembers(): TeamMember[] {
    let filtered = [...this.teamMembers];

    // Apply role filter
    if (this.filterRole() !== 'all') {
      filtered = filtered.filter(member => member.role === this.filterRole());
    }

    // Apply status filter
    if (this.filterStatus() !== 'all') {
      filtered = filtered.filter(member => member.status === this.filterStatus());
    }

    // Apply search filter
    const query = this.searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sortBy = this.sortBy();
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'documents':
          return b.documentsProcessed - a.documentsProcessed;
        case 'joined':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }

  get activeMembers(): number {
    return this.teamMembers.filter(m => m.status === 'active').length;
  }

  get inactiveMembers(): number {
    return this.teamMembers.filter(m => m.status === 'inactive').length;
  }

  get pendingMembers(): number {
    return this.teamMembers.filter(m => m.status === 'pending').length;
  }

  get adminCount(): number {
    return this.teamMembers.filter(m => m.role === 'Admin').length;
  }

  get managerCount(): number {
    return this.teamMembers.filter(m => m.role === 'Manager').length;
  }

  get memberCount(): number {
    return this.teamMembers.filter(m => m.role === 'Member').length;
  }

  get viewerCount(): number {
    return this.teamMembers.filter(m => m.role === 'Viewer').length;
  }

  get selectedCount(): number {
    return this.selectedMembers().length;
  }

  // Filter and sort methods
  setRoleFilter(role: 'all' | 'Admin' | 'Manager' | 'Member' | 'Viewer'): void {
    this.filterRole.set(role);
  }

  setStatusFilter(status: 'all' | 'active' | 'inactive' | 'pending'): void {
    this.filterStatus.set(status);
  }

  setSortBy(sortBy: 'name' | 'role' | 'documents' | 'joined'): void {
    this.sortBy.set(sortBy);
  }

  // Selection methods
  toggleMemberSelection(id: number): void {
    const selected = this.selectedMembers();
    if (selected.includes(id)) {
      this.selectedMembers.set(selected.filter(memberId => memberId !== id));
    } else {
      this.selectedMembers.set([...selected, id]);
    }
  }

  selectAllMembers(): void {
    const allIds = this.filteredMembers.map(member => member.id);
    this.selectedMembers.set(allIds);
  }

  deselectAllMembers(): void {
    this.selectedMembers.set([]);
  }

  isMemberSelected(id: number): boolean {
    return this.selectedMembers().includes(id);
  }

  // Action methods
  viewMember(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    if (member) {
      this.selectedMember.set(member);
      this.showEditModal.set(true);
    }
  }

  editMember(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    if (member) {
      this.selectedMember.set(member);
      this.showEditModal.set(true);
    }
  }

  deleteMember(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    if (member && confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      const index = this.teamMembers.findIndex(m => m.id === id);
      if (index > -1) {
        this.teamMembers.splice(index, 1);
      }
    }
  }

  resendInvite(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    console.log('Resending invite to:', member?.email);
    // TODO: Implement API call
  }

  deactivateMember(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    if (member && confirm(`Are you sure you want to deactivate ${member.name}?`)) {
      member.status = 'inactive';
    }
  }

  activateMember(id: number): void {
    const member = this.teamMembers.find(m => m.id === id);
    if (member) {
      member.status = 'active';
    }
  }

  deleteSelectedMembers(): void {
    if (confirm(`Are you sure you want to remove ${this.selectedCount} member(s)?`)) {
      const selectedIds = this.selectedMembers();
      this.teamMembers = this.teamMembers.filter(m => !selectedIds.includes(m.id));
      this.deselectAllMembers();
    }
  }

  exportTeamData(): void {
    console.log('Exporting team data...');
    // TODO: Implement export functionality
  }

  // Modal methods
  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedMember.set(null);
  }

  toggleViewMode(): void {
    this.viewMode.update(mode => mode === 'grid' ? 'list' : 'grid');
  }

  // Helper methods
  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      Admin: 'purple',
      Manager: 'blue',
      Member: 'green',
      Viewer: 'gray'
    };
    return colors[role] || 'gray';
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'green',
      inactive: 'gray',
      pending: 'yellow'
    };
    return colors[status] || 'gray';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}

