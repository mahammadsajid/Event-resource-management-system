
export enum EventStatus {
  Pending_HOD = 'Pending_HOD',
  Pending_Dean = 'Pending_Dean',
  Pending_Head = 'Pending_Head',
  Approved = 'Approved',
  Running = 'Running',
  Completed = 'Completed',
  Rejected = 'Rejected'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Coordinator' | 'HOD' | 'Dean' | 'Administrator';
  department?: string;
  avatar?: string;
}

export interface Venue {
  id: number;
  name: string;
  type: 'Auditorium' | 'Classroom' | 'Laboratory' | 'Outdoor' | 'Conference';
  capacity: number;
  is_available: boolean;
  maintenance_status?: 'Clean' | 'Maintenance Required' | 'Out of Service';
}

export interface Resource {
  id: number;
  name: string;
  category: 'ITC' | 'Food' | 'Equipment';
  total_qty: number;
  available_qty: number;
}

export interface Event {
  id: number;
  title: string;
  coord_id: string;
  venue_id: number;
  start_time: string;
  end_time: string;
  status: EventStatus;
  description?: string;
  attendees_count: number;
  requested_resources: number[]; 
  department: string;
}

export interface DashboardStats {
  totalEvents: number;
  pendingApprovals: number;
  activeVenues: number;
  criticalResources: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
}
