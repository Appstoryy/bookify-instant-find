
export interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'conference';
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  amenities: string[];
  capacity: number;
}

export interface BookingData {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: Date;
  checkOut?: Date;
  guests: number;
  additionalServices: AdditionalService[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface SearchFilters {
  type: string;
  location: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
  minPrice: number;
  maxPrice: number;
}
