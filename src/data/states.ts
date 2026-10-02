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

  // 11. Jammu & Kashmir
  {
    slug: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    capital: "Srinagar / Jammu",
    region: "North",
    description: "A region of alpine valleys, Mughal gardens, snow peaks, and warm Kashmiri hospitality with some of India's most photogenic landscapes.",
    summary: "Snow-country lakes, saffron fields, Mughal gardens, and Himalayan trekking routes.",
    culture: "Kashmiri handicrafts, Pashmina weaving, Wazwan cuisine, and houseboat living on Dal Lake.",
    cuisine: ["Kashmiri Dum Aloo", "Rogan Josh", "Kehwa", "Wazwan Platter", "Kashmiri Pulao"],
    festivals: ["Navreh", "Baisakhi", "Tulip Festival", "Kashmir Winter Festival", "Hemis Festival"],
    transportHubs: {
      airport: "Srinagar Airport (SXR), Jammu Airport (IXJ)",
      railway: "Jammu Tawi (JAT), Udhampur (UHP)",
      highways: ["NH 44", "NH 144A", "Srinagar-Leh Highway"],
    },
    itineraries: [
      {
        title: "Paradise Valley & Himalayan Trails",
        days: 6,
        route: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg"],
        summary: "Lake houseboats, floral meadows, snow adventures, and rich Kashmiri culture.",
      },
    ],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 33.7782, lng: 76.5762 },
    destinationSlugs: ["srinagar", "gulmarg", "pahalgam", "sonmarg"],
  },

  // 12. Punjab
  {
    slug: "punjab",
    name: "Punjab",
    capital: "Chandigarh",
    region: "North",
    description: "The heartbeat of the Indian plains, famous for its golden wheat fields, sacred shrines, Bhangra energy, and hearty Punjabi hospitality.",
    summary: "Grand gurudwaras, exuberant folk dance, rich cuisine, and vibrant market culture.",
    culture: "Bhangra, Giddha, Sikh heritage, and the emotional rhythm of langar traditions.",
    cuisine: ["Makki di Roti & Sarson da Saag", "Amritsari Kulcha", "Butter Chicken", "Lassi", "Chole Bhature"],
    festivals: ["Baisakhi", "Hola Mohalla", "Kite Festival", "Lohri", "Gurpurab"],
    transportHubs: {
      airport: "Amritsar (ATQ), Chandigarh (IXC)",
      railway: "Amritsar Junction (ASR), Ludhiana (LDH), Chandigarh (CDG)",
      highways: ["NH 1", "NH 10", "NH 44"],
    },
    itineraries: [
      {
        title: "Punjab Food & Faith Circuit",
        days: 4,
        route: ["Amritsar", "Wagah", "Chandigarh", "Ludhiana"],
        summary: "Golden Temple at dawn, Wagah border ceremony, and Punjabi food trails.",
      },
    ],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 31.1471, lng: 75.3412 },
    destinationSlugs: ["amritsar", "jalandhar", "chandigarh"],
  },

  // 13. Himachal Pradesh
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    capital: "Shimla",
    region: "North",
    description: "Mountain kingdom with snow-tipped ridges, tea gardens, valleys, and a beloved hill-station heritage shaped by colonial and Himalayan traditions.",
    summary: "Toy-train vistas, alpine villages, Tibetan monasteries, and adventure trails.",
    culture: "Pahari folk music, temple rituals, shawl weaving, and Himalayan mountain lore.",
    cuisine: ["Dham", "Siddu", "Chha Gosht", "Aktori", "Kullu Trout"],
    festivals: ["Kullu Dussehra", "Mandi Shivratri", "Minjar Fair", "Losar"],
    transportHubs: {
      airport: "Kangra (DHM), Kullu-Manali (KUU)",
      railway: "Kalka (KLK), Pathankot (PTKC)",
      highways: ["NH 3", "NH 5", "NH 154"],
    },
    itineraries: [
      {
        title: "Hill Station & Monastery Circuit",
        days: 5,
        route: ["Shimla", "Kullu", "Manali", "Dharamshala"],
        summary: "Colonial arches, pine-lined roads, mountain monasteries, and adventure sports.",
      },
    ],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 31.1048, lng: 77.1734 },
    destinationSlugs: ["shimla", "manali", "dharamshala", "spiti-valley"],
  },

  // 14. Uttarakhand
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    capital: "Dehradun",
    region: "North",
    description: "Land of rivers, Himalayas, and pilgrimage routes, where sacred ghats, cliffside temples, and forest landscapes meet in spiritual abundance.",
    summary: "Char Dham circuits, Himalayan rivers, mountain resorts, and heritage towns.",
    culture: "Garhwali tradition, folk songs, temple festivals, and Himalayan craftmaking.",
    cuisine: ["Aaloo Ke Gutke", "Bhangwali Chaat", "Kafuli", "Phaanu", "Madhua Sweet"],
    festivals: ["Kumbh Mela", "Nanda Devi Raj Jat Yatra", "Harela", "Basant Panchami"],
    transportHubs: {
      airport: "Dehradun Airport (DED)",
      railway: "Haridwar (HW), Dehradun (DDN), Kathgodam (KGM)",
      highways: ["NH 34", "NH 58", "Yamunotri Road"],
    },
    itineraries: [
      {
        title: "Sacred Himalayan Circuit",
        days: 6,
        route: ["Rishikesh", "Haridwar", "Bhimtal", "Auli"],
        summary: "River ghats, yoga retreats, temple trails, and panoramic high-altitude views.",
      },
    ],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 30.3165, lng: 78.0322 },
    destinationSlugs: ["rishikesh", "haridwar", "nainital", "auli"],
  },

  // 15. Gujarat
  {
    slug: "gujarat",
    name: "Gujarat",
    capital: "Gandhinagar",
    region: "West",
    description: "The western coastal state known for vibrant festivals, desert heritage, ancient stepwells, and a dynamic culture of trade and craft.",
    summary: "Somnath pilgrimage, desert safaris, kite festivals, and artisan heritage.",
    culture: "Garba, folk embroidery, Patola weaving, and colorful community celebrations.",
    cuisine: ["Thepla", "Dhokla", "Khandvi", "Undhiyu", "Gujarati Thali"],
    festivals: ["Navratri", "Rann Utsav", "Janmashtami", "Kutch Utsav", "International Kite Festival"],
    transportHubs: {
      airport: "Ahmedabad (AMD), Surat (STV)",
      railway: "Ahmedabad (ADI), Vadodara (BRC), Surat (ST)",
      highways: ["NH 48", "NH 27", "NH 64"],
    },
    itineraries: [
      {
        title: "Desert, Dandi & Heritage Trail",
        days: 5,
        route: ["Ahmedabad", "Modhera", "Rann of Kutch", "Somnath"],
        summary: "Sunset salt flats, stepwell architecture, and cultural dance nights.",
      },
    ],
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 22.2587, lng: 71.1924 },
    destinationSlugs: ["ahmedabad", "kutch", "somnath"],
  },

  // 16. Andhra Pradesh
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    region: "South",
    description: "A state of grand temples, river deltas, beaches, and a long coastal heritage shaped by dynasties, trade, and pilgrimage.",
    summary: "Temple heritage, deltas, hill forts, and south Indian coastlines.",
    culture: "Kuchipudi dance, Telugu literature, craft traditions, and temple festivals.",
    cuisine: ["Pulihora", "Gongura Chicken", "Andhra Meals", "Royyala Iguru", "Pootharekulu"],
    festivals: ["Ugadi", "Pongal", "Kuchipudi Festival", "Kakinada Pattana", "Maha Shivaratri"],
    transportHubs: {
      airport: "Vijayawada (VGA), Tirupati (TIR)",
      railway: "Vijayawada Junction (BZA), Guntur (GNT), Tirupati (TPTY)",
      highways: ["NH 16", "NH 65", "NH 44"],
    },
    itineraries: [
      {
        title: "Coast & Temple Circuit",
        days: 5,
        route: ["Visakhapatnam", "Araku", "Tirupati", "Amaravati"],
        summary: "Balancing hill country, sacred temples, and beautiful beaches.",
      },
    ],
    image: "https://images.unsplash.com/photo-1603020203020-4b80f5f2934b?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.9129, lng: 79.7400 },
    destinationSlugs: ["visakhapatnam", "tirupati", "araku"],
  },

  // 17. Telangana
  {
    slug: "telangana",
    name: "Telangana",
    capital: "Hyderabad",
    region: "South",
    description: "A land of pearly lake city palaces, ancient forts, Deccan craft, and a warm, welcoming food culture around Hyderabad.",
    summary: "Charminar, Golconda, biryani culture, and Deccan heritage.",
    culture: "Hyderabadi cuisine, Qawwali, artisan pearls, and heritage architecture.",
    cuisine: ["Hyderabadi Biryani", "Haleem", "Irani Chai", "Mirchi Ka Salan", "Double Ka Meetha"],
    festivals: ["Bonalu", "Bathukamma", "Ramadan Fair", "Sankranti", "Taj Mahal of Hyderabad Festival"],
    transportHubs: {
      airport: "Rajiv Gandhi Hyderabad Airport (HYD)",
      railway: "Secunderabad Junction (SC), Hyderabad Deccan (HYB)",
      highways: ["NH 44", "NH 765", "NH 163"],
    },
    itineraries: [
      {
        title: "Hyderabad & Deccan Heritage Route",
        days: 4,
        route: ["Hyderabad", "Golconda", "Warangal", "Bidar"],
        summary: "Palace architecture, bazaar culture, and Nizami hospitality.",
      },
    ],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 18.1124, lng: 79.0193 },
    destinationSlugs: ["hyderabad", "warangal", "bidar"],
  },

  // 18. Odisha
  {
    slug: "odisha",
    name: "Odisha",
    capital: "Bhubaneswar",
    region: "East",
    description: "Temple heritage, tribal traditions, coastlines, and the brilliance of Konark’s sun temple create a richly layered cultural identity.",
    summary: "Temple architecture, beach escapes, and vibrant tribal culture.",
    culture: "Odissi dance, Pattachitra art, tribal rituals, and temple processions.",
    cuisine: ["Dalma", "Pakhala Bhata", "Chhena Poda", "Macha Ghanta", "Khaja"],
    festivals: ["Ratha Yatra", "Durga Puja", "Nuakhai", "Makar Sankranti", "Dussehra"],
    transportHubs: {
      airport: "Bhubaneswar (BBI), Jharsuguda (JRG)",
      railway: "Bhubaneswar (BBS), Puri (PURI), Cuttack (CTC)",
      highways: ["NH 16", "NH 55", "NH 316"],
    },
    itineraries: [
      {
        title: "Temple & Coast Trail",
        days: 5,
        route: ["Bhubaneswar", "Puri", "Konark", "Chilika"],
        summary: "Sun temple vistas, sacred beaches, and artisan villages.",
      },
    ],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 20.9517, lng: 85.0985 },
    destinationSlugs: ["puri", "konark", "chilika"],
  },

  // 19. West Bengal
  {
    slug: "west-bengal",
    name: "West Bengal",
    capital: "Kolkata",
    region: "East",
    description: "A state of literary brilliance, colonial nostalgia, riverfront life, and the vibrant Himalayan and mangrove landscapes of the east.",
    summary: "Durga Puja, tea gardens, riverside heritage, and timeless sweets.",
    culture: "Rabindra Sangeet, Durga Puja artistry, terracotta craft, and Bengali cuisine.",
    cuisine: ["Machher Jhol", "Kosha Mangsho", "Rosogolla", "Sandesh", "Kathi Roll"],
    festivals: ["Durga Puja", "Poila Boishakh", "Kolkata Book Fair", "Poush Mela"],
    transportHubs: {
      airport: "Kolkata (CCU), Bagdogra (IXB)",
      railway: "Howrah (HWH), Sealdah (SDAH), New Jalpaiguri (NJP)",
      highways: ["NH 19", "NH 12", "NH 27"],
    },
    itineraries: [
      {
        title: "City of Joy to Tea Hills",
        days: 6,
        route: ["Kolkata", "Sundarbans", "Darjeeling", "Kalimpong"],
        summary: "Colonial charm, tea country sunsets, and mangrove boat rides.",
      },
    ],
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 22.9868, lng: 87.8550 },
    destinationSlugs: ["kolkata", "darjeeling", "sundarbans"],
  },

  // 20. Bihar
  {
    slug: "bihar",
    name: "Bihar",
    capital: "Patna",
    region: "East",
    description: "The cradle of ancient Indian civilization, rich in Buddhist and Mauryan heritage, pilgrimage routes, and river traditions.",
    summary: "Ganga ghats, ancient ruins, pilgrimage circuits, and enduring heritage.",
    culture: "Ganga Aarti, Maithili traditions, Buddhist heritage, and a deep cultural continuity.",
    cuisine: ["Litti Chokha", "Khaja", "Sattu Paratha", "Thekua", "Bihari Kebab"],
    festivals: ["Chhath Puja", "Sonepur Mela", "Mithila Mela", "Buddha Purnima"],
    transportHubs: {
      airport: "Patna (PAT), Gaya (GAY)",
      railway: "Patna Junction (PNBE), Gaya (GAYA), Muzaffarpur (MZP)",
      highways: ["NH 19", "NH 27", "NH 83"],
    },
    itineraries: [
      {
        title: "Ganga & Buddhist Heritage Loop",
        days: 4,
        route: ["Patna", "Rajgir", "Gaya", "Nalanda"],
        summary: "Magadha landmarks, Buddhist sites, and Ganga river rituals.",
      },
    ],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 25.0961, lng: 85.3131 },
    destinationSlugs: ["patna", "gaya", "rajgir"],
  },

  // 21. Jharkhand
  {
    slug: "jharkhand",
    name: "Jharkhand",
    capital: "Ranchi",
    region: "East",
    description: "A tribal-rich state with dense forests, waterfalls, and beautiful plateau landscapes where nature and indigenous culture coexist vibrantly.",
    summary: "Waterfalls, tribal culture, forest trails, and mineral-rich geography.",
    culture: "Hunting traditions, tribal festivals, folk dance, and nature reverence.",
    cuisine: ["Dhuska", "Chilka Roti", "Pitha", "Pukki", "Makhana"],
    festivals: ["Sarhul", "Karam", "Baha Parab", "Holi"],
    transportHubs: {
      airport: "Ranchi (IXR)",
      railway: "Ranchi Junction (RNC), Hatia (HTE), Bokaro (BKR)",
      highways: ["NH 18", "NH 20", "NH 33"],
    },
    itineraries: [
      {
        title: "Forest Trails & Tribal Heritage",
        days: 4,
        route: ["Ranchi", "Betla", "Hazaribagh", "Patratu"],
        summary: "Forest safaris, waterfall escapes, and indigenous heritage encounters.",
      },
    ],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 23.6102, lng: 85.2799 },
    destinationSlugs: ["ranchi", "betla", "hazaribagh"],
  },

  // 22. Assam
  {
    slug: "assam",
    name: "Assam",
    capital: "Dispur",
    region: "Northeast",
    description: "The Brahmaputra valley is home to tea gardens, monsoon forests, wildlife sanctuaries, and a deeply rooted Assamese cultural identity.",
    summary: "Tea terraces, river life, silk heritage, and monsoon lushness.",
    culture: "Bihu, Assamese silk, satras, and the rhythms of the Brahmaputra floodplain.",
    cuisine: ["Masor Tenga", "Duck Curry", "Pitha", "Bodo Rice Dishes", "Assam Tea"],
    festivals: ["Bihu", "Raas Utsav", "Ambubachi Mela", "Tea Festival"],
    transportHubs: {
      airport: "Lokpriya Gopinath Bordoloi (GAU)",
      railway: "Guwahati (GHY), Dibrugarh (DIB)",
      highways: ["NH 27", "NH 17", "NH 15"],
    },
    itineraries: [
      {
        title: "Tea Trail & Brahmaputra River",
        days: 5,
        route: ["Guwahati", "Majuli", "Jorhat", "Kaziranga"],
        summary: "River island life, tea gardens, and one-horned rhino safaris.",
      },
    ],
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.2006, lng: 92.9376 },
    destinationSlugs: ["kaziranga", "majuli", "guwahati"],
  },

  // 23. Meghalaya
  {
    slug: "meghalaya",
    name: "Meghalaya",
    capital: "Shillong",
    region: "Northeast",
    description: "The Abode of Clouds offers dramatic waterfalls, living root bridges, and some of the world's wettest landscapes.",
    summary: "Cloud-kissed cliffs, root bridges, and monsoon magic.",
    culture: "Khasi and Jaintia traditions, matrilineal heritage, and folk music rituals.",
    cuisine: ["Jadoh", "Dohneiiong", "Pumaloi", "Drynmai", "Mizo Bamboo-Prep"],
    festivals: ["Shillong Cherry Blossom Festival", "Wangala", "Bakhra", "Meghalaya Festival"],
    transportHubs: {
      airport: "Shillong (SHL)",
      railway: "Nearest major rail: Guwahati (GHY)",
      highways: ["NH 6", "NH 206", "Shillong Road"],
    },
    itineraries: [
      {
        title: "Living Root Bridges & Waterfalls",
        days: 4,
        route: ["Shillong", "Cherrapunji", "Mawlynnong", "Mawsynram"],
        summary: "Monsoon waterfalls, tribal villages, and ancient treetop bridges.",
      },
    ],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 25.4670, lng: 91.3662 },
    destinationSlugs: ["shillong", "cherrapunji", "mawlynnong"],
  },

  // 24. Nagaland
  {
    slug: "nagaland",
    name: "Nagaland",
    capital: "Kohima",
    region: "Northeast",
    description: "A mountainous land of Naga tribes, warrior traditions, bamboo villages, and richly layered festival culture.",
    summary: "Tribals, hornbill dances, and mountain heritage.",
    culture: "Morung traditions, indigenous music, warrior dances, and cattle festivals.",
    cuisine: ["Smoked Pork", "Axone", "Zan", "Rice Beer", "Naga Chili Dishes"],
    festivals: ["Hornbill Festival", "Sekrenyi", "Tuluni", "Moatsü"],
    transportHubs: {
      airport: "Dimapur (DMU)",
      railway: "Dimapur (DMV), Kohima Road (KMY)",
      highways: ["NH 29", "NH 702D", "NH 129"],
    },
    itineraries: [
      {
        title: "Tribal Mountain Festival Circuit",
        days: 4,
        route: ["Kohima", "Kisama", "Dzükou Valley", "Wokha"],
        summary: "Village heritage, mountain hikes, and vibrant indigenous dance.",
      },
    ],
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.1584, lng: 94.5624 },
    destinationSlugs: ["kohima", "kisama", "dzukou"],
  },

  // 25. Arunachal Pradesh
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    region: "Northeast",
    description: "Where Himalayan monasteries, tribal villages, and dense rainforest valleys create one of India’s most biodiverse frontier regions.",
    summary: "Monasteries, tribal culture, and river valleys.",
    culture: "Mishmi and Monpa traditions, Buddhist monasteries, and folk dance forms.",
    cuisine: ["Apong", "Pitha", "Thukpa", "Bamboo Shoot Curry", "Rice Beer"],
    festivals: ["Losar", "Dree Festival", "Solung", "Torgya", "Apatani Festival"],
    transportHubs: {
      airport: "Itanagar (HGI), Tezpur Airport (TEZ)",
      railway: "Nearest rail: North Lakhimpur / Guwahati",
      highways: ["NH 13", "NH 315", "NH 215"],
    },
    itineraries: [
      {
        title: "Himalayan Frontier & Monasteries",
        days: 5,
        route: ["Itanagar", "Tawang", "Bomdila", "Pasighat"],
        summary: "High passes, mountain monasteries, and vibrant tribal villages.",
      },
    ],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 28.2180, lng: 94.7278 },
    destinationSlugs: ["tawang", "bomdila", "pasighat"],
  },

  // 26. Sikkim
  {
    slug: "sikkim",
    name: "Sikkim",
    capital: "Gangtok",
    region: "Northeast",
    description: "A Himalayan state of Buddhist monasteries, alpine lakes, and steep forested valleys that feel both peaceful and adventurous.",
    summary: "Monasteries, lakes, snow peaks, and Himalayan biodiversity.",
    culture: "Buddhist prayer flags, yak herding culture, and mountain festivals.",
    cuisine: ["Momo", "Thukpa", "Sel Roti", "Phagshapa", "Chhurpi"],
    festivals: ["Losar", "Saga Dawa", "Bumchu", "Tihar"],
    transportHubs: {
      airport: "Bagdogra Airport (IXB)",
      railway: "New Jalpaiguri (NJP)",
      highways: ["NH 10", "NH 310", "Gangtok Highway"],
    },
    itineraries: [
      {
        title: "Alpine Lakes & Prayer Flags",
        days: 4,
        route: ["Gangtok", "Tsomgo Lake", "Pelling", "Namchi"],
        summary: "Lake panoramas, monastery views, and highland trekking routes.",
      },
    ],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 27.5330, lng: 88.5122 },
    destinationSlugs: ["gangtok", "tsomgo", "pelling"],
  },

  // 27. Manipur
  {
    slug: "manipur",
    name: "Manipur",
    capital: "Imphal",
    region: "Northeast",
    description: "Land of the jewel by the Himalayas, famed for its lakes, martial heritage, and the graceful poise of Manipuri dance.",
    summary: "Lake beauty, classical dance, and mountain culture.",
    culture: "Manipuri dance, polo heritage, and vibrant seasonal festivals.",
    cuisine: ["Eromba", "Yongchak", "Fish Curry", "Chakhao Kheer", "Rice Cakes"],
    festivals: ["Rath Yatra", "Yaosang", "Shamu", "Onai"],
    transportHubs: {
      airport: "Imphal Airport (IMF)",
      railway: "Nearest major rail: Guwahati",
      highways: ["NH 2", "NH 102", "NH 37"],
    },
    itineraries: [
      {
        title: "Lakes & Dance Heritage",
        days: 4,
        route: ["Imphal", "Loktak Lake", "Keibul Lamjao", "Andro"],
        summary: "Culture, lake biodiversity, and classical dance traditions.",
      },
    ],
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 24.8170, lng: 93.9368 },
    destinationSlugs: ["imphal", "loktak", "andro"],
  },

  // 28. Mizoram
  {
    slug: "mizoram",
    name: "Mizoram",
    capital: "Aizawl",
    region: "Northeast",
    description: "The eastern highland state of bamboo, forested hills, and unhurried mountain life under a veil of mist and rain.",
    summary: "Hills, bamboo villages, and youthful cultural energy.",
    culture: "Mizo songs, festival dance, local weaving, and bamboo craft.",
    cuisine: ["Bai", "Vawksa Rep", "Sawhchiar", "Mizo Chutney", "Rice Beer"],
    festivals: ["Chapchar Kut", "Pawl Kut", "Mizoram State Festival", "Mim Kut"],
    transportHubs: {
      airport: "Aizawl (AJL)",
      railway: "Nearest rail: Silchar / Guwahati",
      highways: ["NH 54", "NH 102", "MH 2"],
    },
    itineraries: [
      {
        title: "Misty Hills & Village Life",
        days: 3,
        route: ["Aizawl", "Vantawng Falls", "Reiek", "Lunglei"],
        summary: "Misty ridgelines, waterfalls, and village hospitality.",
      },
    ],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 23.1645, lng: 92.9376 },
    destinationSlugs: ["aizawl", "lunglei", "reiek"],
  },

  // 29. Tripura
  {
    slug: "tripura",
    name: "Tripura",
    capital: "Agartala",
    region: "Northeast",
    description: "A lush green state with river valleys, royal palaces, and a distinctly Bengali-Assamese and tribal cultural blend.",
    summary: "Palace heritage, bamboo weaving, and lush valley landscapes.",
    culture: "Tripura palaces, tribal folk forms, and beautiful handcrafted textiles.",
    cuisine: ["Mui Borok", "Chakhwi", "Fish Curry", "Rice Dishes", "Sweets"],
    festivals: ["Garia Puja", "Kharchi Puja", "Durga Puja", "Tripura Festival"],
    transportHubs: {
      airport: "Agartala (IXA)",
      railway: "Agartala (AGTL)",
      highways: ["NH 8", "NH 108", "NH 44"],
    },
    itineraries: [
      {
        title: "Royal Valley & Ethnic Heritage",
        days: 3,
        route: ["Agartala", "Ujjayanta Palace", "Khowai", "Unakoti"],
        summary: "Heritage architecture and relaxed hill town surroundings.",
      },
    ],
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 23.9408, lng: 91.9882 },
    destinationSlugs: ["agartala", "ujjayanta", "khowai"],
  },

  // 30. Ladakh
  {
    slug: "ladakh",
    name: "Ladakh",
    capital: "Leh",
    region: "North",
    description: "The cold desert of passes and monasteries, where Tibetan Buddhist culture unfolds across stark mountain vistas and glacier-fed valleys.",
    summary: "High passes, gompas, and moon-like desert landscapes.",
    culture: "Buddhist rituals, prayer flags, and mountain communities shaped by Tibetan culture.",
    cuisine: ["Thukpa", "Momos", "Butter Tea", "Skyu", "Khambir"],
    festivals: ["Hemis Festival", "Losar", "Ladakh Festival", "Dosmoche"],
    transportHubs: {
      airport: "Leh Airport (IXL)",
      railway: "Jammu Tawi (nearest major rail)",
      highways: ["Srinagar-Leh Highway", "Manali-Leh Highway"],
    },
    itineraries: [
      {
        title: "High Passes & Monastery Circuit",
        days: 6,
        route: ["Leh", "Nubra Valley", "Pangong", "Sham Valley"],
        summary: "Cold desert thrills, monastery mornings, and glacier lake beauty.",
      },
    ],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 34.1526, lng: 77.5771 },
    destinationSlugs: ["leh", "nubra", "pangong"],
  },
];

export function getState(slug: string): StateDetails | undefined {
  return statesData.find((s) => s.slug === slug);
}

export function getStatesByRegion(region: string): StateDetails[] {
  return statesData.filter((s) => s.region.toLowerCase() === region.toLowerCase());
}

