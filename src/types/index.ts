export enum UserRole {
  ADMIN = 1,
  DIREKSI = 2,
}

export interface User {
  avatar: string;
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

export interface VehicleData {
  radio_id: string;
  vehicle_number: string;
  vehicle_name: string;
  status: string;
  type: string; // 'car', 'ambulance', etc.
  radio_time: string;
  lat: string;
  lon: string;
  speed: number;
  updated: string;
  created_at: string;
  tgl: string;
  gps: {
    mileage: number;
    fuel: number;
  };
}
