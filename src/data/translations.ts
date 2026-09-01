export interface LanguageTranslation {
  languageCode: string;
  langCode: string;
  languageName: string;
  name: string;
  nativeName: string;
  speechVoiceTag: string;
  voiceLang: string;
  narrativeText: string;
  content: string;
}

export type TranslatedSignificance = LanguageTranslation;

export const destinationTranslations: Record<string, LanguageTranslation[]> = {
  jaipur: [
    {
      languageCode: "en",
      langCode: "en",
      languageName: "English",
      name: "English",
      nativeName: "English",
      speechVoiceTag: "en-IN",
      voiceLang: "en-IN",
      narrativeText:
        "Welcome to Jaipur, the terracotta Pink City of Rajasthan. Founded in 1727 according to sacred Vedic architecture, this imperial capital is guarded by the soaring ramparts of Amber Fort and illuminated by the honeycomb windows of Hawa Mahal.",
      content:
        "Welcome to Jaipur, the terracotta Pink City of Rajasthan. Founded in 1727 according to sacred Vedic architecture, this imperial capital is guarded by the soaring ramparts of Amber Fort and illuminated by the honeycomb windows of Hawa Mahal.",
    },
    {
      languageCode: "hi",
      langCode: "hi",
      languageName: "Hindi",
      name: "Hindi",
      nativeName: "हिन्दी",
      speechVoiceTag: "hi-IN",
      voiceLang: "hi-IN",
      narrativeText:
        "गुलाबी नगरी जयपुर में आपका हार्दिक स्वागत है। 1727 में स्थापित यह ऐतिहासिक शहर अपने भव्य आमेर किले, हवा महल और विश्व प्रसिद्ध जंतर मंतर खगोलीय वेधशाला के लिए पूरे विश्व में विख्यात है।",
      content:
        "गुलाबी नगरी जयपुर में आपका हार्दिक स्वागत है। 1727 में स्थापित यह ऐतिहासिक शहर अपने भव्य आमेर किले, हवा महल और विश्व प्रसिद्ध जंतर मंतर खगोलीय वेधशाला के लिए पूरे विश्व में विख्यात है।",
    },
    {
      languageCode: "ta",
      langCode: "ta",
      languageName: "Tamil",
      name: "Tamil",
      nativeName: "தமிழ்",
      speechVoiceTag: "ta-IN",
      voiceLang: "ta-IN",
      narrativeText:
        "ராஜஸ்தானின் பிங்க் சிட்டி என்று அழைக்கப்படும் ஜெய்ப்பூருக்கு உங்களை அன்புடன் வரவேற்கிறோம். பிரம்மாண்டமான ஆம்பர் கோட்டை மற்றும் வரலாற்றுச் சிறப்புமிக்க அரண்மனைகள் இங்கு காணக்கிடைக்கும் அதிசயங்களாகும்.",
      content:
        "ராஜஸ்தானின் பிங்க் சிட்டி என்று அழைக்கப்படும் ஜெய்ப்பூருக்கு உங்களை அன்புடன் வரவேற்கிறோம். பிரம்மாண்டமான ஆம்பர் கோட்டை மற்றும் வரலாற்றுச் சிறப்புமிக்க அரண்மனைகள் இங்கு காணக்கிடைக்கும் அதிசயங்களாகும்.",
    },
    {
      languageCode: "bn",
      langCode: "bn",
      languageName: "Bengali",
      name: "Bengali",
      nativeName: "বাংলা",
      speechVoiceTag: "bn-IN",
      voiceLang: "bn-IN",
      narrativeText:
        "গোলাপি শহর জয়পুরে আপনাকে স্বাগত। ১৭২৭ সালে প্রতিষ্ঠিত এই ঐতিহ্যবাহী রাজকীয় নগরী তার রাজপ্রাসাদ, অম্বর দুর্গ ও স্থাপত্যশৈলীর জন্য জগৎবিখ্যাত।",
      content:
        "গোলাপি শহর জয়পুরে আপনাকে স্বাগত। ১৭২৭ সালে প্রতিষ্ঠিত এই ঐতিহ্যবাহী রাজকীয় নগরী তার রাজপ্রাসাদ, অম্বর দুর্গ ও স্থাপত্যশৈলীর জন্য জগৎবিখ্যাত।",
    },
  ],
  varanasi: [
    {
      languageCode: "en",
      langCode: "en",
      languageName: "English",
      name: "English",
      nativeName: "English",
      speechVoiceTag: "en-IN",
      voiceLang: "en-IN",
      narrativeText:
        "Varanasi, or Kashi, is the eternal city of Lord Shiva on the banks of the sacred Ganges. For over five millennia, spiritual seekers have gathered at its stone ghats at sunrise to experience the timeless rhythm of Indian philosophy and cosmic light.",
      content:
        "Varanasi, or Kashi, is the eternal city of Lord Shiva on the banks of the sacred Ganges. For over five millennia, spiritual seekers have gathered at its stone ghats at sunrise to experience the timeless rhythm of Indian philosophy and cosmic light.",
    },
    {
      languageCode: "hi",
      langCode: "hi",
      languageName: "Hindi",
      name: "Hindi",
      nativeName: "हिन्दी",
      speechVoiceTag: "hi-IN",
      voiceLang: "hi-IN",
      narrativeText:
        "मोक्षदायिनी पावन नगरी काशी (वाराणसी) में आपका स्वागत है। गंगा के 84 पवित्र घाटों पर होने वाली भव्य संध्या आरती और सुबह की अलौकिक शांति जीवन का सबसे गहरा आध्यात्मिक अनुभव प्रदान करती है।",
      content:
        "मोक्षदायिनी पावन नगरी काशी (वाराणसी) में आपका स्वागत है। गंगा के 84 पवित्र घाटों पर होने वाली भव्य संध्या आरती और सुबह की अलौकिक शांति जीवन का सबसे गहरा आध्यात्मिक अनुभव प्रदान करती है।",
    },
  ],
  alleppey: [
    {
      languageCode: "en",
      langCode: "en",
      languageName: "English",
      name: "English",
      nativeName: "English",
      speechVoiceTag: "en-IN",
      voiceLang: "en-IN",
      narrativeText:
        "Alleppey is the tranquil heart of Kerala's emerald backwaters. Drifting along Vembanad Lake on a wooden houseboat while sampling freshly prepared Malabar delicacies is the purest definition of slow travel.",
      content:
        "Alleppey is the tranquil heart of Kerala's emerald backwaters. Drifting along Vembanad Lake on a wooden houseboat while sampling freshly prepared Malabar delicacies is the purest definition of slow travel.",
    },
    {
      languageCode: "ml",
      langCode: "ml",
      languageName: "Malayalam",
      name: "Malayalam",
      nativeName: "മലയാളം",
      speechVoiceTag: "ml-IN",
      voiceLang: "ml-IN",
      narrativeText:
        "കിഴക്കിന്റെ വെനീസ് എന്നറിയപ്പെടുന്ന ആലപ്പുഴയുടെ കായൽ സൗന്ദര്യത്തിലേക്ക് സ്വാഗതം. തെങ്ങിൻതോപ്പുകളും കെട്ടുവള്ളങ്ങളും ചേരുന്ന ശാന്തമായ അനുഭവം നിങ്ങളെ കാത്തിരിക്കുന്നു.",
      content:
        "കിഴക്കിന്റെ വെനീസ് എന്നറിയപ്പെടുന്ന ആലപ്പുഴയുടെ കായൽ സൗന്ദര്യത്തിലേക്ക് സ്വാഗതം. തെങ്ങിൻതോപ്പുകളും കെട്ടുവള്ളങ്ങളും ചേരുന്ന ശാന്തമായ അനുഭവം നിങ്ങളെ കാത്തിരിക്കുന്നു.",
    },
  ],
};

