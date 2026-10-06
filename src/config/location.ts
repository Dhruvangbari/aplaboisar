// ==============================================================
// AaplaBoisar — Official Location Configuration
// Primary Location: Boisar, Palghar District, Maharashtra, India
// Primary PIN Code: 401501 (India Post confirmed. Do NOT use 401051)
// Tarapur PIN Code: 401502
// ==============================================================

export interface BoisarArea {
  id: string;
  name: string;
  marathiName: string;
  pinCode: string;
  type: 'residential' | 'commercial' | 'industrial' | 'coastal' | 'rural';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const OFFICIAL_LOCATION = {
  city: 'Boisar',
  district: 'Palghar',
  state: 'Maharashtra',
  country: 'India',
  primaryPinCode: '401501',
  tarapurPinCode: '401502',
  centerCoordinates: {
    lat: 19.8028,
    lng: 72.7554
  },
  railwayStation: {
    name: 'Boisar Railway Station (BOR)',
    code: 'BOR',
    zone: 'Western Railway',
    coordinates: { lat: 19.8028, lng: 72.7554 }
  }
} as const;

export const BOISAR_SEARCHABLE_AREAS: BoisarArea[] = [
  {
    id: 'boisar-west',
    name: 'Boisar West',
    marathiName: 'बोईसर पश्चिम',
    pinCode: '401501',
    type: 'commercial',
    coordinates: { lat: 19.8025, lng: 72.7535 }
  },
  {
    id: 'boisar-east',
    name: 'Boisar East',
    marathiName: 'बोईसर पूर्व',
    pinCode: '401501',
    type: 'residential',
    coordinates: { lat: 19.8032, lng: 72.7580 }
  },
  {
    id: 'betegaon',
    name: 'Betegaon',
    marathiName: 'बेटेगाव',
    pinCode: '401501',
    type: 'residential',
    coordinates: { lat: 19.7950, lng: 72.7640 }
  },
  {
    id: 'saravali',
    name: 'Saravali',
    marathiName: 'सरावली',
    pinCode: '401501',
    type: 'industrial',
    coordinates: { lat: 19.8180, lng: 72.7480 }
  },
  {
    id: 'khaira',
    name: 'Khaira',
    marathiName: 'खैरा',
    pinCode: '401501',
    type: 'residential',
    coordinates: { lat: 19.8090, lng: 72.7450 }
  },
  {
    id: 'navapur',
    name: 'Navapur',
    marathiName: 'नवापूर',
    pinCode: '401501',
    type: 'coastal',
    coordinates: { lat: 19.7890, lng: 72.7150 }
  },
  {
    id: 'sainath-nagar',
    name: 'Sainath Nagar',
    marathiName: 'साईनाथ नगर',
    pinCode: '401501',
    type: 'residential',
    coordinates: { lat: 19.8060, lng: 72.7560 }
  },
  {
    id: 'chitralaya',
    name: 'Chitralaya',
    marathiName: 'चित्रालाया',
    pinCode: '401501',
    type: 'commercial',
    coordinates: { lat: 19.8040, lng: 72.7540 }
  },
  {
    id: 'shigaon',
    name: 'Shigaon',
    marathiName: 'शिगाव',
    pinCode: '401501',
    type: 'rural',
    coordinates: { lat: 19.7850, lng: 72.7820 }
  },
  {
    id: 'tarapur',
    name: 'Tarapur',
    marathiName: 'तारापूर',
    pinCode: '401502',
    type: 'coastal',
    coordinates: { lat: 19.8600, lng: 72.7000 }
  },
  {
    id: 'tarapur-midc',
    name: 'Tarapur MIDC',
    marathiName: 'तारापूर एमआयडीसी',
    pinCode: '401506',
    type: 'industrial',
    coordinates: { lat: 19.8150, lng: 72.7710 }
  },
  {
    id: 'umroli',
    name: 'Umroli',
    marathiName: 'उमरोळी',
    pinCode: '401501',
    type: 'residential',
    coordinates: { lat: 19.7560, lng: 72.7600 }
  },
  {
    id: 'nandgaon',
    name: 'Nandgaon',
    marathiName: 'नांदगाव',
    pinCode: '401501',
    type: 'coastal',
    coordinates: { lat: 19.7700, lng: 72.7200 }
  },
  {
    id: 'palghar',
    name: 'Palghar',
    marathiName: 'पालघर (जिल्हा मुख्यालय)',
    pinCode: '401404',
    type: 'commercial',
    coordinates: { lat: 19.6960, lng: 72.7650 }
  }
];
