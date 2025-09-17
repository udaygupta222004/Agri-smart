import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Loader2, Sparkles, HelpCircle, FileText, Calculator, CheckCircle, Clock } from 'lucide-react';

interface MSPSchemesProps {
  currentLanguage: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'scheme-info' | 'calculation' | 'application-help';
}

const MSPSchemes = ({ currentLanguage }: MSPSchemesProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: 'Crop Recommendation Assistant',
      subtitle: 'Get instant help with MSP rates, government schemes, eligibility, and applications',
      placeholder: 'Ask about MSP rates, schemes, eligibility, application process...',
      send: 'Send',
      typing: 'Assistant is typing...',
      welcomeMessage: 'Hello! I\'m your MSP Schemes Assistant. I can help you with information about Minimum Support Prices, check your eligibility, calculate potential benefits, and guide you through the application process. What would you like to know?',
      quickActions: 'Quick Actions',
      checkEligibility: 'Check Eligibility',
      calculateBenefits: 'Calculate Benefits',
      applicationHelp: 'Application Help',
      viewSchemes: 'View All Schemes',
      popularTopics: 'Popular Topics',
      wheatMSP: 'Wheat MSP Rates',
      riceMSP: 'Rice MSP Rates',
      cottonMSP: 'Cotton MSP Rates',
      sugarcaneMSP: 'Sugarcane MSP Rates',
      howToApply: 'How to Apply',
      requiredDocuments: 'Required Documents',
      processingTime: 'Processing Time',
      contactSupport: 'Contact Support'
    },
    hi: {
      title: 'फसल सिफारिश सहायक',
      subtitle: 'MSP दरों, सरकारी योजनाओं, पात्रता और आवेदनों के साथ तत्काल सहायता प्राप्त करें',
      placeholder: 'MSP दरों, योजनाओं, पात्रता, आवेदन प्रक्रिया के बारे में पूछें...',
      send: 'भेजें',
      typing: 'सहायक टाइप कर रहा है...',
      welcomeMessage: 'नमस्ते! मैं आपका MSP योजना सहायक हूं। मैं न्यूनतम समर्थन मूल्य की जानकारी, आपकी पात्रता की जांच, संभावित लाभों की गणना और आवेदन प्रक्रिया में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?',
      quickActions: 'त्वरित कार्य',
      checkEligibility: 'पात्रता जांचें',
      calculateBenefits: 'लाभों की गणना करें',
      applicationHelp: 'आवेदन सहायता',
      viewSchemes: 'सभी योजनाएं देखें',
      popularTopics: 'लोकप्रिय विषय',
      wheatMSP: 'गेहूं MSP दरें',
      riceMSP: 'चावल MSP दरें',
      cottonMSP: 'कपास MSP दरें',
      sugarcaneMSP: 'गन्ना MSP दरें',
      howToApply: 'आवेदन कैसे करें',
      requiredDocuments: 'आवश्यक दस्तावेज',
      processingTime: 'प्रसंस्करण समय',
      contactSupport: 'सहायता से संपर्क करें'
    },
    te: {
      title: 'పంట సిఫార్సు సహాయకుడు',
      subtitle: 'MSP రేట్లు, ప్రభుత్వ పథకాలు, అర్హత మరియు దరఖాస్తులతో తక్షణ సహాయం పొందండి',
      placeholder: 'MSP రేట్లు, పథకాలు, అర్హత, దరఖాస్తు ప్రక్రియ గురించి అడగండి...',
      send: 'పంపండి',
      typing: 'సహాయకుడు టైప్ చేస్తున్నాడు...',
      welcomeMessage: 'హలో! నేను మీ MSP పథకాల సహాయకుడిని. కనీస మద్దతు ధరల సమాచారం, మీ అర్హత తనిఖీ, సంభావ్య ప్రయోజనాల లెక్కింపు మరియు దరఖాస్తు ప్రక్రియలో మీకు సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
      quickActions: 'త్వరిత చర్యలు',
      checkEligibility: 'అర్హత తనిఖీ చేయండి',
      calculateBenefits: 'ప్రయోజనాలను లెక్కించండి',
      applicationHelp: 'దరఖాస్తు సహాయం',
      viewSchemes: 'అన్ని పథకాలు చూడండి',
      popularTopics: 'ప్రసిద్ధ అంశాలు',
      wheatMSP: 'గోధుమ MSP రేట్లు',
      riceMSP: 'వరి MSP రేట్లు',
      cottonMSP: 'పత్తి MSP రేట్లు',
      sugarcaneMSP: 'చెరకు MSP రేట్లు',
      howToApply: 'ఎలా దరఖాస్తు చేసుకోవాలి',
      requiredDocuments: 'అవసరమైన పత్రాలు',
      processingTime: 'ప్రాసెసింగ్ సమయం',
      contactSupport: 'మద్దతును సంప్రదించండి'
    },
    ta: {
      title: 'பயிர் பரிந்துரை உதவியாளர்',
      subtitle: 'MSP விகிதங்கள், அரசு திட்டங்கள், தகுதி மற்றும் விண்ணப்பங்களுடன் உடனடி உதவி பெறுங்கள்',
      placeholder: 'MSP விகிதங்கள், திட்டங்கள், தகுதி, விண்ணப்ப செயல்முறை பற்றி கேளுங்கள்...',
      send: 'அனுப்பு',
      typing: 'உதவியாளர் தட்டச்சு செய்கிறார்...',
      welcomeMessage: 'வணக்கம்! நான் உங்கள் MSP திட்ட உதவியாளர். குறைந்தபட்ச ஆதரவு விலைகள் பற்றிய தகவல்கள், உங்கள் தகுதியை சரிபார்த்தல், சாத்தியமான பலன்களைக் கணக்கிடுதல் மற்றும் விண்ணப்ப செயல்முறையில் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?',
      quickActions: 'விரைவு செயல்கள்',
      checkEligibility: 'தகுதியை சரிபார்க்கவும்',
      calculateBenefits: 'பலன்களைக் கணக்கிடுங்கள்',
      applicationHelp: 'விண்ணப்ப உதவி',
      viewSchemes: 'அனைத்து திட்டங்களையும் பார்க்கவும்',
      popularTopics: 'பிரபலமான தலைப்புகள்',
      wheatMSP: 'கோதுமை MSP விகிதங்கள்',
      riceMSP: 'அரிசி MSP விகிதங்கள்',
      cottonMSP: 'பருத்தி MSP விகிதங்கள்',
      sugarcaneMSP: 'கரும்பு MSP விகிதங்கள்',
      howToApply: 'எப்படி விண்ணப்பிக்க வேண்டும்',
      requiredDocuments: 'தேவையான ஆவணங்கள்',
      processingTime: 'செயலாக்க நேரம்',
      contactSupport: 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்'
    },
    ml: {
      title: 'വിള ശുപാർശ സഹായി',
      subtitle: 'MSP നിരക്കുകൾ, സർക്കാർ പദ്ധതികൾ, യോഗ്യത, അപേക്ഷകൾ എന്നിവയിൽ തൽക്ഷണ സഹായം നേടുക',
      placeholder: 'MSP നിരക്കുകൾ, പദ്ധതികൾ, യോഗ്യത, അപേക്ഷാ പ്രക്രിയ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...',
      send: 'അയയ്ക്കുക',
      typing: 'സഹായി ടൈപ്പ് ചെയ്യുന്നു...',
      welcomeMessage: 'ഹലോ! ഞാൻ നിങ്ങളുടെ MSP പദ്ധതി സഹായിയാണ്. ഏറ്റവും കുറഞ്ഞ പിന്തുണ വിലകളെക്കുറിച്ചുള്ള വിവരങ്ങൾ, നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കൽ, സാധ്യതയുള്ള നേട്ടങ്ങൾ കണക്കാക്കൽ, അപേക്ഷാ പ്രക്രിയയിൽ നിങ്ങളെ സഹായിക്കാൻ എനിക്ക് കഴിയും. നിങ്ങൾ എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?',
      quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
      checkEligibility: 'യോഗ്യത പരിശോധിക്കുക',
      calculateBenefits: 'നേട്ടങ്ങൾ കണക്കാക്കുക',
      applicationHelp: 'അപേക്ഷാ സഹായം',
      viewSchemes: 'എല്ലാ പദ്ധതികളും കാണുക',
      popularTopics: 'ജനപ്രിയ വിഷയങ്ങൾ',
      wheatMSP: 'ഗോതമ്പ് MSP നിരക്കുകൾ',
      riceMSP: 'അരി MSP നിരക്കുകൾ',
      cottonMSP: 'പരുത്തി MSP നിരക്കുകൾ',
      sugarcaneMSP: 'കരിമ്പ് MSP നിരക്കുകൾ',
      howToApply: 'എങ്ങനെ അപേക്ഷിക്കാം',
      requiredDocuments: 'ആവശ്യമായ രേഖകൾ',
      processingTime: 'പ്രോസസ്സിംഗ് സമയം',
      contactSupport: 'സപ്പോർട്ടുമായി ബന്ധപ്പെടുക'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const quickActionButtons = [
    { icon: CheckCircle, text: t.checkEligibility, action: 'eligibility' },
    { icon: Calculator, text: t.calculateBenefits, action: 'calculate' },
    { icon: FileText, text: t.applicationHelp, action: 'application' },
    { icon: MessageSquare, text: t.viewSchemes, action: 'schemes' }
  ];

  const popularTopics = [
    { icon: '🌾', text: t.wheatMSP, query: 'wheat MSP rates information' },
    { icon: '🍚', text: t.riceMSP, query: 'rice MSP rates details' },
    { icon: '🌿', text: t.cottonMSP, query: 'cotton MSP scheme' },
    { icon: '🎋', text: t.sugarcaneMSP, query: 'sugarcane MSP program' }
  ];

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: t.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [t.welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('wheat') || message.includes('गेहूं') || message.includes('గోధుమ') || message.includes('கோதுமை') || message.includes('ഗോതമ്പ്')) {
      return currentLanguage === 'hi' 
        ? 'गेहूं का वर्तमान MSP ₹2,275 प्रति क्विंटल है (रबी 2024-25)। यह केंद्र सरकार द्वारा निर्धारित किया गया है। आप अपने नजदीकी खरीद केंद्र पर अपनी फसल बेच सकते हैं।'
        : currentLanguage === 'te'
        ? 'గోధుమ ప్రస్తుత MSP ₹2,275 ప్రति క్వింటల్ (రబీ 2024-25). ఇది కేంద్ర ప్రభుత్వంచే నిర్ణయించబడింది। మీరు మీ సమీప కొనుగోలు కేంద్రంలో మీ పంటను అమ్మవచ్చు.'
        : currentLanguage === 'ta'
        ? 'கோதுமையின் தற்போதைய MSP ₹2,275 ஒரு குவிண்டலுக்கு (ரபி 2024-25). இது மத்திய அரசால் நிர்ணயிக்கப்பட்டது. உங்கள் அருகிலுள்ள கொள்முதல் மையத்தில் உங்கள் பயிரை விற்கலாம்.'
        : currentLanguage === 'ml'
        ? 'ഗോതമ്പിന്റെ നിലവിലെ MSP ₹2,275 ഒരു ക്വിന്റലിന് (രബി 2024-25). ഇത് കേന്ദ്ര സർക്കാർ നിശ്ചയിച്ചതാണ്. നിങ്ങളുടെ അടുത്തുള്ള വാങ്ങൽ കേന്ദ്രത്തിൽ നിങ്ങളുടെ വിള വിൽക്കാം.'
        : 'The current MSP for wheat is ₹2,275 per quintal (Rabi 2024-25). This is set by the central government. You can sell your crop at the nearest procurement center.';
    }
    
    if (message.includes('rice') || message.includes('चावल') || message.includes('వరి') || message.includes('அரிசி') || message.includes('അരി')) {
      return currentLanguage === 'hi'
        ? 'सामान्य चावल का वर्तमान MSP ₹2,300 प्रति क्विंटल है (खरीफ 2024)। ग्रेड A चावल के लिए यह ₹2,320 प्रति क्विंटल है।'
        : currentLanguage === 'te'
        ? 'సాధారణ వరి ప్రస్తుత MSP ₹2,300 ప్రति క్వింటల్ (ఖరీఫ్ 2024). గ్రేడ్ A వరికి ఇది ₹2,320 ప్రति క్వింటల్.'
        : currentLanguage === 'ta'
        ? 'பொதுவான அரிசியின் தற்போதைய MSP ₹2,300 ஒரு குவிண்டலுக்கு (கரீப் 2024). கிரேட் A அரிசிக்கு இது ₹2,320 ஒரு குவிண்டலுக்கு.'
        : currentLanguage === 'ml'
        ? 'സാധാരണ അരിയുടെ നിലവിലെ MSP ₹2,300 ഒരു ക്വിന്റലിന് (ഖരീഫ് 2024). ഗ്രേഡ് A അരിക്ക് ഇത് ₹2,320 ഒരു ക്വിന്റലിന്.'
        : 'The current MSP for common rice is ₹2,300 per quintal (Kharif 2024). For Grade A rice, it is ₹2,320 per quintal.';
    }
    
    if (message.includes('eligibility') || message.includes('पात्रता') || message.includes('అర్హత') || message.includes('தகுதி') || message.includes('യോഗ്യത')) {
      return currentLanguage === 'hi'
        ? 'MSP योजना के लिए पात्रता: 1) भूमि स्वामी किसान 2) पट्टेदार किसान 3) मौखिक पट्टेदार। आपके पास वैध भूमि दस्तावेज या पट्टा समझौता होना चाहिए।'
        : currentLanguage === 'te'
        ? 'MSP పథకానికి అర్హత: 1) భూమి యజమాని రైతులు 2) లీజుదారు రైతులు 3) మౌఖిక లీజుదారులు. మీ వద్ద చెల్లుబాటు అయ్యే భూమి పత్రాలు లేదా లీజు ఒప్పందం ఉండాలి.'
        : currentLanguage === 'ta'
        ? 'MSP திட்டத்திற்கான தகுதி: 1) நில உரிமையாளர் விவசாயிகள் 2) குத்தகைதார விவசாயிகள் 3) வாய்மொழி குத்தகைதாரர்கள். உங்களிடம் செல்லுபடியாகும் நில ஆவணங்கள் அல்லது குத்தகை ஒப்பந்தம் இருக்க வேண்டும்.'
        : currentLanguage === 'ml'
        ? 'MSP പദ്ധതിക്കുള്ള യോഗ്യത: 1) ഭൂമി ഉടമസ്ഥ കർഷകർ 2) പാട്ടക്കാർ കർഷകർ 3) വാക്കാലുള്ള പാട്ടക്കാർ. നിങ്ങളുടെ പക്കൽ സാധുവായ ഭൂമി രേഖകൾ അല്ലെങ്കിൽ പാട്ട കരാർ ഉണ്ടായിരിക്കണം.'
        : 'Eligibility for MSP scheme: 1) Landowner farmers 2) Tenant farmers 3) Oral lessees. You must have valid land documents or lease agreement.';
    }
    
    if (message.includes('apply') || message.includes('आवेदन') || message.includes('దరఖాస్తు') || message.includes('விண்ணப்பம்') || message.includes('അപേക്ഷ')) {
      return currentLanguage === 'hi'
        ? 'MSP के तहत बेचने के लिए: 1) अपने नजदीकी खरीद केंद्र पर जाएं 2) आधार कार्ड और भूमि दस्तावेज लेकर जाएं 3) फसल की गुणवत्ता जांच कराएं 4) भुगतान 72 घंटों में मिलेगा।'
        : currentLanguage === 'te'
        ? 'MSP కింద అమ్మడానికి: 1) మీ సమీప కొనుగోలు కేంద్రానికి వెళ్లండి 2) ఆధార్ కార్డ్ మరియు భూమి పత్రాలను తీసుకెళ్లండి 3) పంట నాణ్యత తనిఖీ చేయించండి 4) చెల్లింపు 72 గంటల్లో వస్తుంది.'
        : currentLanguage === 'ta'
        ? 'MSP கீழ் விற்க: 1) உங்கள் அருகிலுள்ள கொள்முதல் மையத்திற்கு செல்லுங்கள் 2) ஆதார் அட்டை மற்றும் நில ஆவணங்களை எடுத்துச் செல்லுங்கள் 3) பயிர் தர சோதனை செய்யுங்கள் 4) பணம் 72 மணி நேரத்தில் கிடைக்கும்.'
        : currentLanguage === 'ml'
        ? 'MSP കീഴിൽ വിൽക്കാൻ: 1) നിങ്ങളുടെ അടുത്തുള്ള വാങ്ങൽ കേന്ദ്രത്തിൽ പോകുക 2) ആധാർ കാർഡും ഭൂമി രേഖകളും കൊണ്ടുപോകുക 3) വിള ഗുണനിലവാര പരിശോധന നടത്തുക 4) പണം 72 മണിക്കൂറിനുള്ളിൽ കിട്ടും.'
        : 'To sell under MSP: 1) Visit your nearest procurement center 2) Bring Aadhaar card and land documents 3) Get crop quality checked 4) Payment within 72 hours.';
    }
    
    // Default response
    return currentLanguage === 'hi'
      ? 'मैं MSP योजनाओं के बारे में जानकारी प्रदान कर सकता हूं। आप मुझसे MSP दरों, पात्रता, आवेदन प्रक्रिया, या खरीद केंद्रों के बारे में पूछ सकते हैं।'
      : currentLanguage === 'te'
      ? 'నేను MSP పథకాల గురించి సమాచారం అందించగలను. MSP రేట్లు, అర్హత, దరఖాస్తు ప్రక్రియ లేదా కొనుగోలు కేంద్రాల గురించి మీరు నన్ను అడగవచ్చు.'
      : currentLanguage === 'ta'
      ? 'நான் MSP திட்டங்கள் பற்றிய தகவல்களை வழங்க முடியும். MSP விகிதங்கள், தகுதி, விண்ணப்ப செயல்முறை அல்லது கொள்முதல் மையங்கள் பற்றி என்னிடம் கேட்கலாம்.'
      : currentLanguage === 'ml'
      ? 'എനിക്ക് MSP പദ്ധതികളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകാൻ കഴിയും. MSP നിരക്കുകൾ, യോഗ്യത, അപേക്ഷാ പ്രക്രിയ അല്ലെങ്കിൽ വാങ്ങൽ കേന്ദ്രങ്ങളെക്കുറിച്ച് നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം.'
      : 'I can provide information about MSP schemes. You can ask me about MSP rates, eligibility, application process, or procurement centers.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'eligibility':
        message = 'I want to check my eligibility for MSP schemes';
        break;
      case 'calculate':
        message = 'Help me calculate MSP benefits';
        break;
      case 'application':
        message = 'How do I apply for MSP schemes?';
        break;
      case 'schemes':
        message = 'Show me all available MSP schemes';
        break;
    }
    setInputMessage(message);
  };

  const handlePopularTopic = (query: string) => {
    setInputMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5" id="schemes">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              {quickActionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(button.action)}
                  className="flex items-center gap-2 bg-background/80 hover:bg-primary/10"
                >
                  <button.icon className="w-4 h-4" />
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Popular Topics */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {t.popularTopics}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {popularTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePopularTopic(topic.query)}
                    className="w-full justify-start text-left h-auto p-3 hover:bg-primary/5"
                  >
                    <span className="text-lg mr-2">{topic.icon}</span>
                    <span className="text-sm">{topic.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Help Topics */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  Help Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { icon: FileText, text: t.howToApply },
                  { icon: CheckCircle, text: t.requiredDocuments },
                  { icon: Clock, text: t.processingTime },
                  { icon: MessageSquare, text: t.contactSupport }
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePopularTopic(item.text)}
                    className="w-full justify-start text-left h-auto p-3 hover:bg-accent/5"
                  >
                    <item.icon className="w-4 h-4 mr-2 text-accent" />
                    <span className="text-sm">{item.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Crop Recommendation Assistant</CardTitle>
                    <CardDescription>AI-powered crop recommendations and MSP guidance</CardDescription>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      Online
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted border'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {message.sender === 'bot' && (
                              <Bot className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                            )}
                            {message.sender === 'user' && (
                              <User className="w-5 h-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                {message.text}
                              </div>
                              <div className="text-xs opacity-70 mt-2">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted border p-4 rounded-lg max-w-[80%]">
                          <div className="flex items-center gap-3">
                            <Bot className="w-5 h-5 text-primary" />
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-muted-foreground">{t.typing}</div>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="sm"
                    className="px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send • AI-powered responses
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSPSchemes;