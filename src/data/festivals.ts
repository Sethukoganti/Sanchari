import type { Festival } from "@/lib/types";

export const festivalsData: Festival[] = [
  // 1. DIWALI
  {
    id: "diwali",
    slug: "diwali",
    name: "Diwali (Deepawali)",
    nameHi: "दीपावली",
    nameInRegionalLanguage: "தீபாவளி (Tamil) / ದೀಪಾವಳಿ (Kannada)",
    type: "religious",
    religion: "Hinduism / Jainism / Sikhism",
    region: ["North", "South", "East", "West", "Central"],
    states: ["Uttar Pradesh", "Rajasthan", "Maharashtra", "Gujarat", "Tamil Nadu", "Delhi"],
    date: {
      type: "lunar",
      gregorianApprox: "October / November (Kartik Amavasya)",
      month: "November",
    },
    duration: "5 Days (Dhanteras to Bhai Dooj)",
    significance:
      "The Supreme Festival of Lights celebrating the victory of spiritual light over darkness, good over evil, and wisdom over ignorance. It marks Lord Rama's triumphant return to Ayodhya after 14 years of exile and defeating Ravana, as well as Goddess Lakshmi's emergence from the cosmic ocean churning (Samudra Manthan). Millions of terracotta earthen oil lamps (diyas) are lit across every doorstep in India.",
    history:
      "Mentioned in ancient Sanskrit texts including the Skanda Purana and Padma Purana. In Sikh tradition, it is celebrated as Bandi Chhor Divas, marking Guru Hargobind Ji's release from Gwalior Fort. In Jainism, it commemorates the final liberation (Moksha) of Lord Mahavira.",
    rituals: [
      {
        name: "Deepotsav & Lighting of Diyas",
        description: "Illuminating homes, rooftops, and riverbanks with cotton-wick clay lamps filled with mustard or sesame oil.",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Lakshmi-Ganesha Puja",
        description: "Evening worship of Goddess Lakshmi (Wealth) and Lord Ganesha (Auspicious Beginnings) with lotus flowers, coins, and sweets.",
      },
      {
        name: "Rangoli Creation",
        description: "Intricate colored powder and flower petal geometric patterns drawn at home thresholds to welcome cosmic blessings.",
      },
    ],
    foods: [
      { name: "Kaju Katli", description: "Diamond-shaped cashew nut fudge coated with edible pure silver leaf.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80" },
      { name: "Besan Ladoo", description: "Roasted gram flour sweet spheres with desi ghee, cardamom, and chopped almonds." },
      { name: "Chakli / Murukku", description: "Crispy spiral savory crunchies made with spiced rice flour and sesame seeds." },
    ],
    music: ["Devotional Bhajans", "Shehnai recital at dawn", "Sanskrit Stotras"],
    dance: ["Garba in Gujarat", "Folk dances across regional community squares"],
    dress: "New vibrant traditional attire: silk kurtas with churidar for men, Kanchipuram or Banarasi silk sarees and lehengas for women.",
    greetings: [
      { language: "Hindi", greeting: "शुभ दीपावली (Shubh Deepawali)" },
      { language: "Tamil", greeting: "இனிய தீபாவளி நல்வாழ்த்துக்கள் (Iniya Deepavali Nalvazhthukkal)" },
      { language: "Bengali", greeting: "শুভ দীপাবলি (Shubho Dipaboli)" },
    ],
    bestPlacesToCelebrate: [
      { place: "Ayodhya & Varanasi", state: "Uttar Pradesh", whySpecial: "Record-breaking 2.5 million oil lamps lit along Saryu and Ganga Ghats on Dev Deepawali.", destinationSlug: "varanasi" },
      { place: "Jaipur", state: "Rajasthan", whySpecial: "The entire Pink City old bazaars are illuminated with decorative royal lighting installations.", destinationSlug: "jaipur" },
      { place: "Amritsar", state: "Punjab", whySpecial: "The Golden Temple is draped in golden lights and brilliant fireworks reflecting on the sacred Amrit Sarovar." },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: [
        "Wear natural cotton clothing rather than synthetic fabrics around lamps and firecrackers.",
        "Join heritage walking tours in Varanasi or Jaipur for local home sweet tastings.",
      ],
      whatToWear: "Bright colored ethnic Indian clothing (avoid black on Diwali day).",
      whatToBring: ["Camera with low-light capability", "Earplugs for fireworks zones"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["varanasi", "jaipur"],
  },

  // 2. HOLI
  {
    id: "holi",
    slug: "holi",
    name: "Holi (Festival of Colors)",
    nameHi: "होली",
    nameInRegionalLanguage: "হোলি (Bengali) / ᱦᱳᱞᱤ (Santali)",
    type: "religious",
    religion: "Hinduism",
    region: ["North", "Central", "West", "East"],
    states: ["Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Delhi", "Bihar", "West Bengal"],
    date: {
      type: "lunar",
      gregorianApprox: "March (Phalguna Purnima)",
      month: "March",
    },
    duration: "2 Days (Holika Dahan & Dhulandi)",
    significance:
      "The joyous carnival of spring celebrating the arrival of vibrant blossoms, the eternal divine love of Radha and Krishna, and the victory of devotion (Bhakti) represented by Prahlada over demon king Hiranyakashipu. Caste, social barriers, and inhibitions dissolve as communities shower each other in organic herbal colors (gulal), water balloons, and flowers.",
    history:
      "Documented in ancient stone reliefs at Hampi (16th century) and Sanskrit works by Kalidasa and King Harsha. The traditional Holika bonfire burns evil and purifies the atmosphere.",
    rituals: [
      {
        name: "Holika Dahan Bonfire",
        description: "Lighting massive pyres on the eve of Holi with Vedic chants to burn away negative energies.",
      },
      {
        name: "Rangwali Holi / Dhulandi",
        description: "Full day of color play throwing dry gulal, floral waters, and dance to Dhol drums.",
      },
    ],
    foods: [
      { name: "Gujiya", description: "Crisp deep-fried pastry turnovers stuffed with sweetened mawa, dried coconut, and nuts." },
      { name: "Thandai", description: "Chilled spiced milk drink infused with almonds, fennel seeds, cardamom, rose petals, and saffron." },
    ],
    music: ["Braj Folk Songs (Rasiya)", "High-energy Punjabi and Bollywood Dhol beats"],
    dance: ["Lathmar folk dance in Barsana", "Phag dance"],
    dress: "Simple white cotton kurta-pajama or white salwar kameez (which becomes a vibrant canvas of colors).",
    greetings: [
      { language: "Hindi", greeting: "बुरा न मानो, होली है! (Bura Na Mano, Holi Hai!)" },
      { language: "Bengali", greeting: "শুভ দোলযাত্রা (Shubho Doljatra)" },
    ],
    bestPlacesToCelebrate: [
      { place: "Mathura & Vrindavan", state: "Uttar Pradesh", whySpecial: "The legendary Braj Bhumi celebrations spanning 10 days of temple flower Holi.", destinationSlug: "varanasi" },
      { place: "Jaipur", state: "Rajasthan", whySpecial: "Royal City Palace celebrations and Elephant Festival festivities.", destinationSlug: "jaipur" },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: [
        "Apply coconut oil or almond oil generously to skin and hair before stepping outside to prevent color staining.",
        "Wear sunglasses to protect your eyes from color powders.",
      ],
      whatToWear: "Old white cotton clothes that you do not mind discarding.",
      whatToBring: ["Waterproof phone pouch", "Organic herbal Gulal powders"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["jaipur", "varanasi"],
  },

  // 3. DURGA PUJA
  {
    id: "durga-puja",
    slug: "durga-puja",
    name: "Durga Puja (Sharadotsav)",
    nameHi: "दुर्गा पूजा",
    nameInRegionalLanguage: "দুর্গাপূজা (Bengali)",
    type: "cultural",
    religion: "Hinduism / UNESCO Intangible Cultural Heritage",
    region: ["East", "Northeast"],
    states: ["West Bengal", "Tripura", "Assam", "Odisha", "Delhi"],
    date: {
      type: "lunar",
      gregorianApprox: "September / October (Ashwin Month)",
      month: "October",
    },
    duration: "5 Days (Sasthi to Dashami)",
    significance:
      "Inscribed on UNESCO's Representative List of Intangible Cultural Heritage of Humanity, Durga Puja transforms Kolkata into the world's largest public art installation. It celebrates the ten-armed warrior Goddess Durga vanquishing the demon Mahishasura, symbolizing the triumph of feminine cosmic power (Shakti).",
    history:
      "Evolved from 16th-century royal zamindari celebrations into grand community Barowari pujas in the 18th century. Master clay sculptors in Kumartuli fashion breathtaking idols from holy Ganges clay.",
    rituals: [
      { name: "Dhunuchi Naach", description: "Frenetic spiritual dance holding clay censers burning coconut husks and frankincense to the rhythm of Dhak drums." },
      { name: "Sindoor Khela", description: "Married women applying vermilion powder on the Goddess and each other on Vijaya Dashami before idol immersion." },
    ],
    foods: [
      { name: "Khichuri Bhog", description: "Sacred temple yellow lentil rice tempered with whole spices, served with Labra mixed vegetable and tomato chutney." },
      { name: "Kolkata Kathi Rolls & Mughlai Parotta", description: "Iconic street food devoured late into the night during pandal hopping." },
    ],
    music: ["Resonant Dhak drum beats", "Kash Phool flute melodies", "Rabindra Sangeet"],
    dance: ["Dhunuchi Dance", "Gaudiya Nritya"],
    dress: "Traditional white saree with deep red borders (Garad/Tussar) for women, Kurta with Dhoti for men.",
    greetings: [{ language: "Bengali", greeting: "শুভ শারদীয়া (Shubho Sharodiya - Happy Autumn Puja)" }],
    bestPlacesToCelebrate: [
      { place: "Kolkata", state: "West Bengal", whySpecial: "Over 3,000 architectural art pandals spread across the entire city.", destinationSlug: "kolkata" },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Wear comfortable walking shoes for all-night pandal hopping excursions."],
      whatToWear: "Traditional Bengali or smart casual clothing.",
      whatToBring: ["Camera", "Metro card for navigating Kolkata easily"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["kolkata"],
  },

  // 4. ONAM
  {
    id: "onam",
    slug: "onam",
    name: "Onam (Harvest Festival of Kerala)",
    nameHi: "ओणम",
    nameInRegionalLanguage: "ഓണം (Malayalam)",
    type: "harvest",
    religion: "Cultural / All Communities in Kerala",
    region: ["South"],
    states: ["Kerala"],
    date: {
      type: "lunar",
      gregorianApprox: "August / September (Chingam Month)",
      month: "September",
    },
    duration: "10 Days (Atham to Thiruvonam)",
    significance:
      "The state harvest festival of Kerala celebrating the annual return of the mythical, benevolent Asura King Mahabali under whose golden reign all citizens were equal, truthful, and prosperous.",
    history:
      "Deeply woven into Sangam era literature and the Vamana avatar of Lord Vishnu.",
    rituals: [
      { name: "Pookkalam (Floral Carpet)", description: "Elaborate concentric flower petal rangoli patterns arranged at the entrance of every Kerala home." },
      { name: "Vallam Kali (Snake Boat Race)", description: "Epic 100-foot Chundan Vallam wooden boats manned by 100 synchronized oarsmen chanting Vanchipattu." },
      { name: "Pulikali (Tiger Dance)", description: "Performers painted head-to-toe as fierce tigers and leopards dancing to drum beats in Swaraj Round Thrissur." },
    ],
    foods: [
      { name: "Onam Sadya (26-Dish Feast)", description: "Grand vegetarian banquet served on fresh plantain leaf with Rice, Sambar, Avial, Thoran, Olan, Payasam, and Banana Chips." },
    ],
    music: ["Vanchipattu boat songs", "Chenda Melam percussion ensembles"],
    dance: ["Thiruvathirakali women's circular dance", "Kathakali", "Pulikali"],
    dress: "Kasavu Mundu and Kasavu Sarees (off-white handloom cotton with rich golden zari borders).",
    greetings: [{ language: "Malayalam", greeting: "ഹൃദയം നിറഞ്ഞ ഓണാശംസകൾ (Hridhayam Niranja Onashamsakal)" }],
    bestPlacesToCelebrate: [
      { place: "Alleppey & Aranmula", state: "Kerala", whySpecial: "Spectacular Snake Boat races along the Pamba and Punnamada rivers.", destinationSlug: "alleppey" },
      { place: "Thrikkakara Temple", state: "Kochi", whySpecial: "The primary temple dedicated to Vamana and King Mahabali." },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Book a seat at a traditional heritage hotel or ancestral home for the 26-dish Sadya lunch on Thiruvonam day."],
      whatToWear: "Traditional Kerala Kasavu handloom attire.",
      whatToBring: ["Sun hat for boat race viewing"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["alleppey", "kochi"],
  },

  // 5. PUSHKAR CAMEL FAIR
  {
    id: "pushkar-camel-fair",
    slug: "pushkar-camel-fair",
    name: "Pushkar Camel Fair (Pushkar Mela)",
    nameHi: "पुष्कर मेला",
    nameInRegionalLanguage: "पुष्कर ऊँट मेला",
    type: "cultural",
    religion: "Cultural & Hindu Pilgrimage",
    region: ["West"],
    states: ["Rajasthan"],
    date: {
      type: "lunar",
      gregorianApprox: "November (Kartik Purnima)",
      month: "November",
    },
    duration: "8 Days",
    significance:
      "One of the world's largest livestock and camel trading fairs combined with a sacred pilgrimage to the only prominent Lord Brahma temple in the world.",
    history:
      "Centuries-old gathering where pastoralists from the Thar desert converge to trade decorated camels, horses, and livestock.",
    rituals: [
      { name: "Maha Aarti at Brahma Ghat", description: "Spiritual evening aarti with thousands of floating oil lamps on Pushkar Lake." },
      { name: "Camel Beauty & Dancing Contest", description: "Camels shorn in intricate geometric patterns, draped in colorful pom-poms, beads, and silver anklets." },
    ],
    foods: [
      { name: "Pushkar Malpua (Halwai Gali)", description: "Crisp golden pancake soaked in cardamom saffron syrup." },
      { name: "Rajasthani Kadhi Kachori", description: "Pyaaz kachori crushed and smothered in boiling hot spiced yogurt gravy." },
    ],
    music: ["Ravanahatha string instrument", "Nagara drums", "Manganiyar and Langa folk songs"],
    dance: ["Kalbelia snake dance", "Chari fire dance"],
    dress: "Vibrant turbans (Safas) in saffron, pink, and yellow for men; mirror-work ghagras for women.",
    greetings: [{ language: "Rajasthani / Hindi", greeting: "खम्मा घणी (Khamma Ghani - Warm Royal Greetings)" }],
    bestPlacesToCelebrate: [
      { place: "Pushkar", state: "Rajasthan", whySpecial: "Over 50,000 camels on golden sand dunes under the full moon.", destinationSlug: "jaipur" },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Take a hot air balloon flight at dawn to photograph the vast desert tent city from the sky."],
      whatToWear: "Comfortable desert walking clothes and sunglasses.",
      whatToBring: ["Telephoto camera lens", "Dust scarf"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["jaipur"],
  },

  // 6. HORNBILL FESTIVAL
  {
    id: "hornbill-festival",
    slug: "hornbill-festival",
    name: "Hornbill Festival (Festival of Festivals)",
    nameHi: "हॉर्नबिल महोत्सव",
    nameInRegionalLanguage: "Hornbill Festival (Nagaland)",
    type: "cultural",
    religion: "Indigenous Naga Tribal Heritage",
    region: ["Northeast"],
    states: ["Nagaland"],
    date: {
      type: "fixed",
      gregorianApprox: "December 1 to December 10 Annually",
      month: "December",
    },
    duration: "10 Days",
    significance:
      "A grand celebration of the rich indigenous heritage of all 16 recognized Naga tribes in the heritage village of Kisama. Named after the sacred Great Indian Hornbill bird, admired in tribal folklore for its majesty and alertness.",
    history:
      "Initiated by the Government of Nagaland in December 2000 to foster inter-tribal harmony and showcase traditional tribal morungs (dormitories), warrior arts, and music.",
    rituals: [
      { name: "Traditional Morung Gatherings", description: "Tribal elders sharing folklore around log fires inside wood-carved traditional tribal longhouses." },
      { name: "Warrior Archery & Log Drumming", description: "Demonstrations of indigenous war cries, Naga wrestling, and synchronized wooden log-drum beats." },
    ],
    foods: [
      { name: "Smoked Pork with Bamboo Shoot & Raja Mircha", description: "Traditional Naga slow-smoked pork cooked with fermented bamboo shoots and fiery ghost pepper chilies." },
      { name: "Zutho (Naga Rice Beer)", description: "Frothy, mildly sweet fermented rice beverage served in bamboo mugs." },
    ],
    music: ["Naga choral harmonies", "Folk acoustic log drumming", "International Hornbill Rock Contest"],
    dance: ["Warrior victory dances in hornbill-feathered headgear"],
    dress: "Handwoven tribal shawls indicating social rank, conical headgear with hornbill feathers, and boar-tusk necklaces.",
    greetings: [{ language: "Nagamese", greeting: "Shalom / Welcome to Nagaland" }],
    bestPlacesToCelebrate: [
      { place: "Kisama Naga Heritage Village", state: "Nagaland", whySpecial: "Natural amphitheater nestled in mist-shrouded green hills near Kohima." },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Book Kohima homestays 3 to 4 months in advance as tourist capacity fills completely."],
      whatToWear: "Warm winter layers for chilly December evenings in the Naga hills.",
      whatToBring: ["ILP (Inner Line Permit) for Nagaland entry"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["kolkata"],
  },

  // 7. HEMIS FESTIVAL
  {
    id: "hemis-festival",
    slug: "hemis-festival",
    name: "Hemis Monastery Tsechu",
    nameHi: "हेमिस महोत्सव",
    nameInRegionalLanguage: "ཧེ་མིས་ཚེས་བཅུ (Tibetan)",
    type: "religious",
    religion: "Tibetan Buddhism (Drukpa Lineage)",
    region: ["North"],
    states: ["Ladakh"],
    date: {
      type: "lunar",
      gregorianApprox: "June / July (10th Day of Tibetan 5th Month)",
      month: "July",
    },
    duration: "2 Days",
    significance:
      "Commemorates the birth anniversary of Guru Padmasambhava (Guru Rinpoche), the 8th-century master who introduced Vajrayana Buddhism to the Himalayas.",
    history:
      "Celebrated at Hemis Gompa, the wealthiest and largest monastery in Ladakh founded in 1672 by King Sengge Namgyal.",
    rituals: [
      { name: "Sacred Cham Masked Dances", description: "Lamas adorned in elaborate silk brocade robes and hand-carved wooden masks depicting protective deities dancing in the courtyard to cymbals and long Tibetan horns (Dungchen)." },
      { name: "Unfurling of the Two-Story Silk Thangka", description: "Every 12 years during the Monkey Year, the giant embroidered silk thangka of Guru Rinpoche is displayed." },
    ],
    foods: [
      { name: "Ladakhi Tsampa & Butter Tea", description: "Roasted barley flour rolled with hot butter tea." },
    ],
    music: ["Long Tibetan horns (Dungchen)", "Conch shells", "Cymbals and Damaru drums"],
    dance: ["Mystical Cham Masked Dances by ordained Buddhist lamas"],
    dress: "Traditional maroon Ladakhi Goncha coats with silk sashes and turquoise-studded Peraks.",
    greetings: [{ language: "Ladakhi", greeting: "Julley! (Hello / Welcome / Peace)" }],
    bestPlacesToCelebrate: [
      { place: "Hemis Gompa", state: "Ladakh", whySpecial: "Dramatic mountain monastery courtyard located 45 km from Leh.", destinationSlug: "leh" },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Arrive at the monastery courtyard by 7:30 AM to secure a front-row seated spot before the crowds arrive."],
      whatToWear: "Modest clothes with shoulders and legs covered.",
      whatToBring: ["Wide-brim sunhat", "High SPF sunscreen"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["leh"],
  },

  // 8. RANN UTSAV
  {
    id: "rann-utsav",
    slug: "rann-utsav",
    name: "Rann Utsav (White Desert Festival)",
    nameHi: "रण उत्सव",
    nameInRegionalLanguage: "રણ ઉત્સવ (Gujarati)",
    type: "cultural",
    religion: "Cultural / Desert Heritage",
    region: ["West"],
    states: ["Gujarat"],
    date: {
      type: "seasonal",
      gregorianApprox: "November to February Annually",
      month: "December",
    },
    duration: "4 Months (Winter Season)",
    significance:
      "Celebration of the surreal White Salt Desert of Kutch under glowing full moon nights. Features luxury tent cities in Dhordo, Kutchi embroidery artisan stalls, camel safaris, and stargazing.",
    history: "Initiated in 2006 to showcase Kutch's resilient handicrafts and white desert landscape.",
    rituals: [
      { name: "Full Moon White Desert Walk", description: "Walking across the glowing salt desert at midnight under the full moon." },
    ],
    foods: [
      { name: "Kutchi Dabeli", description: "Spiced potato burger with pomegranate, peanuts, and sev." },
    ],
    music: ["Kutchi folk music", "Surando string instrument"],
    dance: ["Garba & Kutchi Raas"],
    dress: "Ahir and Rabari mirror-work embroidery costumes",
    greetings: [{ language: "Gujarati", greeting: "આવો પધારો (Aavo Padharo - Welcome)" }],
    bestPlacesToCelebrate: [
      { place: "Dhordo White Desert", state: "Gujarat", whySpecial: "Over 7,500 sq km of pure white salt crystals glowing under moonlight." },
    ],
    touristInfo: {
      canTouristsParticipate: true,
      tips: ["Book your visit around the full moon night dates for the most breathtaking optical reflections."],
      whatToWear: "Warm windproof jackets for night desert temperatures.",
      whatToBring: ["Wide-angle camera lens for moonscapes"],
    },
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    ],
    relatedDestinations: ["jaipur"],
  },
];

export function getFestival(slug: string): Festival | undefined {
  return festivalsData.find((f) => f.slug === slug);
}

export function getUpcomingFestivals(): Festival[] {
  return festivalsData.slice(0, 4);
}

