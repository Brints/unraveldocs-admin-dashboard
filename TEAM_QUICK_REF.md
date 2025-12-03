# Team Management Component - Quick Reference

## 📊 Quick Stats
- ✅ **10 Sample Team Members** included
- 🎯 **4 Role Types**: Admin, Manager, Member, Viewer
- 🔍 **Real-time Search** across names, emails, and departments
- 📊 **4 Sort Options**: Name, Role, Documents, Joined Date
- 👁️ **2 View Modes**: Grid and List
- ✔️ **Bulk Actions**: Export and Remove multiple members

## Key Features at a Glance

### Team Statistics
```
Total: 10  |  Active: 7  |  Inactive: 1  |  Pending: 1
```

### Role Distribution
```
🟣 Admin: 1    🔵 Manager: 2    🟢 Member: 5    ⚪ Viewer: 2
```

### Available Actions by Status

| Action | Icon | Color | Status |
|--------|------|-------|--------|
| View | 👁️ | Indigo | All |
| Edit | ✏️ | Blue | All |
| Resend Invite | 📧 | Green | Pending only |
| Activate | ✅ | Green | Inactive only |
| Deactivate | ❌ | Yellow | Active only |
| Remove | 🗑️ | Red | All |

## View Modes

### 🎴 Grid View (Default)
- Beautiful card layout
- Gradient header with animation
- Color-coded avatars by role
- Status badge on card
- Member statistics
- Quick actions at bottom
- Responsive: 1-4 columns

### 📋 List View
- Comprehensive table
- All member details visible
- Sortable columns
- Checkbox selection
- Action buttons per row
- Horizontal scroll on mobile

## Filters & Search

### Search Bar
- Real-time filtering
- Searches: name, email, department
- Instant results

### Role Filters
```
[All] [Admin] [Manager] [Member] [Viewer]
```
- Click to filter by role
- Color-coded buttons
- Visual highlight when active

### Status Filter
```
Status: [All ▼]
Options: All, Active, Inactive, Pending
```

### Sort Dropdown
```
Sort: [Name ▼]
Options: Name, Role, Documents, Joined
```

## Bulk Operations

### When Members Selected:
```
[N member(s) selected]
[Export Selected] [Remove Selected] [Clear Selection]
```

- Select all: Header checkbox
- Select individual: Row/card checkbox
- Bulk export
- Bulk remove (with confirmation)

## Sample Data Overview

### By Role
- **Admin** (1): Full system access
- **Manager** (2): Team + analytics management
- **Member** (5): Document processing
- **Viewer** (2): View-only access

### By Status
- **Active**: 7 members (70%)
- **Inactive**: 1 member (10%)
- **Pending**: 1 member (10%)

### By Department
- Engineering: 4 members
- Operations: 3 members
- Customer Success: 1 member
- Finance: 1 member
- Marketing: 1 member

### Performance Stats
- **Total Documents**: 5,090 processed
- **Average Accuracy**: 97.3%
- **Top Performer**: John Doe (1,250 docs, 98.5%)

## Component Structure

### State Management (Signals)
```typescript
searchQuery: string           // ""
filterRole: string           // "all"
filterStatus: string         // "all"
sortBy: string              // "name"
selectedMembers: number[]   // []
viewMode: string            // "grid"
showAddModal: boolean       // false
showEditModal: boolean      // false
```

### Key Methods
```typescript
// Filtering & Sorting
filteredMembers              // Computed property
setRoleFilter(role)          // Set role filter
setStatusFilter(status)      // Set status filter
setSortBy(sortBy)           // Set sort order

// Selection
toggleMemberSelection(id)    // Toggle single
selectAllMembers()          // Select all
deselectAllMembers()        // Clear all
isMemberSelected(id)        // Check if selected

// Actions
viewMember(id)              // View details
editMember(id)              // Edit member
deleteMember(id)            // Remove (confirm)
resendInvite(id)            // Resend invite
activateMember(id)          // Activate member
deactivateMember(id)        // Deactivate member
deleteSelectedMembers()     // Remove bulk
exportTeamData()            // Export data
toggleViewMode()            // Switch view
```

## Color Coding

### Role Colors
- 🟣 **Admin**: Purple (`bg-purple-500`)
- 🔵 **Manager**: Blue (`bg-blue-500`)
- 🟢 **Member**: Green (`bg-green-500`)
- ⚪ **Viewer**: Gray (`bg-gray-500`)

### Status Colors
- 🟢 **Active**: Green (`bg-green-100 text-green-800`)
- ⚪ **Inactive**: Gray (`bg-gray-100 text-gray-800`)
- 🟡 **Pending**: Yellow (`bg-yellow-100 text-yellow-800`)

### Action Colors
- 🔵 **View**: Indigo (`text-indigo-600 hover:bg-indigo-50`)
- 🔵 **Edit**: Blue (`text-blue-600 hover:bg-blue-50`)
- 🟢 **Invite/Activate**: Green (`text-green-600 hover:bg-green-50`)
- 🟡 **Deactivate**: Yellow (`text-yellow-600 hover:bg-yellow-50`)
- 🔴 **Remove**: Red (`text-red-600 hover:bg-red-50`)

## Responsive Breakpoints

### Grid Layout
```
Mobile (< 640px):      1 column
Tablet (640-1024px):   2 columns
Laptop (1024-1280px):  3 columns
Desktop (> 1280px):    4 columns
```

### Table Layout
```
Mobile:  Horizontal scroll (min-width: 800px)
Tablet:  All columns visible
Desktop: Full width with padding
```

## Permissions Reference

### Admin (Full Access)
```
✅ All permissions
✅ Manage team
✅ View all analytics
✅ Process documents
✅ Manage settings
```

### Manager (Team Management)
```
✅ Manage team
✅ View analytics
✅ Process documents
❌ System settings
```

### Member (Processing)
```
✅ Process documents
✅ View own analytics
❌ Manage team
❌ View all analytics
```

### Viewer (Read-only)
```
✅ View analytics
❌ Process documents
❌ Manage team
❌ Edit settings
```

## Common Tasks

### Filter by Role
1. Click role button (Admin, Manager, Member, Viewer)
2. Members filter instantly
3. Statistics update automatically

### Search Members
1. Type in search box
2. Results filter in real-time
3. Works across name, email, department

### Select Multiple Members
1. Check individual boxes OR
2. Click header checkbox for all
3. Bulk actions bar appears
4. Choose Export or Remove

### Change View
1. Click grid/list icon (top right)
2. View switches instantly
3. Preserves filters and selection

### Activate/Deactivate Member
1. Find member in list/grid
2. Click activate/deactivate icon
3. Status updates immediately

### Resend Invitation
1. Filter by "Pending" status
2. Click mail icon on member
3. Invitation email sent

## Member Card Breakdown (Grid View)

```
┌─────────────────────────────────┐
│ ☑️              [Status Badge]   │ ← Header (gradient)
│                                  │
│     [Avatar]                     │ ← Color-coded by role
│                                  │
│  Name                            │
│  email@example.com               │
│  [Role Badge]                    │
│                                  │
│  Department: Engineering         │
│  Documents: 1,250                │
│  Accuracy: 98.5%                 │
│  Last Active: 2 mins ago         │
│                                  │
│  👁️  ✏️  📧  ❌  🗑️              │ ← Actions
└─────────────────────────────────┘
```

## Table Columns (List View)

```
☑️ | Member | Role | Dept | Status | Docs | Acc | Last | Joined | Actions
```

1. **Checkbox**: Selection
2. **Member**: Avatar + Name + Email
3. **Role**: Color-coded badge
4. **Department**: Department name
5. **Status**: Active/Inactive/Pending
6. **Documents**: Count processed
7. **Accuracy**: Percentage
8. **Last Active**: Relative time
9. **Joined**: Join date
10. **Actions**: View, Edit, etc.

## Next Steps for Full Implementation

### Modals to Add
1. **Add Member Modal**
   - Name, Email fields
   - Role selection
   - Department selection
   - Permissions checkboxes
   - Send invitation button

2. **Edit Member Modal**
   - Pre-filled form
   - Update role
   - Update permissions
   - Save changes button

3. **Member Detail Modal**
   - Full profile view
   - Activity history
   - Document statistics
   - Permission list

### Backend Integration
1. Create API endpoints for team
2. Replace mock data with API calls
3. Implement actual email invitations
4. Add real-time status updates
5. Connect remove to database
6. Implement export feature
7. Add activity logging

### Enhanced Features
1. Department management
2. Bulk role change
3. Activity timeline
4. Performance charts
5. Team analytics
6. Document assignment
7. Role templates

## Testing Checklist

- [x] Search filters correctly
- [x] Role filters work
- [x] Status filters work
- [x] Sort options work
- [x] Select all works
- [x] Individual selection works
- [x] Bulk remove confirms
- [x] View mode switches
- [x] Actions show correct icons
- [x] Empty state displays
- [x] Responsive on mobile
- [x] Responsive on tablet
- [x] Responsive on desktop
- [x] Avatars color-coded
- [x] Badges display correctly

## Known Limitations (Mock Data)

- Members are static (no real backend)
- Add member doesn't persist
- Removes are temporary
- No actual email sending
- No member detail modal
- No edit modal
- All data client-side
- No activity history

## Performance Tips

1. **Virtual Scrolling**: For 100+ members (future)
2. **Pagination**: Load 20 members at a time (future)
3. **Search Debounce**: Add 300ms delay (future)
4. **Lazy Load Avatars**: Load on scroll (future)

Ready for modal implementation and backend integration! 🚀

---

**Quick Navigation:**
- Click "Team" in sidebar to view
- Use filters to narrow down
- Switch views with toggle
- Select members for bulk actions
- Click actions for individual operations

