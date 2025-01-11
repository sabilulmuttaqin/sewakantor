export interface City {
  id: number;
  name: string;
  slug: string;
  photo: string;
  officeSpace_count: number;
  officeSpace: Office[];
}

export interface Office {
  id: number;
  price: number;
  duration: number;
  name: string;
  about: string;
  slug: string;
  city: City;
  address: string;
  thumbnail: string;
  photos: Photo[];
  benefits: Benefit[];
}

interface Photo {
  id: number;
  photo: string;
}
export interface Benefit {
  id: number;
  name: string;
}
export interface BookingDetails {
  id: number;
  name: string;
  phone_number: string;
  booking_trx_id: string;
  is_paid: boolean;
  duration: number;
  total_amount: number;
  started_at: string;
  ended_at: string;
  office: Office;
}
