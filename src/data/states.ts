import type { StateDetails } from "@/lib/types";

export const statesData: StateDetails[] = [
  // 1. Rajasthan
  {
    slug: "rajasthan",
    name: "Rajasthan",
    capital: "Jaipur",
    region: "West",
    description: "The Land of Kings (Rajputana), famous for monumental hilltop fortresses, ornate havelis, sweeping Thar desert dunes, and royal palace hospitality.",
    summary: "Royal forts, desert dunes, Rajput architecture, vibrant folk crafts, and world-famous hospitality.",
    culture: "Vibrant folk dances like Ghoomar and Kalbelia, traditional puppet theater (Kathputli), block printing, and miniature paintings.",
    cuisine: ["Dal Baati Churma", "Laal Maas", "Gatte ki Sabzi", "Pyaaz Kachori", "Ghevar", "Ker Sangri"],
    festivals: ["Pushkar Camel Fair", "Desert Festival Jaisalmer", "Teej", "Gangaur", "Jaipur Literature Festival"],
    transportHubs: {
      airport: "Jaipur International Airport (JAI), Udaipur (UDR), Jodhpur (JDH)",
      railway: "Jaipur Junction (JP), Jodhpur (JU), Kota Junction (KOTA)",
      highways: ["NH 48 (Delhi-Jaipur-Mumbai)", "NH 52", "NH 62"],
    },
    itineraries: [
      {
        title: "The Royal Rajputana Grand Heritage Trail",
        days: 7,
        route: ["Jaipur", "Pushkar", "Jodhpur", "Udaipur"],
        summary: "Experience pink sandstone palaces, sacred lake aartis, blue fort ramparts, and lake palace boat rides.",
      },
      {
        title: "Golden Sands Desert Odyssey",
        days: 5,
        route: ["Jodhpur", "Jaisalmer", "Thar Desert"],
        summary: "Marvel at Mehrangarh Fort, explore the living Golden Fort of Jaisalmer, and camp under Thar desert stars.",
      },
    ],
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 27.0238, lng: 74.2179 },
    destinationSlugs: ["jaipur", "udaipur", "jaisalmer", "jodhpur"],
  },

  // 2. Uttar Pradesh
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    region: "North",
    description: "The spiritual heartland of India along the sacred Ganges and Yamuna rivers, home to Varanasi, the Taj Mahal in Agra, and Awadhi royal culture.",
    summary: "Sacred river ghats of Varanasi, Mughal architectural wonders in Agra, and Nawabi culinary grandeur in Lucknow.",
    culture: "Kathak classical dance, Chikan hand embroidery, Banarasi silk brocades, and Hindustani classical music Gharanas.",
    cuisine: ["Galouti Kebab", "Lucknowi Dum Biryani", "Banarasi Paan", "Bedmi Puri & Aloo", "Makhan Malai", "Petha"],
    festivals: ["Dev Deepawali", "Kumbh Mela", "Lathmar Holi (Barsana)", "Ganga Mahotsav", "Taj Mahotsav"],
    transportHubs: {
      airport: "Lucknow Chaudhary Charan Singh (LKO), Varanasi Lal Bahadur Shastri (VNS), Jewar Noida (DXN)",
      railway: "Varanasi Junction (BSB), Lucknow Charbagh (LKO), Kanpur Central (CNB), Agra Cantt (AGC)",
      highways: ["Yamuna Expressway", "Purvanchal Expressway", "Agra-Lucknow Expressway"],
    },
    itineraries: [
      {
        title: "Sacred Ganges & Nawabi Heritage Circuit",
        days: 6,
        route: ["Agra", "Lucknow", "Ayodhya", "Varanasi"],
        summary: "Taj Mahal sunrise, Awadhi royal dining in Lucknow, and evening Ganga Aarti in Kashi.",
      },
    ],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.8467, lng: 80.9462 },
    destinationSlugs: ["varanasi", "agra", "lucknow", "ayodhya"],
  },

  // 3. Kerala
  {
    slug: "kerala",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    region: "South",
    description: "God's Own Country, famed for serene emerald backwaters, holistic Ayurvedic wellness sanctuaries, misty tea hills in Munnar, and pristine Arabian Sea beaches.",
    summary: "Emerald backwater houseboats, Ayurvedic healing retreats, Kathakali dance rituals, and spice plantations.",
    culture: "Kathakali and Mohiniyattam classical dances, Kalaripayattu martial arts, and colorful temple pageants like Thrissur Pooram.",
    cuisine: ["Kerala Sadya on Banana Leaf", "Appam with Stew", "Karimeen Pollichathu", "Malabar Parotta & Beef Fry", "Puttu and Kadala Curry"],
    festivals: ["Onam", "Thrissur Pooram", "Vishu", "Nehru Trophy Boat Race", "Theyyam"],
    transportHubs: {
      airport: "Cochin International Airport (COK), Trivandrum (TRV), Calicut (CCJ), Kannur (CNN)",
      railway: "Ernakulam Junction (ERS), Thiruvananthapuram Central (TVC), Kozhikode (CLT)",
      highways: ["NH 66 (Coastal Highway)", "NH 544", "NH 85"],
    },
    itineraries: [
      {
        title: "God's Own Country Classic Backwaters & Hills",
        days: 7,
        route: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
        summary: "Colonial Fort Kochi art cafes, rolling Munnar tea gardens, spice wildlife reserves, and private houseboat cruises.",
      },
    ],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 10.8505, lng: 76.2711 },
    destinationSlugs: ["alleppey", "munnar", "kochi", "varkala"],
  },

  // 4. Ladakh
  {
    slug: "ladakh",
    name: "Ladakh",
    capital: "Leh",
    region: "North",
    description: "The Land of High Mountain Passes, nestled between the Great Himalayas and Karakoram ranges with Tibetan Buddhist gompas, crystal salt lakes, and dramatic lunar landscapes.",
    summary: "High-altitude Himalayan desert, century-old cliffside monasteries, Pangong Tso, and motorcycling passes.",
    culture: "Tibetan Buddhist customs, masked Cham dances, Losar new year celebrations, and pashmina wool weaving.",
    cuisine: ["Thukpa Noodle Soup", "Steamed Momos", "Skyu Pasta Stew", "Butter Tea (Gur Gur Chai)", "Khambir Flatbread"],
    festivals: ["Hemis Festival", "Ladakh Festival", "Losar", "Dosmoche", "Sindhu Darshan"],
    transportHubs: {
      airport: "Kushok Bakula Rimpochee Airport (IXL) in Leh",
      railway: "Nearest railhead is Jammu Tawi (JAT) / Udhampur",
      highways: ["Manali-Leh Highway (NH 3)", "Srinagar-Leh Highway (NH 1)"],
    },
    itineraries: [
      {
        title: "High Mountain Passes & Monasteries Expedition",
        days: 8,
        route: ["Leh", "Sham Valley", "Nubra Valley", "Pangong Tso"],
        summary: "Thiksey and Hemis monasteries, Khardung La pass (5,359m), double-humped camel dunes in Hunder, and Pangong blue waters.",
      },
    ],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 34.1526, lng: 77.5771 },
    destinationSlugs: ["leh", "nubra-valley", "pangong-tso"],
  },

  // 5. Karnataka
  {
    slug: "karnataka",
    name: "Karnataka",
    capital: "Bengaluru",
    region: "South",
    description: "One State, Many Worlds: featuring the UNESCO boulder-strewn Vijayanagara ruins of Hampi, royal Mysore palace, aromatic Coorg coffee hills, and the technology hub Bengaluru.",
    summary: "Ancient temple architecture of Hampi & Badami, royal Mysore traditions, and Western Ghats coffee plantations.",
    culture: "Yakshagana folk dance-drama, Carnatic music, Mysore silk weaving, and sandalwood craftsmanship.",
    cuisine: ["Bisi Bele Bath", "Mysore Pak", "Mangalore Fish Curry", "Neer Dosa", "Pandi Curry (Coorg)", "Filter Coffee"],
    festivals: ["Mysore Dasara", "Hampi Utsav", "Kambala Buffalo Race", "Ugadi", "Karaga"],
    transportHubs: {
      airport: "Kempegowda International Airport Bengaluru (BLR), Mangaluru (IXE)",
      railway: "KSR Bengaluru (SBC), Mysuru Junction (MYS), Hubballi (UBL)",
      highways: ["NH 48", "NH 75", "NH 44"],
    },
    itineraries: [
      {
        title: "Southern Heritage & Coffee Hills Trail",
        days: 7,
        route: ["Bengaluru", "Mysuru", "Coorg", "Hampi"],
        summary: "Royal Mysore Palace illuminated, Coorg spice plantations, and the ancient stone chariots of Hampi.",
      },
    ],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.3173, lng: 75.7139 },
    destinationSlugs: ["hampi", "mysore", "coorg", "gokarna"],
  },

  // 6. Maharashtra
  {
    slug: "maharashtra",
    name: "Maharashtra",
    capital: "Mumbai",
    region: "West",
    description: "The powerhouse state spanning the Arabian Sea metropolis of Mumbai, ancient UNESCO cave temples of Ajanta & Ellora, and mist-laden Sahyadri Western Ghats.",
    summary: "Bustling Mumbai street food, UNESCO Ajanta Ellora rock-cut architecture, and Sahyadri mountain fortresses.",
    culture: "Lavani folk dance, Powada balladeering, Paithani silk sarees, and grand Ganesh Chaturthi pageants.",
    cuisine: ["Vada Pav", "Pav Bhaji", "Misal Pav", "Puran Poli", "Bombil Fry", "Kolhapuri Mutton Rassa"],
    festivals: ["Ganesh Chaturthi", "Gudi Padwa", "Ellora-Ajanta Festival", "Kala Ghoda Arts Festival"],
    transportHubs: {
      airport: "Chhatrapati Shivaji Maharaj Mumbai (BOM), Pune (PNQ), Nagpur (NAG)",
      railway: "CSMT Mumbai (CSMT), Pune Junction (PUNE), Nagpur (NGP)",
      highways: ["Mumbai-Pune Expressway", "Samruddhi Mahamarg", "NH 48"],
    },
    itineraries: [
      {
        title: "Deccan Caves & Coastal Metropolis",
        days: 6,
        route: ["Mumbai", "Aurangabad (Chhatrapati Sambhajinagar)", "Ajanta", "Ellora"],
        summary: "Mumbai colonial architecture & sea face, rock-cut Kailasa Temple, and Buddhist cave frescoes.",
      },
    ],
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 19.7515, lng: 75.7139 },
    destinationSlugs: ["mumbai", "ellora-ajanta", "lonavala"],
  },

  // 7. West Bengal
  {
    slug: "west-bengal",
    name: "West Bengal",
    capital: "Kolkata",
    region: "East",
    description: "The Cultural Capital of India, home to Nobel laureates, Victorian colonial architecture in Kolkata, UNESCO Darjeeling tea hills, and the mangrove tigers of the Sundarbans.",
    summary: "Durga Puja art installations, Darjeeling Himalayan views, Rabindranath Tagore heritage, and gourmet sweets.",
    culture: "Baul folk singing, Rabindra Sangeet, Jamdani handloom sarees, terracotta temple architecture, and cinema.",
    cuisine: ["Machher Jhol & Rice", "Kosha Mangsho", "Rosogolla", "Mishti Doi", "Shondesh", "Kolkata Biryani & Kathi Roll"],
    festivals: ["Durga Puja", "Poila Boishakh (Bengali New Year)", "Kolkata Book Fair", "Poush Mela (Santiniketan)"],
    transportHubs: {
      airport: "Netaji Subhash Chandra Bose Kolkata (CCU), Bagdogra (IXB)",
      railway: "Howrah Junction (HWH), Sealdah (SDAH), New Jalpaiguri (NJP)",
      highways: ["NH 19", "NH 12", "NH 27"],
    },
    itineraries: [
      {
        title: "City of Joy to Himalayan Tea Valleys",
        days: 7,
        route: ["Kolkata", "Sundarbans", "Darjeeling", "Kalimpong"],
        summary: "Kolkata colonial cafes & Howrah Bridge, tidal mangrove cruises, and historic toy train steam journeys.",
      },
    ],
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 22.9868, lng: 87.855 },
    destinationSlugs: ["kolkata", "darjeeling", "sundarbans"],
  },

  // 8. Tamil Nadu
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    capital: "Chennai",
    region: "South",
    description: "The Land of Grand Dravidian Temples, ancient Sangam Tamil literature, Bharatanatyam classical dance, and Nilgiri blue mountain toy trains.",
    summary: "Soaring temple gopurams of Madurai & Thanjavur, Chettinad heritage mansions, and Nilgiri tea hills.",
    culture: "Bharatanatyam, Carnatic classical concerts during Chennai Margazhi season, Kanchipuram silk weaving, and bronze casting.",
    cuisine: ["Chettinad Chicken", "Masala Dosa with Sambar", "Idli & Vada", "Filter Coffee", "Jigarthanda", "Pongal"],
    festivals: ["Pongal", "Madurai Meenakshi Chithirai", "Natyanjali Dance Festival (Chidambaram)", "Karthigai Deepam"],
    transportHubs: {
      airport: "Chennai International Airport (MAA), Madurai (IXM), Coimbatore (CJB), Tiruchirappalli (TRZ)",
      railway: "Chennai Central (MAS), Madurai Junction (MDU), Coimbatore (CBE)",
      highways: ["NH 44", "NH 48", "NH 32"],
    },
    itineraries: [
      {
        title: "Grand Dravidian Temple Trail",
        days: 7,
        route: ["Chennai", "Mahabalipuram", "Thanjavur", "Chettinad", "Madurai"],
        summary: "UNESCO shore temples, the Great Living Chola Temples, culinary Chettinad feast, and Meenakshi Amman Temple.",
      },
    ],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 11.1271, lng: 78.6569 },
    destinationSlugs: ["madurai", "thanjavur", "mahabalipuram", "ooty"],
  },

  // 9. Himachal Pradesh
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    capital: "Shimla / Dharamshala",
    region: "North",
    description: "The Land of the Gods (Devbhoomi), offering snow-capped Himalayan peaks, pine forests, apple orchards, and the Dalai Lama's residence in McLeod Ganj.",
    summary: "UNESCO Kalka-Shimla mountain rail, Tibetan monastic retreat in Dharamshala, and high adventure in Spiti.",
    culture: "Himachali Pahari folk dances (Nati), Kullu handwoven shawls, Kangra miniature art, and Tibetan Buddhist traditions.",
    cuisine: ["Himachali Dham (Festive Thali)", "Siddu with Ghee", "Chha Gosht", "Kullu Trout Fish", "Aktori"],
    festivals: ["Kullu Dussehra", "Mandi Shivratri", "Minjar Fair (Chamba)", "Losar (Spiti)"],
    transportHubs: {
      airport: "Gaggal Kangra Airport (DHM), Bhuntar Kullu (KUU), Shimla Jubbarhatti (SLV)",
      railway: "UNESCO Kalka-Shimla Toy Train, Pathankot Cantt (PTKC)",
      highways: ["NH 5", "NH 3", "NH 154"],
    },
    itineraries: [
      {
        title: "Pahadi Pines & Monasteries Circuit",
        days: 7,
        route: ["Shimla", "Kullu", "Manali", "Dharamshala"],
        summary: "British colonial Mall Road, Solang valley adventure sports, and Tibetan monasteries in McLeod Ganj.",
      },
    ],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 31.1048, lng: 77.1734 },
    destinationSlugs: ["shimla", "manali", "dharamshala", "spiti-valley"],
  },

  // 10. Goa
  {
    slug: "goa",
    name: "Goa",
    capital: "Panaji",
    region: "West",
    description: "Sun, sand, and Portuguese-colonial heritage along the golden Arabian Sea coast, famed for UNESCO churches, spice plantations, and vibrant nightlife.",
    summary: "Golden beaches, UNESCO Old Goa cathedrals, heritage Latin Quarter Fontainhas, and spicy Goan seafood.",
    culture: "Indo-Portuguese architecture, Fado music, Dekhni and Fugdi folk dances, and vibrant carnival parades.",
    cuisine: ["Goan Fish Curry & Rice", "Pork Vindaloo", "Bebinca (Multi-layered Cake)", "Prawn Balchão", "Feni (Cashew Liquor)"],
    festivals: ["Goa Carnival", "Shigmo", "Feast of St. Francis Xavier", "Sunburn Festival"],
    transportHubs: {
      airport: "Dabolim International Airport (GOI), Manohar International Airport Mopa (GOX)",
      railway: "Madgaon Junction (MAO), Thivim (THVM)",
      highways: ["NH 66", "NH 748"],
    },
    itineraries: [
      {
        title: "Susegad: Heritage & Coastline Expedition",
        days: 5,
        route: ["Panaji (Fontainhas)", "Old Goa", "Anjuna", "Palolem"],
        summary: "Latin Quarter walking tours, UNESCO basilicas, beach sunset shacks, and spice farm feasts.",
      },
    ],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.2993, lng: 74.124 },
    destinationSlugs: ["goa", "panaji", "palolem"],
  },
];

export function getState(slug: string): StateDetails | undefined {
  return statesData.find((s) => s.slug === slug);
}

export function getStatesByRegion(region: string): StateDetails[] {
  return statesData.filter((s) => s.region.toLowerCase() === region.toLowerCase());
}

