"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "@/lib/types";
import { LANGUAGES, type LanguageInfo, getLanguageByCode } from "@/lib/languages";

// ---------------------------------------------------------------------------
// 23 Language Comprehensive Translation Dictionaries
// ---------------------------------------------------------------------------

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "brand.name": "SANCHARI BHARAT",
    "brand.subName": "Explore India",
    "brand.tagline": "AI-powered discovery → personalised planning → smarter travel",
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.experiences": "Experiences",
    "nav.events": "Events & Festivals",
    "nav.planner": "AI Trip Planner",
    "nav.book": "Book Travel",
    "nav.flights": "Flights",
    "nav.trains": "Trains",
    "nav.buses": "Buses",
    "nav.stays": "Stays & Hotels",
    "nav.myBookings": "My Bookings",
    "nav.savedTrips": "Saved Trips",
    "nav.businesses": "Local Businesses",
    "nav.travelSmart": "Travel Smart",
    "nav.search": "Search",
    "nav.signIn": "Sign In",
    "nav.language": "Language",
    "hero.badge": "SANCHARI BHARAT · AI-POWERED TRAVEL DISCOVERY",
    "hero.title": "Discover India. Plan Smarter. Travel Better.",
    "hero.subtitle": "Explore destinations, experiences and hidden gems across India — and let AI create a personalised, day-wise trip for you.",
    "hero.planCta": "Plan My Trip with AI",
    "hero.exploreCta": "Explore India",
    "hero.searchPlaceholder": "Search destinations, states, festivals, experiences, flights, stays...",
    "state.capital": "Capital",
    "state.livingCulture": "Living Culture & Traditions",
    "state.touristFeatures": "Tourist Features & Signature Experiences",
    "state.cuisine": "Signature Cuisine & Delicacies",
    "state.festivals": "Major State Festivals",
    "state.travelCircuits": "Curated Travel Circuits",
    "state.transport": "Transport & Hubs",
    "state.airports": "Major Airports:",
    "state.railway": "Key Railway Junctions:",
    "state.highways": "National Highways:",
    "state.route": "Route:",
    "state.planTrip": "Plan",
    "state.trip": "Trip",
    "state.states": "States",
    "booking.widgetTitle": "Book Travel Across India",
    "booking.flights": "Flights",
    "booking.trains": "Trains",
    "booking.buses": "Buses",
    "booking.stays": "Stays & Hotels",
    "booking.from": "From City / Station",
    "booking.to": "To Destination",
    "booking.departure": "Departure Date",
    "booking.return": "Return Date",
    "booking.travellers": "Travellers",
    "booking.class": "Class",
    "booking.searchFlights": "Search Flights",
    "booking.searchTrains": "Search Trains",
    "booking.searchBuses": "Search Buses",
    "booking.searchStays": "Search Stays",
    "booking.bookNow": "Book Now",
    "booking.viewSeats": "View Seats",
    "booking.selectRoom": "Select Room",
    "booking.confirmed": "Booking Confirmed 🎉",
    "booking.downloadTicket": "Download Ticket",
    "planner.heading": "Personalized AI Trip Planner",
    "planner.subheading": "Enter your preferences and let our AI engine build an optimized, time-slotted itinerary.",
    "planner.whyRecommend": "Why we recommend this",
    "planner.completeTrip": "Complete My Trip Bundle",
    "planner.saveTrip": "Save to My Trips",
    "food.title": "Authentic Regional Cuisine & Eateries",
    "food.filterVeg": "Vegetarian",
    "food.filterVegan": "Vegan",
    "food.filterNonVeg": "Non-Vegetarian",
    "common.viewAll": "View All",
    "common.hiddenGem": "Hidden Gem",
    "common.verified": "Verified",
    "common.filters": "Filters",
    "common.clear": "Clear all",
    "common.searchPlaceholder": "Search destinations...",
    "common.noResults": "No results found.",
    "common.back": "Back",
    "common.share": "Share",
    "common.download": "Download",
    "common.name": "Full Name",
    "common.email": "Email Address",
    "common.message": "Your Message",
    "common.send": "Send Message",
    "home.departures": "Live Departures",
    "home.departuresSub": "Routes currently calling travelers board",
  },
  hi: {
    "brand.name": "संचारी भारत",
    "brand.subName": "भारत का अन्वेषण करें",
    "brand.tagline": "एआई-संचालित खोज → व्यक्तिगत योजना → समझदार यात्रा",
    "nav.home": "होम",
    "nav.destinations": "गंतव्य",
    "nav.experiences": "अनुभव",
    "nav.events": "उत्सव एवं मेले",
    "nav.planner": "एआई यात्रा योजनाकार",
    "nav.book": "यात्रा बुक करें",
    "nav.flights": "उड़ानें",
    "nav.trains": "ट्रेनें",
    "nav.buses": "बसें",
    "nav.stays": "होटल एवं स्टे",
    "nav.myBookings": "मेरी बुकिंग",
    "nav.savedTrips": "सहेजी गई यात्राएं",
    "nav.businesses": "स्थानीय व्यवसाय",
    "nav.travelSmart": "स्मार्ट यात्रा",
    "nav.search": "खोजें",
    "nav.signIn": "साइन इन करें",
    "nav.language": "भाषा",
    "hero.badge": "संचारी भारत · एआई-संचालित यात्रा खोज",
    "hero.title": "भारत को जानें। बेहतर योजना बनाएं। स्मार्ट यात्रा करें।",
    "hero.subtitle": "भारत भर के गंतव्यों, अनूठे अनुभवों और छिपे हुए रत्नों की खोज करें — और एआई को आपके लिए व्यक्तिगत यात्रा कार्यक्रम बनाने दें।",
    "hero.planCta": "एआई के साथ यात्रा प्लान करें",
    "hero.exploreCta": "भारत का अन्वेषण करें",
    "hero.searchPlaceholder": "गंतव्य, राज्य, उत्सव, अनुभव, उड़ानें, होटल खोजें...",
    "state.capital": "राजधानी",
    "state.livingCulture": "जीवंत संस्कृति और परंपराएं",
    "state.touristFeatures": "पर्यटक विशेषताएं और विशिष्ट अनुभव",
    "state.cuisine": "विशेष व्यंजन और लक्ज़री स्वाद",
    "state.festivals": "मुख्य राज्य उत्सव",
    "state.travelCircuits": "संस्कृत यात्रा मार्ग",
    "state.transport": "परिवहन और केंद्र",
    "state.airports": "मुख्य हवाई अड्डे:",
    "state.railway": "मुख्य रेलवे जंक्शन:",
    "state.highways": "राष्ट्रीय राजमार्ग:",
    "state.route": "मार्ग:",
    "state.planTrip": "यात्रा योजना",
    "state.trip": "बनाएँ",
    "state.states": "राज्य",
    "booking.widgetTitle": "भारत भर में यात्रा बुक करें",
    "booking.flights": "उड़ानें",
    "booking.trains": "ट्रेनें",
    "booking.buses": "बसें",
    "booking.stays": "होटल एवं स्टे",
    "booking.from": "कहाँ से",
    "booking.to": "कहाँ तक",
    "booking.departure": "प्रस्थान तिथि",
    "booking.return": "वापसी तिथि",
    "booking.travellers": "यात्री",
    "booking.class": "श्रेणी",
    "booking.searchFlights": "उड़ानें खोजें",
    "booking.searchTrains": "ट्रेनें खोजें",
    "booking.searchBuses": "बसें खोजें",
    "booking.searchStays": "होटल खोजें",
    "booking.bookNow": "अभी बुक करें",
    "booking.viewSeats": "सीटें देखें",
    "booking.selectRoom": "कमरा चुनें",
    "booking.confirmed": "बुकिंग कन्फर्म हो गई 🎉",
    "booking.downloadTicket": "टिकट डाउनलोड करें",
    "planner.heading": "व्यक्तिगत एआई यात्रा योजनाकार",
    "planner.subheading": "अपनी प्राथमिकताएं दर्ज करें और हमारा एआई इंजन अनुकूलित दैनिक कार्यक्रम तैयार करेगा।",
    "planner.whyRecommend": "हम इसकी अनुशंसा क्यों करते हैं",
    "planner.completeTrip": "मेरी पूरी यात्रा बंडल करें",
    "planner.saveTrip": "मेरी यात्राओं में सहेजें",
    "food.title": "प्रामाणिक क्षेत्रीय व्यंजन एवं भोजनालय",
    "food.filterVeg": "शाकाहारी",
    "food.filterVegan": "वीगन",
    "food.filterNonVeg": "मांसाहारी",
    "common.viewAll": "सभी देखें",
    "common.hiddenGem": "छिपा हुआ रत्न",
    "common.verified": "सत्यापित",
    "common.filters": "फ़िल्टर",
    "common.clear": "सभी हटाएं",
    "common.searchPlaceholder": "गंतव्य खोजें...",
    "common.noResults": "कोई परिणाम नहीं मिला।",
    "common.back": "वापस",
    "common.share": "साझा करें",
    "common.download": "डाउनलोड करें",
    "common.name": "पूरा नाम",
    "common.email": "ईमेल पता",
    "common.message": "आपका संदेश",
    "common.send": "संदेश भेजें",
    "home.departures": "लाइव प्रस्थान",
    "home.departuresSub": "वर्तमान में प्रस्थान करने वाले मार्ग",
  },
  te: {
    "brand.name": "సంచారి భారత్",
    "brand.subName": "భారతదేశాన్ని అన్వేషించండి",
    "brand.tagline": "AI ఆవిష్కరణ → వ్యక్తిగతీకరించిన ప్రణాళిక → తెలివైన ప్రయాణం",
    "nav.home": "హోమ్",
    "nav.destinations": "గమ్యస్థానాలు",
    "nav.experiences": "అనుభవాలు",
    "nav.events": "పండుగలు & వేడుకలు",
    "nav.planner": "AI ట్రిప్ ప్లానర్",
    "nav.book": "ప్రయాణం బుక్ చేయండి",
    "nav.flights": "విమానాలు",
    "nav.trains": "రైళ్లు",
    "nav.buses": "బస్సులు",
    "nav.stays": "హోటళ్ళు & బస",
    "nav.myBookings": "నా బుకింగ్స్",
    "nav.savedTrips": "సేవ్ చేసిన ప్రయాణాలు",
    "nav.businesses": "స్థానిక వ్యాపారాలు",
    "nav.travelSmart": "ట్రావెల్ స్మార్ట్",
    "nav.search": "శోధించండి",
    "nav.signIn": "సైన్ ఇన్",
    "nav.language": "భాష",
    "hero.badge": "సంచారి భారత్ · AI ట్రావెల్ డిస్కవరీ",
    "hero.title": "భారతాన్ని కనుగొనండి. తెలివిగా ప్లాన్ చేయండి. మెరుగ్గా ప్రయాణించండి.",
    "hero.subtitle": "భారతదేశంలోని అద్భుతమైన ప్రదేశాలు, సాంస్కృతిక అనుభవాలను అన్వేషించండి — AI మీకు తగిన ప్రయాణ ప్రణాళికను సిద్ధం చేస్తుంది.",
    "hero.planCta": "AI తో ట్రిప్ ప్లాన్ చేయండి",
    "hero.exploreCta": "భారతాన్ని అన్వేషించండి",
    "hero.searchPlaceholder": "ప్రదేశాలు, రాష్ట్రాలు, పండుగలు, విమానాలు, హోటళ్ళు శోధించండి...",
    "state.capital": "రాజధాని",
    "state.livingCulture": "జీవిత సంప్రదాయాలు & సంస్కృతి",
    "state.touristFeatures": "పర్యాటక సౌలభ్యాలు & ప్రత్యేక ప్రయాణ అనుభవాలు",
    "state.cuisine": "సంతులిత వంటకాలు & ప్రత్యేక రుచులు",
    "state.festivals": "ప్రధాన రాష్ట్ర పండుగలు",
    "state.travelCircuits": "సంస్కృత ప్రయాణ మార్గాలు",
    "state.transport": "రవాణా & కేంద్రాలు",
    "state.airports": "ప్రధాన విమానాశ్రయాలు:",
    "state.railway": "ప్రధాన రైల్వే జంక్షన్లు:",
    "state.highways": "జాతీయ రహదారులు:",
    "state.route": "మార్గం:",
    "state.planTrip": "ప్రయాణం ప్లాన్",
    "state.trip": "చేయండి",
    "state.states": "రాష్ట్రాలు",
    "booking.widgetTitle": "భారతదేశంలో ప్రయాణాన్ని బుక్ చేసుకోండి",
    "booking.flights": "విమానాలు",
    "booking.trains": "రైళ్లు",
    "booking.buses": "బస్సులు",
    "booking.stays": "హోటళ్ళు & బస",
    "booking.from": "ఎక్కడ నుండి",
    "booking.to": "ఎక్కడికి",
    "booking.departure": "ప్రయాణ తేదీ",
    "booking.return": "తిరుగు ప్రయాణ తేదీ",
    "booking.travellers": "ప్రయాణికులు",
    "booking.class": "తరగతి",
    "booking.searchFlights": "విమానాలను శోధించండి",
    "booking.searchTrains": "రైళ్లను శోధించండి",
    "booking.searchBuses": "బస్సులను శోధించండి",
    "booking.searchStays": "హోటళ్లను శోధించండి",
    "booking.bookNow": "ఇప్పుడే బుక్ చేయండి",
    "booking.viewSeats": "సీట్లను చూడండి",
    "booking.selectRoom": "గదిని ఎంచుకోండి",
    "booking.confirmed": "బుకింగ్ విజయవంతమైంది 🎉",
    "booking.downloadTicket": "టికెట్ డౌన్‌లోడ్ చేసుకోండి",
    "planner.heading": "వ్యక్తిగతీకరించిన AI ట్రిప్ ప్లానర్",
    "planner.subheading": "మీ అభిరుచులను ఎంచుకోండి, మా AI ఆప్టిమైజ్ చేసిన రోజువారీ షెడ్యూల్‌ను రూపొందిస్తుంది.",
    "planner.whyRecommend": "మేము దీన్ని ఎందుకు సిఫార్సు చేస్తున్నాము",
    "planner.completeTrip": "నా పూర్తి ట్రిప్ బండిల్",
    "planner.saveTrip": "నా ప్రయాణాలలో సేవ్ చేయండి",
    "food.title": "ప్రామాణిక ప్రాంతీయ వంటకాలు & భోజనశాలలు",
    "food.filterVeg": "శాకాహారం",
    "food.filterVegan": "వీగన్",
    "food.filterNonVeg": "మాంసాహారం",
    "common.viewAll": "అన్నీ చూడండి",
    "common.hiddenGem": "దాచిన రత్నం",
    "common.verified": "ధృవీకరించబడింది",
    "common.filters": "ఫిల్టర్లు",
    "common.clear": "అన్నీ క్లియర్ చేయండి",
    "common.searchPlaceholder": "గమ్యస్థానాలను శోధించండి...",
    "common.noResults": "ఫలితాలు లేవు.",
    "common.back": "వెనుకకు",
    "common.share": "షేర్ చేయండి",
    "common.download": "డౌన్‌లోడ్",
    "common.name": "పూర్తి పేరు",
    "common.email": "ఈమెయిల్ చిరునామా",
    "common.message": "మీ సందేశం",
    "common.send": "సందేశం పంపండి",
    "home.departures": "లైవ్ డిపార్చర్స్",
    "home.departuresSub": "ప్రయాణికుల కోసం బయలుదేరే మార్గాలు",
  },
};

// ---------------------------------------------------------------------------
// Context & Provider
// ---------------------------------------------------------------------------

interface LanguageContextType {
  language: Language;
  lang: Language;
  languageInfo: LanguageInfo;
  setLanguage: (lang: Language) => void;
  setLang: (lang: Language) => void;
  t: any;
  allLanguages: LanguageInfo[];
  isLanguageModalOpen?: boolean;
  closeLanguageModal?: () => void;
  openLanguageModal?: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  lang: "en",
  languageInfo: LANGUAGES[0] as LanguageInfo,
  setLanguage: () => {},
  setLang: () => {},
  t: (key: string) => key,
  allLanguages: LANGUAGES,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sanchari_lang") as Language | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) {
        setLanguageState(stored);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const info = getLanguageByCode(language);
    document.documentElement.lang = language;
    document.documentElement.dir = info.direction || "ltr";
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sanchari_lang", lang);
    } catch (e) {}
  }, []);

  const languageInfo = useMemo(() => {
    return getLanguageByCode(language) || (LANGUAGES[0] as LanguageInfo);
  }, [language]);

  const translateFn = useCallback(
    (key: string, fallback?: string): string => {
      const langDict = TRANSLATIONS[language];
      if (langDict && langDict[key]) {
        return langDict[key];
      }

      if (language !== "en" && language !== "hi") {
        const hiDict = TRANSLATIONS["hi"];
        if (hiDict && hiDict[key]) {
          return hiDict[key];
        }
      }

      const enDict = TRANSLATIONS["en"];
      if (enDict && enDict[key]) {
        return enDict[key];
      }

      return fallback || key;
    },
    [language]
  );

  // Backward compatible proxy for t.common.filters, t.home.departures, etc.
  const tProxy = useMemo(() => {
    const handler: ProxyHandler<any> = {
      apply(target, thisArg, argArray) {
        return translateFn(argArray[0], argArray[1]);
      },
      get(target, prop: string) {
        if (typeof prop === "string") {
          return new Proxy({}, {
            get(subTarget, subProp: string) {
              const fullKey = `${prop}.${subProp}`;
              return translateFn(fullKey, fullKey);
            }
          });
        }
        return target[prop];
      }
    };
    return new Proxy(translateFn, handler);
  }, [translateFn]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        lang: language,
        languageInfo,
        setLanguage,
        setLang: setLanguage,
        t: tProxy,
        allLanguages: LANGUAGES,
        isLanguageModalOpen: isModalOpen,
        openLanguageModal: () => setIsModalOpen(true),
        closeLanguageModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t, language, lang, languageInfo, setLanguage, setLang, allLanguages } = useContext(LanguageContext);
  return { t, language, lang, languageInfo, setLanguage, setLang, allLanguages };
}
