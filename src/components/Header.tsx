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
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🌾</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">FarmAssist</h1>
            <p className="text-xs text-muted-foreground">किसान सहायता केंद्र</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#schemes" className="text-sm font-medium hover:text-primary transition-colors">
            Schemes
          </a>
          <a href="#loans" className="text-sm font-medium hover:text-primary transition-colors">
            Loans
          </a>
          <a href="#subsidies" className="text-sm font-medium hover:text-primary transition-colors">
            Subsidies
          </a>
          <a href="#disease-detection" className="text-sm font-medium hover:text-primary transition-colors">
            Disease Detection
          </a>
          <a href="#support" className="text-sm font-medium hover:text-primary transition-colors">
            Voice Support
          </a>
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
                <a href="#dashboard" className="text-lg font-medium hover:text-primary transition-colors">
                  Dashboard
                </a>
                <a href="#schemes" className="text-lg font-medium hover:text-primary transition-colors">
                  Schemes
                </a>
                <a href="#loans" className="text-lg font-medium hover:text-primary transition-colors">
                  Loans
                </a>
                <a href="#subsidies" className="text-lg font-medium hover:text-primary transition-colors">
                  Subsidies
                </a>
                <a href="#disease-detection" className="text-lg font-medium hover:text-primary transition-colors">
                  Disease Detection
                </a>
                <a href="#support" className="text-lg font-medium hover:text-primary transition-colors">
                  Voice Support
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;