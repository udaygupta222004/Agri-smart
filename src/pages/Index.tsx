import { useState } from 'react';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';
import MSPSchemes from '@/components/sections/MSPSchemes';
import LoanSchemes from '@/components/sections/LoanSchemes';
import Subsidies from '@/components/sections/Subsidies';
import DiseaseDetection from '@/components/sections/DiseaseDetection';
import VoiceSupport from '@/components/sections/VoiceSupport';
import ClimateSupport from '@/components/sections/ClimateSupport';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Wheat,
  Banknote,
  Gift,
  CloudSun,
  Stethoscope,
  Mic,
  TrendingUp,
  Users,
  Target,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('dashboard');

  const dashboardCards = [
    {
      title: 'MSP Schemes',
      description: 'Check latest Minimum Support Prices for your crops from central and state governments',
      icon: Wheat,
      buttonText: 'View MSP Rates',
      onClick: () => setActiveSection('schemes'),
      variant: 'primary' as const
    },
    {
      title: 'Government Loans',
      description: 'Access affordable credit facilities for farming operations and equipment purchase',
      icon: Banknote,
      buttonText: 'Explore Loans',
      onClick: () => setActiveSection('loans'),
      variant: 'secondary' as const
    },
    {
      title: 'Subsidies',
      description: 'Get financial assistance for pesticides, fertilizers, seeds, and farming equipment',
      icon: Gift,
      buttonText: 'View Subsidies',
      onClick: () => setActiveSection('subsidies'),
      variant: 'accent' as const
    },
    {
      title: 'Climate Support',
      description: 'Weather predictions and climate-based farming recommendations for better yields',
      icon: CloudSun,
      buttonText: 'Get Weather Info',
      onClick: () => setActiveSection('climate'),
      variant: 'default' as const
    },
    {
      title: 'Disease Detection',
      description: 'Upload plant photos for instant AI-powered disease diagnosis and treatment advice',
      icon: Stethoscope,
      buttonText: 'Scan Plant',
      onClick: () => setActiveSection('disease-detection'),
      variant: 'primary' as const
    },
    {
      title: 'Voice Support',
      description: 'Get farming advice in Hindi, English, and regional languages through voice interaction',
      icon: Mic,
      buttonText: 'Start Voice Chat',
      onClick: () => setActiveSection('support'),
      variant: 'accent' as const
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'schemes':
        return <MSPSchemes currentLanguage={currentLanguage} />;
      case 'loans':
        return <LoanSchemes currentLanguage={currentLanguage} />;
      case 'subsidies':
        return <Subsidies currentLanguage={currentLanguage} />;
      case 'climate':
        return <ClimateSupport currentLanguage={currentLanguage} />;
      case 'disease-detection':
        return <DiseaseDetection currentLanguage={currentLanguage} />;
      case 'support':
        return <VoiceSupport currentLanguage={currentLanguage} />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="container mx-auto px-4 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    FarmAssist
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                    किसान सहायता केंद्र - Your Complete Digital Farming Solution
                  </p>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Access government schemes, get instant crop disease diagnosis, receive weather predictions, 
                    and interact with AI-powered voice support - all in your local language.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" variant="hero" className="min-w-48">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="min-w-48">
                    Watch Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  {[
                    { icon: Users, value: '50,000+', label: 'Farmers Served' },
                    { icon: TrendingUp, value: '₹2.5Cr', label: 'Subsidies Claimed' },
                    { icon: Target, value: '95%', label: 'Disease Detection Accuracy' },
                    { icon: Mic, value: '12', label: 'Languages Supported' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center space-y-2">
                      <stat.icon className="w-8 h-8 mx-auto text-primary" />
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Separator />

            {/* Dashboard Cards */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="text-3xl font-bold text-primary">
                    Complete Farming Solutions
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Everything you need for modern, profitable farming - from government schemes to AI-powered assistance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardCards.map((card, index) => (
                    <DashboardCard
                      key={index}
                      {...card}
                    />
                  ))}
                </div>
              </div>
            </section>

            <Separator />

            {/* Features Highlight */}
            <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
              <div className="container mx-auto px-4 text-center space-y-8">
                <h2 className="text-3xl font-bold text-primary">Why Choose FarmAssist?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Multi-Language Support',
                      description: 'Available in Hindi, English, Telugu, Tamil, Malayalam, and more regional languages',
                      icon: '🌍'
                    },
                    {
                      title: 'AI-Powered Insights',
                      description: 'Advanced machine learning for disease detection and crop recommendations',
                      icon: '🤖'
                    },
                    {
                      title: 'Real-time Data',
                      description: 'Live weather updates, MSP rates, and government scheme notifications',
                      icon: '⚡'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="space-y-4 p-6">
                      <div className="text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="pb-16">
        {activeSection !== 'dashboard' && (
          <div className="container mx-auto px-4 py-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection('dashboard')}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
        )}
        
        <div className="container mx-auto px-4">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 FarmAssist - Government of India Initiative</p>
          <p className="text-sm mt-2">Empowering farmers with technology and government support</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
