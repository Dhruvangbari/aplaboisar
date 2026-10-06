import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserProfile,
  BusinessItem,
  IconicPlace,
  OfferItem,
  JobItem,
  PropertyItem,
  ServiceItem,
  EventItem,
  LocalPost,
  TransportOption,
  EmergencyContact,
  LostFoundItem,
  RewardItem,
  BusinessLead
} from '../types';
import {
  businessesData,
  iconicPlacesData,
  offersData,
  jobsData,
  propertiesData,
  servicesData,
  eventsData,
  localPostsData,
  transportData,
  emergencyContactsData,
  lostFoundData,
  rewardsData,
  businessLeadsMock
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  businesses: BusinessItem[];
  setBusinesses: React.Dispatch<React.SetStateAction<BusinessItem[]>>;
  iconicPlaces: IconicPlace[];
  setIconicPlaces: React.Dispatch<React.SetStateAction<IconicPlace[]>>;
  offers: OfferItem[];
  jobs: JobItem[];
  properties: PropertyItem[];
  services: ServiceItem[];
  events: EventItem[];
  localPosts: LocalPost[];
  transportOptions: TransportOption[];
  emergencyContacts: EmergencyContact[];
  lostFoundList: LostFoundItem[];
  rewardsList: RewardItem[];
  leads: BusinessLead[];
  savedItemIds: string[];
  toggleFavourite: (id: string) => void;
  claimOffer: (offerId: string) => void;
  redeemReward: (rewardId: string) => boolean;
  likePost: (postId: string) => void;
  addPostComment: (postId: string, text: string) => void;
  addNewPost: (content: string, image?: string) => void;
  addLostFound: (item: Omit<LostFoundItem, 'id' | 'status'>) => void;
  updateBusinessBadge: (businessId: string, badge: 'listed' | 'verified' | 'trusted') => void;
  updateIconicPlace: (place: IconicPlace) => void;
  addIconicPlace: (place: Omit<IconicPlace, 'id'>) => void;
  deleteIconicPlace: (id: string) => void;
  isProfileDrawerOpen: boolean;
  setIsProfileDrawerOpen: (open: boolean) => void;
  isAskAiOpen: boolean;
  setIsAskAiOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const defaultUser: UserProfile = {
  id: 'user-atharva',
  name: 'Atharva Naik',
  phone: '+91 98765 43210',
  email: 'atharva.naik@gmail.com',
  role: 'BUSINESS_OWNER',
  points: 480,
  savedItemIds: ['biz-1', 'biz-2', 'job-1', 'prop-1']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Default Marathi as per "आपलं Boisar" focus
  const [selectedLocation, setSelectedLocation] = useState<string>('Boisar');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('aplaboisar_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [businesses, setBusinesses] = useState<BusinessItem[]>(() => {
    const saved = localStorage.getItem('aplaboisar_biz');
    return saved ? JSON.parse(saved) : businessesData;
  });

  const [iconicPlaces, setIconicPlaces] = useState<IconicPlace[]>(() => {
    const saved = localStorage.getItem('aplaboisar_places');
    return saved ? JSON.parse(saved) : iconicPlacesData;
  });

  const [offers, setOffers] = useState<OfferItem[]>(offersData);
  const [jobs] = useState<JobItem[]>(jobsData);
  const [properties] = useState<PropertyItem[]>(propertiesData);
  const [services] = useState<ServiceItem[]>(servicesData);
  const [events] = useState<EventItem[]>(eventsData);
  const [localPosts, setLocalPosts] = useState<LocalPost[]>(localPostsData);
  const [transportOptions] = useState<TransportOption[]>(transportData);
  const [emergencyContacts] = useState<EmergencyContact[]>(emergencyContactsData);
  const [lostFoundList, setLostFoundList] = useState<LostFoundItem[]>(lostFoundData);
  const [rewardsList] = useState<RewardItem[]>(rewardsData);
  const [leads, setLeads] = useState<BusinessLead[]>(businessLeadsMock);

  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => currentUser.savedItemIds || []);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('aplaboisar_user', JSON.stringify({ ...currentUser, savedItemIds }));
  }, [currentUser, savedItemIds]);

  useEffect(() => {
    localStorage.setItem('aplaboisar_places', JSON.stringify(iconicPlaces));
  }, [iconicPlaces]);

  useEffect(() => {
    localStorage.setItem('aplaboisar_biz', JSON.stringify(businesses));
  }, [businesses]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const hideToast = () => setToast(null);

  const toggleFavourite = (id: string) => {
    setSavedItemIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      showToast(exists ? 'Removed from saved items' : 'Saved to favourites ❤️', exists ? 'info' : 'success');
      return updated;
    });
  };

  const claimOffer = (offerId: string) => {
    setOffers(prev =>
      prev.map(off => (off.id === offerId ? { ...off, claimedCount: off.claimedCount + 1 } : off))
    );
    setCurrentUser(prev => ({ ...prev, points: prev.points + 25 }));
    showToast('Offer claimed successfully! +25 AaplaBoisar Reward Points added! 🎉', 'success');
  };

  const redeemReward = (rewardId: string): boolean => {
    const reward = rewardsList.find(r => r.id === rewardId);
    if (!reward) return false;

    if (currentUser.points < reward.pointsCost) {
      showToast(`Not enough points! You need ${reward.pointsCost} points.`, 'error');
      return false;
    }

    setCurrentUser(prev => ({ ...prev, points: prev.points - reward.pointsCost }));
    showToast(`Coupons redeemed! Code: ${reward.couponCode} copied to clipboard!`, 'success');
    return true;
  };

  const likePost = (postId: string) => {
    setLocalPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const addPostComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setLocalPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: currentUser.name,
            text,
            timeAgo: 'Just now'
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
    showToast('Comment posted on Boisar Today!', 'success');
  };

  const addNewPost = (content: string, image?: string) => {
    const newP: LocalPost = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      authorBadge: 'Local Resident',
      timeAgo: 'Just now',
      content,
      image,
      likes: 1,
      commentsCount: 0,
      shares: 0,
      category: 'Community Update',
      isLiked: true
    };
    setLocalPosts(prev => [newP, ...prev]);
    showToast('Post shared with Boisar community!', 'success');
  };

  const addLostFound = (item: Omit<LostFoundItem, 'id' | 'status'>) => {
    const newItem: LostFoundItem = {
      ...item,
      id: `lf-${Date.now()}`,
      status: 'open'
    };
    setLostFoundList(prev => [newItem, ...prev]);
    showToast('Item posted on Lost & Found board!', 'success');
  };

  const updateBusinessBadge = (businessId: string, badge: 'listed' | 'verified' | 'trusted') => {
    setBusinesses(prev =>
      prev.map(b => (b.id === businessId ? { ...b, trustBadge: badge } : b))
    );
    showToast(`Business verification updated to: ${badge.toUpperCase()}`, 'success');
  };

  const updateIconicPlace = (place: IconicPlace) => {
    setIconicPlaces(prev => prev.map(p => (p.id === place.id ? place : p)));
    showToast(`Updated "${place.title}" successfully!`, 'success');
  };

  const addIconicPlace = (place: Omit<IconicPlace, 'id'>) => {
    const newPlace: IconicPlace = {
      ...place,
      id: `place-${Date.now()}`
    };
    setIconicPlaces(prev => [...prev, newPlace]);
    showToast(`Added new Iconic Place: "${place.title}"!`, 'success');
  };

  const deleteIconicPlace = (id: string) => {
    setIconicPlaces(prev => prev.filter(p => p.id !== id));
    showToast('Iconic place removed', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        selectedLocation,
        setSelectedLocation,
        currentUser,
        setCurrentUser,
        businesses,
        setBusinesses,
        iconicPlaces,
        setIconicPlaces,
        offers,
        jobs,
        properties,
        services,
        events,
        localPosts,
        transportOptions,
        emergencyContacts,
        lostFoundList,
        rewardsList,
        leads,
        savedItemIds,
        toggleFavourite,
        claimOffer,
        redeemReward,
        likePost,
        addPostComment,
        addNewPost,
        addLostFound,
        updateBusinessBadge,
        updateIconicPlace,
        addIconicPlace,
        deleteIconicPlace,
        isProfileDrawerOpen,
        setIsProfileDrawerOpen,
        isAskAiOpen,
        setIsAskAiOpen,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
