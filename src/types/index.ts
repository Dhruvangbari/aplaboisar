export type Language = 'en' | 'mr' | 'hi';

export type UserRole = 'USER' | 'BUSINESS_OWNER' | 'ADMIN' | 'MODERATOR';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  points: number;
  savedItemIds: string[];
}

export type TrustBadge = 'listed' | 'verified' | 'trusted';
export type SubscriptionTier = 'free' | 'premium' | 'gold';

export interface BusinessItem {
  id: string;
  slug: string;
  name: string;
  marathiName?: string;
  tagline: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  reviewsAvailable?: boolean;
  distance: string;
  address: string;
  landmark?: string;
  area: string;
  pinCode?: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  openingHours: string;
  isOpen: boolean;
  trustBadge: TrustBadge;
  subscriptionTier: SubscriptionTier;
  coverImage: string;
  logo: string;
  gallery: string[];
  about: string;
  services: { name: string; price?: string; desc?: string }[];
  priceRange: '₹' | '₹₹' | '₹₹₹';
  isFeatured: boolean;
  isTrending: boolean;
  trendingScore: number;
  offersCount: number;
  viewsCount?: number;
  callsCount?: number;
  enquiriesCount?: number;
  // Verification & Provenance (Strict Real-Data Architecture)
  source?: string;
  sourceUrl?: string;
  verifiedAt?: string;
  verificationStatus?: 'listed' | 'verified' | 'trusted';
  verifiedBy?: string;
  isClaimed?: boolean;
  claimedBy?: string;
  isDemo?: boolean;
  unverifiedFields?: string[];
  lastConfirmedAt?: string;
}

export interface BusinessClaimRequest {
  id: string;
  businessId: string;
  businessName: string;
  claimantName: string;
  claimantPhone: string;
  claimantEmail: string;
  relationship: 'Owner' | 'Partner' | 'Manager' | 'Authorized Representative';
  proofType: 'GSTIN Certificate' | 'Shop Act / Gumasta' | 'Electricity Bill' | 'Business Card' | 'Phone OTP';
  documentNumber?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  notes?: string;
}

export interface PaymentOrder {
  id: string;
  orderId: string;
  amount: number;
  currency: 'INR';
  productType: 'SUBSCRIPTION' | 'ADVERTISEMENT' | 'REEL_PROMOTION' | 'EVENT_TICKET';
  productName: string;
  planId?: string;
  businessId?: string;
  userId: string;
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  paymentId?: string;
  signature?: string;
  isTestMode: boolean;
  invoiceNumber?: string;
  createdAt: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    businessName?: string;
    gstin?: string;
    address?: string;
  };
}

export interface IconicPlace {
  id: string;
  title: string;
  marathiTitle?: string;
  location: string;
  distance: string;
  description: string;
  coverImage: string;
  gallery: string[];
  tags: string[];
  status: 'Published' | 'Draft';
  order: number;
  coordinates: string;
}

export interface OfferItem {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  title: string;
  discountText: string;
  originalPrice?: number;
  discountedPrice?: number;
  validUntil: string;
  code: string;
  terms: string;
  claimedCount: number;
  category: string;
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  location: string;
  shift: string;
  experience: string;
  qualification: string;
  jobType: 'Full Time' | 'Part Time' | 'Urgent Hiring' | 'Apprenticeship' | 'ITI Jobs' | 'Fresher Jobs';
  postedDate: string;
  phone: string;
  whatsapp: string;
  urgent: boolean;
  tags: string[];
  description: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  price: string;
  location: string;
  area: string;
  bedrooms: string;
  propertyType: 'Flats' | 'Plots' | 'Shops' | 'Commercial' | 'Residential' | 'PG/Hostel';
  transactionType: 'Buy' | 'Rent' | 'Sell';
  verified: boolean;
  images: string[];
  phone: string;
  whatsapp: string;
  postedDate: string;
  furnished?: string;
  parking?: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  startingPrice: string;
  availability: string;
  phone: string;
  whatsapp: string;
  distance: string;
  image: string;
  verified: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  coverImage: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  ticketPrice: string;
  seatsLeft: number;
  category: string;
  description: string;
}

export interface LocalPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  category: string;
  isLiked?: boolean;
  comments?: { id: string; author: string; text: string; timeAgo: string }[];
}

export interface TransportOption {
  id: string;
  type: 'Auto Stand' | 'Local Taxi' | 'Shared Cab' | 'Driver for Hire' | 'School Van' | 'Mumbai Express Shuttle';
  name: string;
  route: string;
  contact: string;
  vehicleNumber?: string;
  availableTime: string;
  fareEstimate: string;
  rating: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  category: 'Ambulance' | 'Hospitals' | 'Police' | 'Fire Brigade' | 'Blood Requirements' | 'Disaster Management';
  phone: string;
  secondaryPhone?: string;
  address: string;
  available24x7: boolean;
}

export interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  itemCategory: 'Mobile' | 'Wallet' | 'Documents' | 'Keys' | 'Pets' | 'Bags' | 'Other';
  location: string;
  date: string;
  description: string;
  image?: string;
  contactName: string;
  contactPhone: string;
  status: 'open' | 'resolved';
}

export interface RewardItem {
  id: string;
  title: string;
  businessName: string;
  pointsCost: number;
  discountValue: string;
  couponCode: string;
  validDays: number;
  category: string;
}

export interface ReviewItem {
  id: string;
  businessId: string;
  authorName: string;
  rating: number;
  date: string;
  content: string;
  verifiedCustomer: boolean;
  ownerReply?: string;
}

export interface BusinessLead {
  id: string;
  customerName: string;
  phone: string;
  serviceRequested: string;
  message: string;
  timestamp: string;
  priority: 'High' | 'Medium' | 'Low';
  aiReason: string;
  status: 'New' | 'Contacted' | 'Closed';
}
