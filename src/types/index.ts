export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Inactive' | 'Lost to Follow-up';
  artStartDate: string;
  viralLoad: number;
  lastVisit: string;
  facilityId: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  patientCount: number;
  staffCount: number;
  type: 'Public' | 'Private' | 'NGO';
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}