# System Analytics Documentation

## Overview
A comprehensive system analytics section has been added to the Admin Dashboard, providing real-time monitoring of system health, performance, resources, and security metrics.

## Features Implemented

### 1. System Health Cards (Top Row)
Four primary health indicators displayed prominently:

#### System Uptime
- **Display**: Shows uptime in days, hours, and minutes format
- **Metrics**: 
  - Total uptime: 45d 12h 34m
  - Uptime percentage: 99.98%
- **Visual**: Green status indicator with checkmark icon
- **Color Coding**: Green for healthy uptime

#### Server Health
- **Display**: Current server status
- **Metrics**:
  - Status: Healthy/Warning/Critical
  - Response time: 45ms
  - Error rate: 0.02%
- **Visual**: Dynamic color-coded icon based on health status
- **Color Coding**: 
  - Green: Healthy
  - Yellow: Warning
  - Red: Critical

#### CPU Usage
- **Display**: Current CPU utilization
- **Metrics**:
  - Usage percentage: 42%
  - Number of cores: 8
  - Temperature: 65°C
- **Visual**: CPU chip icon with dynamic color
- **Color Coding**:
  - Green: < 60%
  - Yellow: 60-79%
  - Red: ≥ 80%

#### Memory Usage
- **Display**: RAM consumption
- **Metrics**:
  - Used: 12.4 GB
  - Total: 32 GB
  - Percentage: 38.75%
- **Visual**: Memory icon with dynamic color
- **Color Coding**: Same as CPU

### 2. Resource Usage Details
Comprehensive breakdown of system resources:

#### CPU Monitoring
- Real-time usage percentage
- Visual progress bar
- Temperature monitoring
- Core count information

#### Memory Tracking
- Used vs. total memory display
- Percentage-based progress bar
- GB-level precision

#### Storage Information
- Used: 450 GB
- Total: 1000 GB
- Visual representation of usage
- Easy-to-read progress indicator

#### Network Activity
- **Inbound Traffic**: 125.5 MB/s
- **Outbound Traffic**: 89.3 MB/s
- Dual progress bars for upload/download
- Real-time bandwidth monitoring

### 3. Services Status
Monitors critical system services:

Each service displays:
- Service name
- Running status (running/degraded/stopped/starting)
- Uptime percentage
- Port number
- Color-coded status indicator

**Tracked Services**:
1. API Server (Port 3000) - 99.99% uptime
2. Database (Port 5432) - 99.97% uptime
3. Redis Cache (Port 6379) - 99.95% uptime
4. OCR Engine (Port 8080) - 99.89% uptime
5. File Storage (Port 9000) - 99.99% uptime
6. Queue Worker (Port 4000) - 98.45% uptime (degraded)

**Status Colors**:
- 🟢 Green: Running normally
- 🟡 Yellow: Degraded performance
- 🔴 Red: Stopped/Critical
- 🔵 Blue: Starting up

### 4. Performance Metrics
Real-time performance indicators:

#### Requests Per Minute
- Current: 1,250 requests/min
- Helps monitor load and traffic
- Blue-themed card

#### Average Response Time
- Current: 125ms
- Critical for user experience monitoring
- Green-themed card

#### Active Connections
- Current: 342 connections
- Shows current user load
- Purple-themed card

#### Queued Jobs
- Current: 28 jobs
- Monitors background task queue
- Yellow-themed card

### 5. Security Overview
Critical security metrics at a glance:

#### Failed Login Attempts
- Count: 12 attempts
- Red alert icon
- Helps identify potential security threats

#### Blocked IP Addresses
- Count: 5 IPs
- Orange warning icon
- Shows active security measures

#### Active Tokens
- Count: 456 active sessions
- Green key icon
- Monitor current user sessions

#### Last Security Scan
- Time: 2 hours ago
- Blue shield icon
- Ensures regular security checks

## Technical Implementation

### Data Structure
```typescript
systemAnalytics = {
  uptime: { days, hours, minutes, percentage },
  serverHealth: { status, responseTime, errorRate },
  resources: {
    cpu: { usage, cores, temperature },
    memory: { used, total, percentage },
    storage: { used, total, percentage },
    network: { inbound, outbound }
  },
  services: [{ name, status, uptime, port }],
  performance: { requestsPerMinute, avgResponseTime, activeConnections, queuedJobs },
  security: { failedLoginAttempts, blockedIPs, activeTokens, lastSecurityScan }
}
```

### Helper Methods
- `formatUptime()`: Formats uptime into readable string
- `getServiceStatusColor(status)`: Returns color based on service status
- `getResourceColor(percentage)`: Returns color based on resource usage
- `getHealthStatusColor(status)`: Returns color based on health status

### Visual Design
- **Card-based layout**: Clean, modern design with shadow effects
- **Color coding**: Intuitive status indicators
- **Progress bars**: Visual representation of resource usage
- **Responsive grid**: Adapts to different screen sizes
- **Icons**: Professional SVG icons for each metric
- **Hover effects**: Enhanced user interaction

## Grid Layout
- **Top Row**: 4 columns (System health cards)
- **Middle Row**: 2 columns (Resources | Services)
- **Bottom Row**: 2 columns (Performance | Security)

## Future Enhancements
1. **Real-time Updates**: Connect to actual backend APIs
2. **Historical Data**: Show trends and graphs over time
3. **Alerts**: Configurable thresholds for notifications
4. **Export**: Download system reports
5. **Live Graphs**: Add time-series charts for metrics
6. **Customization**: Allow users to choose which metrics to display
7. **Auto-refresh**: Periodic updates without page reload
8. **Detailed Logs**: Click-through to detailed system logs

## Usage
The System Analytics section appears automatically on the main dashboard page, below the Quick Stats Bar. It provides administrators with a comprehensive view of system health at a glance.

## Responsive Design
- **Desktop**: Full 4-column layout for health cards, 2-column for detailed sections
- **Tablet**: 2-column layout adapts to medium screens
- **Mobile**: Single column stacks all cards vertically

## Performance Considerations
- Currently uses mock data for demonstration
- Designed to be easily connected to real-time APIs
- Efficient rendering with Angular signals
- Minimal re-renders for optimal performance

