import type { Train, Bus, Airport, Hotel, Shop } from "@/lib/types";

export const trainsData: Train[] = [
  {
    id: "palace-on-wheels",
    name: "Palace on Wheels",
    number: "POW-101",
    type: "Luxury Tourist Heritage Train",
    route: {
      from: "New Delhi (Safdarjung)",
      to: "New Delhi (Circuit)",
      via: ["Jaipur", "Sawai Madhopur (Ranthambore)", "Chittorgarh", "Udaipur", "Jaisalmer", "Jodhpur", "Bharatpur", "Agra"],
    },
    duration: "7 Nights / 8 Days",
    frequency: "Every Wednesday (September to April)",
    classes: [
      { name: "Super Deluxe Cabin", price: 825000, amenities: ["Private Butler (Khidmatgar)", "Ensuite Shower", "Air Conditioning", "WiFi", "Fine Dining Included"] },
      { name: "Deluxe Single/Twin", price: 545000, amenities: ["Ensuite Bathroom", "Royal Rajput Silk Upholstery", "Bar & Spa Access"] },
    ],
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    scenicScore: 9.8,
    bookingUrl: "https://www.palaceonwheelsindia.org",
  },
  {
    id: "darjeeling-toy-train",
    name: "UNESCO Darjeeling Himalayan Railway (DHR)",
    number: "52541 / DHR Steam",
    type: "Scenic Heritage Mountain Narrow Gauge",
    route: {
      from: "New Jalpaiguri (NJP) / Siliguri",
      to: "Darjeeling",
      via: ["Sukna", "Kurseong", "Tung", "Sonada", "Ghum (Highest Station in India, 2,258m)", "Batasia Loop"],
    },
    duration: "7 Hours (Full Route) / 2 Hours (Joy Ride)",
    frequency: "Daily Scheduled & Joy Rides",
    classes: [
      { name: "First Class Steam Joy Ride", price: 1500, amenities: ["Historic Steam Engine", "Large Window Panes", "Batasia Loop Photo Stop", "Ghum Museum Entry"] },
      { name: "First Class Diesel", price: 1000, amenities: ["Scenic Valley Views", "Heritage Wooden Coach Interiors"] },
    ],
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    scenicScore: 9.9,
    bookingUrl: "https://www.irctc.co.in",
  },
  {
    id: "vande-bharat-varanasi",
    name: "New Delhi – Varanasi Vande Bharat Express",
    number: "22436 / 22435",
    type: "Semi-High Speed Express (160 km/h)",
    route: {
      from: "New Delhi (NDLS)",
      to: "Varanasi Junction (BSB)",
      via: ["Kanpur Central", "Prayagraj Junction"],
    },
    duration: "8 Hours",
    frequency: "6 Days a Week (Except Thursdays)",
    classes: [
      { name: "Executive Class (EC)", price: 3350, amenities: ["180° Rotating Seats", "Gourmet Hot Meals Included", "Panoramic Windows", "Bio-Vacuum Toilets"] },
      { name: "Chair Car (CC)", price: 1750, amenities: ["Ergonomic Reclining Seats", "Catering Included", "Charging Ports"] },
    ],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    scenicScore: 8.5,
    bookingUrl: "https://www.irctc.co.in",
  },
];

export const busesData: Bus[] = [
  {
    id: "ksrtc-flybus-mysuru",
    operator: "KSRTC Flybus",
    type: "Volvo Multi-Axle AC Sleeper",
    route: "Kempegowda Int'l Airport (BLR) to Mysuru",
    duration: "3h 45m",
    price: 850,
    amenities: ["GPS Tracking", "Bottled Water", "Chemical Toilet Onboard", "USB Charging"],
  },
  {
    id: "rsrtc-super-luxury-jaipur",
    operator: "RSRTC Royal Express",
    type: "Scania AC Semi-Sleeper",
    route: "New Delhi (ISBT Kashmiri Gate) to Jaipur (Sindhi Camp)",
    duration: "5h 15m",
    price: 750,
    amenities: ["Air Conditioning", "WiFi", "Blankets", "Reclining Seats"],
  },
];

export const airportsData: Airport[] = [
  {
    id: "del",
    code: "DEL",
    name: "Indira Gandhi International Airport",
    city: "New Delhi",
    terminalInfo: "Terminal 3 handles all international arrivals and premier full-service domestic flights with Airport Express Metro link.",
    connections: ["Jaipur (55m)", "Varanasi (1h 20m)", "Leh (1h 15m)", "Kochi (3h 10m)"],
  },
  {
    id: "cok",
    code: "COK",
    name: "Cochin International Airport (World's 1st Fully Solar Airport)",
    city: "Kochi, Kerala",
    terminalInfo: "Terminal 3 features traditional Kerala wooden architectural motifs and direct taxi desks to Alleppey (1.5 hrs).",
    connections: ["Delhi (3h 10m)", "Mumbai (1h 55m)", "Bengaluru (1h 05m)", "Dubai (4h 10m)"],
  },
  {
    id: "ixl",
    code: "IXL",
    name: "Kushok Bakula Rimpochee Airport",
    city: "Leh, Ladakh",
    terminalInfo: "One of the highest commercial airports in the world (3,256m). Spectacular morning mountain landing.",
    connections: ["Delhi (1h 15m)", "Srinagar (50m)", "Jammu (1h 00m)"],
  },
];

export const hotelsData: Hotel[] = [
  {
    id: "taj-lake-palace",
    name: "Taj Lake Palace",
    destinationSlug: "udaipur",
    category: "Heritage Luxury",
    pricePerNight: "₹48,000 – ₹1,25,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "An 18th-century floating white marble palace set in the middle of Lake Pichola, accessible only by private royal wooden boats.",
  },
  {
    id: "brijrama-palace",
    name: "BrijRama Palace Heritage",
    destinationSlug: "varanasi",
    category: "Heritage",
    pricePerNight: "₹22,000 – ₹55,000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    description: "One of the oldest palaces on Darbhanga Ghat, accessed by boat with private bajra river views and evening classical flute recitals.",
  },
];

export const shopsData: Shop[] = [
  {
    id: "gem-palace-jaipur",
    name: "The Gem Palace",
    destinationSlug: "jaipur",
    specialty: "Historical Kundan and diamond royal jewelry since 1852",
    address: "MI Road, Jaipur, Rajasthan",
  },
  {
    id: "metha-silk-varanasi",
    name: "Metha Handloom Silk Weaving House",
    destinationSlug: "varanasi",
    specialty: "Certified authentic GI-tagged Katan and Kadwa Banarasi silk sarees",
    address: "Chowk, Varanasi, Uttar Pradesh",
  },
];

