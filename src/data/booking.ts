import type {
  FlightOption,
  TrainOption,
  BusOption,
  HotelProperty,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// 1. FLIGHTS DATASET
// ---------------------------------------------------------------------------
export const flightsData: FlightOption[] = [
  {
    id: "fl-6e-2041",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E-2041",
    fromCity: "New Delhi",
    fromCode: "DEL",
    toCity: "Hyderabad",
    toCode: "HYD",
    departureTime: "06:15 AM",
    arrivalTime: "08:35 AM",
    duration: "2h 20m",
    stops: 0,
    price: 4850,
    cabinClass: "Economy",
    aircraft: "Airbus A321neo",
    seatsAvailable: 14,
    baggage: "15 kg Check-in · 7 kg Cabin",
    isBestOption: true,
  },
  {
    id: "fl-uk-879",
    airline: "Vistara",
    airlineCode: "UK",
    flightNumber: "UK-879",
    fromCity: "New Delhi",
    fromCode: "DEL",
    toCity: "Hyderabad",
    toCode: "HYD",
    departureTime: "08:45 AM",
    arrivalTime: "11:05 AM",
    duration: "2h 20m",
    stops: 0,
    price: 6200,
    cabinClass: "Economy",
    aircraft: "Airbus A320neo",
    seatsAvailable: 6,
    baggage: "15 kg Check-in · 7 kg Cabin · Meal Included",
    isBestOption: false,
  },
  {
    id: "fl-ai-542",
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "AI-542",
    fromCity: "New Delhi",
    fromCode: "DEL",
    toCity: "Hyderabad",
    toCode: "HYD",
    departureTime: "02:30 PM",
    arrivalTime: "04:50 PM",
    duration: "2h 20m",
    stops: 0,
    price: 5400,
    cabinClass: "Economy",
    aircraft: "Boeing 787-8 Dreamliner",
    seatsAvailable: 22,
    baggage: "20 kg Check-in · 7 kg Cabin · Hot Meal",
    isBestOption: false,
  },
  {
    id: "fl-qp-1342",
    airline: "Akasa Air",
    airlineCode: "QP",
    flightNumber: "QP-1342",
    fromCity: "Bengaluru",
    fromCode: "BLR",
    toCity: "Varanasi",
    toCode: "VNS",
    departureTime: "07:10 AM",
    arrivalTime: "09:45 AM",
    duration: "2h 35m",
    stops: 0,
    price: 4990,
    cabinClass: "Economy",
    aircraft: "Boeing 737 MAX 8",
    seatsAvailable: 9,
    baggage: "15 kg Check-in · 7 kg Cabin",
    isBestOption: true,
  },
  {
    id: "fl-6e-5120",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E-5120",
    fromCity: "Mumbai",
    fromCode: "BOM",
    toCity: "Jaipur",
    toCode: "JAI",
    departureTime: "11:20 AM",
    arrivalTime: "01:10 PM",
    duration: "1h 50m",
    stops: 0,
    price: 4120,
    cabinClass: "Economy",
    aircraft: "Airbus A320neo",
    seatsAvailable: 18,
    baggage: "15 kg Check-in · 7 kg Cabin",
    isBestOption: true,
  },
];

// ---------------------------------------------------------------------------
// 2. TRAINS DATASET (Indian Railways / IRCTC)
// ---------------------------------------------------------------------------
export const bookingTrainsData: TrainOption[] = [
  {
    id: "tr-20833",
    trainNumber: "20833",
    trainName: "Vande Bharat Express",
    fromStation: "Secunderabad",
    fromStationCode: "SC",
    toStation: "Visakhapatnam",
    toStationCode: "VSKP",
    departureTime: "05:45 AM",
    arrivalTime: "02:15 PM",
    duration: "8h 30m",
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    classes: [
      { className: "CC", fare: 1720, availabilityStatus: "AVAILABLE", seatsAvailable: 54 },
      { className: "EC", fare: 3120, availabilityStatus: "AVAILABLE", seatsAvailable: 12 },
    ],
    isBestOption: true,
  },
  {
    id: "tr-12727",
    trainNumber: "12727",
    trainName: "Godavari Superfast Express",
    fromStation: "Hyderabad Deccan",
    fromStationCode: "HYB",
    toStation: "Visakhapatnam",
    toStationCode: "VSKP",
    departureTime: "05:15 PM",
    arrivalTime: "05:45 AM",
    duration: "12h 30m",
    runningDays: ["Daily"],
    classes: [
      { className: "1A", fare: 2890, availabilityStatus: "AVAILABLE", seatsAvailable: 4 },
      { className: "2A", fare: 1710, availabilityStatus: "AVAILABLE", seatsAvailable: 19 },
      { className: "3A", fare: 1205, availabilityStatus: "RAC", seatsAvailable: 8 },
      { className: "SL", fare: 455, availabilityStatus: "AVAILABLE", seatsAvailable: 110 },
    ],
    isBestOption: false,
  },
  {
    id: "tr-12002",
    trainNumber: "12002",
    trainName: "Shatabdi Express",
    fromStation: "New Delhi",
    fromStationCode: "NDLS",
    toStation: "Bhopal",
    toStationCode: "BPL",
    departureTime: "06:00 AM",
    arrivalTime: "02:40 PM",
    duration: "8h 40m",
    runningDays: ["Daily"],
    classes: [
      { className: "CC", fare: 1540, availabilityStatus: "AVAILABLE", seatsAvailable: 42 },
      { className: "EC", fare: 2650, availabilityStatus: "AVAILABLE", seatsAvailable: 8 },
    ],
    isBestOption: true,
  },
  {
    id: "tr-12952",
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani Express",
    fromStation: "New Delhi",
    fromStationCode: "NDLS",
    toStation: "Mumbai Central",
    toStationCode: "MMCT",
    departureTime: "04:55 PM",
    arrivalTime: "08:35 AM",
    duration: "15h 40m",
    runningDays: ["Daily"],
    classes: [
      { className: "1A", fare: 4850, availabilityStatus: "AVAILABLE", seatsAvailable: 6 },
      { className: "2A", fare: 2980, availabilityStatus: "AVAILABLE", seatsAvailable: 28 },
      { className: "3A", fare: 2150, availabilityStatus: "AVAILABLE", seatsAvailable: 65 },
    ],
    isBestOption: true,
  },
];

// ---------------------------------------------------------------------------
// 3. BUSES DATASET
// ---------------------------------------------------------------------------
export const busesData: BusOption[] = [
  {
    id: "bus-nuego-01",
    operator: "NueGo Electric Intercity",
    busType: "Electric AC Seater (2+2)",
    fromCity: "New Delhi",
    toCity: "Jaipur",
    departureTime: "06:30 AM",
    arrivalTime: "11:45 AM",
    duration: "5h 15m",
    rating: 4.8,
    reviewsCount: 1240,
    basePrice: 599,
    seatsAvailable: 24,
    amenities: ["100% Zero Emission", "USB Charging", "Live GPS", "Water Bottle", "CCTV"],
    boardingPoints: ["Kashmiri Gate (06:00 AM)", "Dhaula Kuan (06:30 AM)", "IFFCO Chowk Gurgaon (07:00 AM)"],
    droppingPoints: ["Sindhi Camp Jaipur (11:45 AM)", "Transport Nagar (12:05 PM)"],
    isBestOption: true,
    totalSeats: 40,
    seatLayout: [
      { id: "1A", number: "1A", row: 1, column: 1, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "1B", number: "1B", row: 1, column: 2, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "1C", number: "1C", row: 1, column: 3, isAvailable: false, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "1D", number: "1D", row: 1, column: 4, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "2A", number: "2A", row: 2, column: 1, isAvailable: true, isLadiesOnly: true, price: 599, type: "seater", deck: "lower" },
      { id: "2B", number: "2B", row: 2, column: 2, isAvailable: true, isLadiesOnly: true, price: 599, type: "seater", deck: "lower" },
      { id: "2C", number: "2C", row: 2, column: 3, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "2D", number: "2D", row: 2, column: 4, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "3A", number: "3A", row: 3, column: 1, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "3B", number: "3B", row: 3, column: 2, isAvailable: false, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "3C", number: "3C", row: 3, column: 3, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
      { id: "3D", number: "3D", row: 3, column: 4, isAvailable: true, isLadiesOnly: false, price: 599, type: "seater", deck: "lower" },
    ],
  },
  {
    id: "bus-intrcity-02",
    operator: "IntrCity SmartBus",
    busType: "AC Sleeper (2+1 Multi-Axle)",
    fromCity: "Hyderabad",
    toCity: "Bengaluru",
    departureTime: "09:30 PM",
    arrivalTime: "06:30 AM",
    duration: "9h 00m",
    rating: 4.7,
    reviewsCount: 2310,
    basePrice: 1199,
    seatsAvailable: 12,
    amenities: ["Smart Lounge Access", "Wi-Fi", "Clean Bedding", "Snack Kit", "SOS Button"],
    boardingPoints: ["Gachibowli (09:00 PM)", "Ameerpet (09:30 PM)", "Lakdikapul (10:00 PM)"],
    droppingPoints: ["Hebbal (05:45 AM)", "Majestic (06:30 AM)", "Electronic City (07:15 AM)"],
    isBestOption: true,
    totalSeats: 30,
    seatLayout: [
      { id: "L1", number: "L1", row: 1, column: 1, isAvailable: true, isLadiesOnly: false, price: 1199, type: "sleeper", deck: "lower" },
      { id: "L2", number: "L2", row: 1, column: 2, isAvailable: false, isLadiesOnly: false, price: 1199, type: "sleeper", deck: "lower" },
      { id: "L3", number: "L3", row: 1, column: 3, isAvailable: true, isLadiesOnly: false, price: 1199, type: "sleeper", deck: "lower" },
      { id: "U1", number: "U1", row: 1, column: 1, isAvailable: true, isLadiesOnly: false, price: 1299, type: "sleeper", deck: "upper" },
      { id: "U2", number: "U2", row: 1, column: 2, isAvailable: true, isLadiesOnly: true, price: 1299, type: "sleeper", deck: "upper" },
      { id: "U3", number: "U3", row: 1, column: 3, isAvailable: true, isLadiesOnly: false, price: 1299, type: "sleeper", deck: "upper" },
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. STAYS & HOTEL PROPERTIES DATASET
// ---------------------------------------------------------------------------
export const staysData: HotelProperty[] = [
  {
    id: "stay-taj-falaknuma",
    slug: "taj-falaknuma-palace-hyderabad",
    name: "Taj Falaknuma Palace",
    destinationSlug: "hyderabad",
    destinationName: "Hyderabad",
    state: "Telangana",
    location: "Engine Bowli, Falaknuma",
    address: "Engine Bowli, Falaknuma, Hyderabad, Telangana 500053",
    propertyType: "Heritage Palace",
    rating: 4.9,
    reviewsCount: 840,
    pricePerNight: 34500,
    featuredImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Perched 2,000 feet above Hyderabad, the 'Mirror of the Sky' former palace of the Nizam offers Venetian chandeliers, royal carriage arrivals, and opulent marble courtyards.",
    amenities: ["Horse Carriage Arrival", "Nizam's High Tea", "Spa by Jiva", "Infinity Pool", "Heritage Palace Walk", "Fine Dining Gol Bungalow"],
    breakfastIncluded: true,
    freeCancellation: true,
    distanceFromCenter: "5.2 km from Charminar",
    badge: "Royal Heritage",
    rooms: [
      {
        id: "rm-palace-room",
        name: "Luxury Palace Room (Garden View)",
        type: "Luxury Room",
        pricePerNight: 34500,
        maxGuests: 2,
        bedType: "King Bed",
        sizeSqFt: 550,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        amenities: ["Marble Bathroom", "Palace Garden View", "Butler Service", "Free Wi-Fi"],
        breakfastIncluded: true,
        freeCancellation: true,
      },
      {
        id: "rm-nizami-suite",
        name: "Grand Historical Suite (City View)",
        type: "Historical Suite",
        pricePerNight: 62000,
        maxGuests: 3,
        bedType: "Royal King Bed",
        sizeSqFt: 1100,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Balcony", "Antique Tapestries", "Personal Butler", "Jacuzzi"],
        breakfastIncluded: true,
        freeCancellation: true,
      },
    ],
  },
  {
    id: "stay-evolve-back-hampi",
    slug: "evolve-back-kamalapura-palace-hampi",
    name: "Evolve Back, Kamalapura Palace",
    destinationSlug: "hampi",
    destinationName: "Hampi",
    state: "Karnataka",
    location: "Kamalapura, Hampi",
    address: "Hallikere Village, Kamalapura, Hampi, Karnataka 583221",
    propertyType: "Luxury Resort",
    rating: 4.9,
    reviewsCount: 620,
    pricePerNight: 28000,
    featuredImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Inspired by 14th-century Vijayanagara palace architecture with majestic stone archways, water bodies, and private jacuzzi suites amidst boulder-strewn landscapes.",
    amenities: ["Vijayanagara Architecture", "Private Jacuzzi", "Ayurvedic Wellness", "Reading Lounge", "Infinity Pool"],
    breakfastIncluded: true,
    freeCancellation: true,
    distanceFromCenter: "4.0 km from Virupaksha Temple",
    badge: "Architectural Marvel",
    rooms: [
      {
        id: "rm-nivasa-suite",
        name: "Nivasa Luxury Suite with Private Jacuzzi",
        type: "Luxury Suite",
        pricePerNight: 28000,
        maxGuests: 2,
        bedType: "King Bed",
        sizeSqFt: 720,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Jacuzzi", "Stone Balcony", "Air Conditioning", "Bathrobe & Slippers"],
        breakfastIncluded: true,
        freeCancellation: true,
      },
    ],
  },
  {
    id: "stay-araku-tribal-homestay",
    slug: "araku-eco-coffee-homestay",
    name: "Araku Valley Eco Coffee Homestay",
    destinationSlug: "araku-valley",
    destinationName: "Araku Valley",
    state: "Andhra Pradesh",
    location: "Padmapuram Road, Araku",
    address: "Near Padmapuram Botanical Gardens, Araku, AP 531149",
    propertyType: "Eco Homestay",
    rating: 4.8,
    reviewsCount: 310,
    pricePerNight: 3200,
    featuredImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507038772120-7eee76f79d74?auto=format&fit=crop&w=800&q=80",
    ],
    description: "An authentic tribal coffee plantation retreat featuring mud-plastered cottages, morning farm tours, and wood-fired organic meals.",
    amenities: ["Organic Coffee Plantation", "Campfire & Dhimsa Dance", "Homecooked Tribal Meals", "Guided Trekking"],
    breakfastIncluded: true,
    freeCancellation: true,
    distanceFromCenter: "1.2 km from Araku Railway Station",
    badge: "Hidden Gem",
    rooms: [
      {
        id: "rm-eco-cottage",
        name: "Plantation View Mud Cottage",
        type: "Cottage",
        pricePerNight: 3200,
        maxGuests: 3,
        bedType: "Queen Bed + Extra Bed",
        sizeSqFt: 380,
        image: "https://images.unsplash.com/photo-1507038772120-7eee76f79d74?auto=format&fit=crop&w=800&q=80",
        amenities: ["Valley View Verandah", "Fresh Filter Coffee", "Attached Bath"],
        breakfastIncluded: true,
        freeCancellation: true,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper Search Functions
// ---------------------------------------------------------------------------
export function searchFlights(from: string, to: string): FlightOption[] {
  const f = from.toLowerCase().trim();
  const t = to.toLowerCase().trim();
  return flightsData.filter((flight) => {
    const matchFrom = !f || flight.fromCity.toLowerCase().includes(f) || (flight.fromCode || "").toLowerCase().includes(f);
    const matchTo = !t || flight.toCity.toLowerCase().includes(t) || (flight.toCode || "").toLowerCase().includes(t);
    return matchFrom && matchTo;
  });
}

export function searchTrains(from: string, to: string): TrainOption[] {
  const f = from.toLowerCase().trim();
  const t = to.toLowerCase().trim();
  return bookingTrainsData.filter((train) => {
    const matchFrom = !f || train.fromStation.toLowerCase().includes(f) || train.fromStationCode.toLowerCase().includes(f);
    const matchTo = !t || train.toStation.toLowerCase().includes(t) || train.toStationCode.toLowerCase().includes(t);
    return matchFrom && matchTo;
  });
}

export function searchBuses(from: string, to: string): BusOption[] {
  const f = from.toLowerCase().trim();
  const t = to.toLowerCase().trim();
  return busesData.filter((bus) => {
    const matchFrom = !f || bus.fromCity.toLowerCase().includes(f);
    const matchTo = !t || bus.toCity.toLowerCase().includes(t);
    return matchFrom && matchTo;
  });
}

export function searchHotels(destination: string): HotelProperty[] {
  const d = destination.toLowerCase().trim();
  return staysData.filter((hotel) => {
    return (
      !d ||
      hotel.destinationName.toLowerCase().includes(d) ||
      hotel.destinationSlug.toLowerCase().includes(d) ||
      hotel.location.toLowerCase().includes(d) ||
      hotel.state.toLowerCase().includes(d)
    );
  });
}

export function getHotelById(id: string): HotelProperty | undefined {
  return staysData.find((h) => h.id === id || h.slug === id);
}
