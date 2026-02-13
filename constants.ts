
import { Venue, Resource, Event, EventStatus } from './types.ts';

export const INITIAL_VENUES: Venue[] = [
  { id: 1, name: 'Main Auditorium', type: 'Auditorium', capacity: 500, is_available: true, maintenance_status: 'Clean' },
  { id: 2, name: 'Faculty Conference Hall', type: 'Conference', capacity: 100, is_available: true, maintenance_status: 'Clean' },
  { id: 3, name: 'Advanced Robotics Lab', type: 'Laboratory', capacity: 40, is_available: true, maintenance_status: 'Clean' },
  { id: 4, name: 'Executive Boardroom', type: 'Conference', capacity: 15, is_available: false, maintenance_status: 'Maintenance Required' },
  { id: 5, name: 'Central Quadrangle', type: 'Outdoor', capacity: 1000, is_available: true, maintenance_status: 'Clean' },
];

export const INITIAL_RESOURCES: Resource[] = [
  { id: 1, name: '4K Projector', category: 'ITC', total_qty: 10, available_qty: 7 },
  { id: 2, name: 'MacBook Pro Laptops', category: 'ITC', total_qty: 50, available_qty: 45 },
  { id: 3, name: 'Premium Catering Set', category: 'Food', total_qty: 5, available_qty: 5 },
  { id: 4, name: 'Ergonomic Chairs', category: 'Equipment', total_qty: 300, available_qty: 150 },
  { id: 5, name: 'PA System (Large)', category: 'Equipment', total_qty: 4, available_qty: 2 },
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Global Tech Summit 2024',
    coord_id: '101',
    venue_id: 1,
    start_time: '2024-11-15T09:00',
    end_time: '2024-11-15T18:00',
    status: EventStatus.Approved,
    attendees_count: 450,
    requested_resources: [1, 5, 4],
    department: 'Computer Science',
    description: 'Flagship annual technology symposium featuring industry leaders.'
  },
  {
    id: 2,
    title: 'Inter-College Debate Finals',
    coord_id: '102',
    venue_id: 2,
    start_time: '2024-11-16T14:00',
    end_time: '2024-11-16T17:00',
    status: EventStatus.Pending_HOD,
    attendees_count: 85,
    requested_resources: [1, 5],
    department: 'Humanities',
    description: 'Final round of the regional debating championship.'
  },
  {
    id: 3,
    title: 'Alumni Gala Dinner',
    coord_id: '103',
    venue_id: 5,
    start_time: '2024-11-20T19:00',
    end_time: '2024-11-20T22:00',
    status: EventStatus.Pending_Dean,
    attendees_count: 300,
    requested_resources: [3, 4, 5],
    department: 'Alumni Relations',
    description: 'A formal evening to celebrate university achievements with our alumni.'
  }
];
