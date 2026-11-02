export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  studioCategory: string;
  hostEmail: string;
  hostName: string;
  userEmail: string;
  userName: string;
  userImage: string;
  date: string;
  startTime: string;
  endTime: string;
  note: string;
  hours: number;
  hourlyRate: number;
  securityDeposit: number;
  subtotal: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface IDashboardStats {
  listings: number;
  myBookings: number;
  saved: number;
  pendingRequests: number;
  confirmedSessions: number;
  earnings: number;
}
