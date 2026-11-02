export interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  ownerEmail: string;
  ownerName: string;
  ownerImage: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface IReview {
  _id: string;
  studioId: string;
  userEmail: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IStudioFormValues {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
  gallery: string;
  amenities: string[];
  overview: string;
}
