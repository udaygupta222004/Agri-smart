import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ currentLanguage, onLanguageChange, activeSection, onSectionChange }: HeaderProps) => {
  // Language translations
  const translations = {
    en: {
      dashboard: 'Dashboard',
      schemes: 'Schemes', 
      loans: 'Loans',
      subsidies: 'Subsidies',
      diseaseDetection: 'Disease Detection',
      voiceSupport: 'Voice Support',
      title: 'Krishi Jyoti',
      subtitle: 'किसान सहायता केंद्र'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      schemes: 'योजनाएं',
      loans: 'ऋण',
      subsidies: 'सब्सिडी',
      diseaseDetection: 'रोग पहचान',
      voiceSupport: 'आवाज़ सहायता',
      title: 'Krishi Jyoti',
      subtitle: 'किसान सहायता केंद्र'
    },
    te: {
      dashboard: 'డాష్‌బోర్డ్',
      schemes: 'పథకాలు',
      loans: 'రుణాలు', 
      subsidies: 'సబ్సిడీలు',
      diseaseDetection: 'వ్యాధి గుర్తింపు',
      voiceSupport: 'వాయిస్ సపోర్ట్',
      title: 'Krishi Jyoti',
      subtitle: 'రైతు సహాయ కేంద్రం'
    },
    ta: {
      dashboard: 'கட்டுப்பாட்டு பலகை',
      schemes: 'திட்டங்கள்',
      loans: 'கடன்கள்',
      subsidies: 'மானியங்கள்',
      diseaseDetection: 'நோய் கண்டறிதல்',
      voiceSupport: 'குரல் ஆதரவு',
      title: 'Krishi Jyoti',
      subtitle: 'விவசாயி உதவி மையம்'
    },
    ml: {
      dashboard: 'ഡാഷ്ബോർഡ്',
      schemes: 'പദ്ധതികൾ',
      loans: 'വായ്പകൾ',
      subsidies: 'സബ്സിഡികൾ', 
      diseaseDetection: 'രോഗ കണ്ടെത്തൽ',
      voiceSupport: 'വോയ്സ് സപ്പോർട്ട്',
      title: 'Krishi Jyoti',
      subtitle: 'കർഷക സഹായ കേന്ദ്രം'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🌾</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">{t.title}</h1>
            <p className="text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('dashboard')}
            className={`text-sm font-medium transition-colors ${activeSection === 'dashboard' ? 'text-primary' : ''}`}
          >
            {t.dashboard}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('schemes')}
            className={`text-sm font-medium transition-colors ${activeSection === 'schemes' ? 'text-primary' : ''}`}
          >
            {t.schemes}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('loans')}
            className={`text-sm font-medium transition-colors ${activeSection === 'loans' ? 'text-primary' : ''}`}
          >
            {t.loans}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('subsidies')}
            className={`text-sm font-medium transition-colors ${activeSection === 'subsidies' ? 'text-primary' : ''}`}
          >
            {t.subsidies}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('disease-detection')}
            className={`text-sm font-medium transition-colors ${activeSection === 'disease-detection' ? 'text-primary' : ''}`}
          >
            {t.diseaseDetection}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onSectionChange('support')}
            className={`text-sm font-medium transition-colors ${activeSection === 'support' ? 'text-primary' : ''}`}
          >
            {t.voiceSupport}
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="ml">മലയാളം</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('dashboard')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'dashboard' ? 'text-primary' : ''}`}
                >
                  {t.dashboard}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('schemes')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'schemes' ? 'text-primary' : ''}`}
                >
                  {t.schemes}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('loans')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'loans' ? 'text-primary' : ''}`}
                >
                  {t.loans}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('subsidies')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'subsidies' ? 'text-primary' : ''}`}
                >
                  {t.subsidies}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('disease-detection')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'disease-detection' ? 'text-primary' : ''}`}
                >
                  {t.diseaseDetection}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onSectionChange('support')}
                  className={`text-lg font-medium justify-start transition-colors ${activeSection === 'support' ? 'text-primary' : ''}`}
                >
                  {t.voiceSupport}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;