# Dashboard Quick Reference Card

## 🚀 Quick Start
```bash
pnpm start
# Login at /auth/login
# Redirects to /dashboard
```

---

## 📊 Dashboard Sections

1. **Sidebar** - Navigation (9 items)
2. **Header** - Search, Upload, Notifications
3. **Stats** - 4 metric cards
4. **Chart** - Processing activity
5. **Activity** - Recent actions
6. **Table** - Recent documents
7. **Stats Bar** - 4 gradient cards

---

## 🎨 Key Features

### Sidebar:
- Toggle: Click hamburger icon
- Width: 256px (expanded) / 80px (collapsed)
- Items: Dashboard, Documents, Upload, Queue, Analytics, API, Team, Settings, Help

### Stats Cards (4):
- Total Documents: 12,458
- Processed Today: 2,847
- In Queue: 342
- Failed: 23

### Recent Documents:
- Shows: Last 5 documents
- Columns: Name, Status, Pages, Accuracy, Size, Date, Actions
- Status Colors: Green (completed), Blue (processing), Red (failed)

### Quick Stats:
- Avg Accuracy: 98.4%
- Total Pages: 45,678
- Active Users: 234
- API Calls: 12,456

---

## 🎯 Common Tasks

### Toggle Sidebar:
```typescript
toggleSidebar()  // In header hamburger button
```

### Logout:
```typescript
logout()  // In header logout button
```

### Get Status Color:
```typescript
getStatusColor('completed')  // Returns 'green'
```

---

## 🔧 Customization

### Change Stat Values:
```typescript
// In dashboard.component.ts
stats = [
  {
    title: 'Your Title',
    value: 'Your Value',
    change: '+X%',
    trend: 'up',
    icon: 'icon-name',
    color: 'color'
  }
]
```

### Add Navigation Item:
```html
<!-- In sidebar nav -->
<a href="#" class="flex items-center px-3 py-2.5...">
  <svg><!-- icon --></svg>
  <span>New Item</span>
</a>
```

---

## 📱 Responsive

- **Desktop**: Full layout (4 columns)
- **Tablet**: 2 columns, sidebar overlay
- **Mobile**: 1 column, hidden sidebar

---

## 🎨 Colors

- **Blue**: Primary actions
- **Green**: Success/completed
- **Yellow**: Warning/pending
- **Red**: Error/failed
- **Gray**: Neutral/background

---

## ✨ Animations

- Sidebar: 300ms slide
- Cards: Hover lift
- Table: Row highlight
- Progress: Fill animation
- Badge: Pulse effect

---

## 📁 File Locations

```
dashboard.component.ts   - Logic (162 lines)
dashboard.component.html - Template (393 lines)
dashboard.component.css  - Styles (251 lines)
DASHBOARD_DOCS.md        - Full docs
```

---

## 🔌 Integration Points

Replace mock data:
1. Stats → API call
2. Documents → API call
3. Activity → API call
4. Chart → Add Chart.js

---

## ✅ Checklist

- ✅ Sidebar with 9 menu items
- ✅ Search bar in header
- ✅ Upload button
- ✅ 4 stats cards
- ✅ Processing chart placeholder
- ✅ Activity feed (4 items)
- ✅ Documents table (5 items)
- ✅ Quick stats bar (4 cards)
- ✅ User profile
- ✅ Logout button
- ✅ Responsive design
- ✅ Animations

---

**Dashboard Ready! 🎉**

