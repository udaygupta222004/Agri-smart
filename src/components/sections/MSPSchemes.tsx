import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Calendar, MapPin, DollarSign } from 'lucide-react';

interface MSPData {
  crop: string;
  centralMSP: number;
  stateMSP?: number;
  season: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  state: string;
}

const mockMSPData: MSPData[] = [
  {
    crop: 'Wheat',
    centralMSP: 2275,
    stateMSP: 2300,
    season: 'Rabi 2024-25',
    lastUpdated: '2024-10-15',
    trend: 'up',
    state: 'Punjab'
  },
  {
    crop: 'Rice (Common)',
    centralMSP: 2300,
    stateMSP: 2350,
    season: 'Kharif 2024',
    lastUpdated: '2024-09-20',
    trend: 'up',
    state: 'Punjab'
  },
  {
    crop: 'Cotton',
    centralMSP: 7020,
    season: 'Kharif 2024',
    lastUpdated: '2024-09-15',
    trend: 'stable',
    state: 'Gujarat'
  },
  {
    crop: 'Sugarcane',
    centralMSP: 340,
    stateMSP: 380,
    season: '2024-25',
    lastUpdated: '2024-10-01',
    trend: 'up',
    state: 'Uttar Pradesh'
  }
];

const MSPSchemes = () => {
  return (
    <div className="space-y-6" id="schemes">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Minimum Support Price (MSP)</h2>
        <p className="text-muted-foreground">
          Latest MSP rates for major crops - Central and State government support prices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {mockMSPData.map((msp, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{msp.crop}</CardTitle>
                <Badge variant={msp.trend === 'up' ? 'default' : msp.trend === 'down' ? 'destructive' : 'secondary'}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${msp.trend === 'down' ? 'rotate-180' : ''}`} />
                  {msp.trend}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {msp.state} • {msp.season}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-medium">Central MSP</span>
                  </div>
                  <span className="text-lg font-bold text-primary">₹{msp.centralMSP}/quintal</span>
                </div>
                
                {msp.stateMSP && (
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      <span className="font-medium">State MSP</span>
                    </div>
                    <span className="text-lg font-bold text-secondary">₹{msp.stateMSP}/quintal</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated: {new Date(msp.lastUpdated).toLocaleDateString('en-IN')}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Purchase Centers
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow">
          View All MSP Rates
        </Button>
      </div>
    </div>
  );
};

export default MSPSchemes;