import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Calendar, Users, Target, ArrowRight, CheckCircle } from 'lucide-react';

interface SubsidyScheme {
  name: string;
  description: string;
  subsidyPercent: number;
  maxAmount: string;
  eligibility: string[];
  documents: string[];
  deadline?: string;
  beneficiaries: number;
  category: 'pesticide' | 'fertilizer' | 'seeds' | 'equipment' | 'irrigation';
  status: 'active' | 'closing-soon' | 'upcoming';
}

const subsidySchemes: SubsidyScheme[] = [
  {
    name: 'Pesticide Subsidy Scheme',
    description: 'Financial assistance for purchasing organic and bio-pesticides to promote sustainable farming',
    subsidyPercent: 50,
    maxAmount: '₹10,000',
    eligibility: ['Small & Marginal farmers', 'Certified organic farmers', 'FPO members'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Details', 'Previous purchase bills'],
    deadline: '2024-12-31',
    beneficiaries: 2456,
    category: 'pesticide',
    status: 'active'
  },
  {
    name: 'Organic Fertilizer Promotion',
    description: 'Subsidy on vermicompost, organic fertilizers, and bio-fertilizers',
    subsidyPercent: 75,
    maxAmount: '₹15,000',
    eligibility: ['All category farmers', 'Organic certification holders'],
    documents: ['Farmer ID', 'Soil health card', 'Purchase receipts'],
    deadline: '2025-01-15',
    beneficiaries: 3241,
    category: 'fertilizer',
    status: 'active'
  },
  {
    name: 'Quality Seed Distribution',
    description: 'Subsidized high-yielding variety seeds and hybrid seeds for better productivity',
    subsidyPercent: 85,
    maxAmount: '₹5,000',
    eligibility: ['BPL farmers', 'Women farmers', 'SC/ST farmers'],
    documents: ['BPL Card', 'Caste certificate (if applicable)', 'Land documents'],
    beneficiaries: 5678,
    category: 'seeds',
    status: 'closing-soon'
  },
  {
    name: 'Drip Irrigation Subsidy',
    description: 'Financial support for installing micro-irrigation systems to promote water conservation',
    subsidyPercent: 55,
    maxAmount: '₹50,000',
    eligibility: ['Farmers with >1 acre land', 'Water availability certificate'],
    documents: ['Land records', 'Water source proof', 'Technical approval'],
    deadline: '2024-11-30',
    beneficiaries: 1892,
    category: 'irrigation',
    status: 'closing-soon'
  }
];

const categoryIcons = {
  pesticide: '🌿',
  fertilizer: '🧪', 
  seeds: '🌱',
  equipment: '🚜',
  irrigation: '💧'
};

const categoryColors = {
  pesticide: 'bg-primary/10 text-primary',
  fertilizer: 'bg-secondary/10 text-secondary',
  seeds: 'bg-success/10 text-success',
  equipment: 'bg-accent/10 text-accent',
  irrigation: 'bg-primary/10 text-primary'
};

const statusColors = {
  active: 'bg-success/10 text-success',
  'closing-soon': 'bg-warning/10 text-warning',
  upcoming: 'bg-accent/10 text-accent'
};

const Subsidies = () => {
  const calculateDaysLeft = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6" id="subsidies">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Government Subsidies</h2>
        <p className="text-muted-foreground">
          Access financial assistance for pesticides, fertilizers, seeds, and farming equipment
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Schemes', value: '12', color: 'text-success' },
          { label: 'Total Beneficiaries', value: '13.2K', color: 'text-primary' },
          { label: 'Avg Subsidy', value: '60%', color: 'text-accent' },
          { label: 'Amount Disbursed', value: '₹2.4Cr', color: 'text-secondary' }
        ].map((stat, index) => (
          <Card key={index} className="text-center p-4">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subsidySchemes.map((scheme, index) => {
          const daysLeft = calculateDaysLeft(scheme.deadline);
          
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryIcons[scheme.category]}</span>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {scheme.name}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={categoryColors[scheme.category]} variant="secondary">
                        {scheme.category}
                      </Badge>
                      <Badge className={statusColors[scheme.status]} variant="secondary">
                        {scheme.status === 'closing-soon' ? 'Closing Soon' : scheme.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="leading-relaxed">
                  {scheme.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Subsidy Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{scheme.subsidyPercent}%</div>
                    <div className="text-sm text-muted-foreground">Subsidy Rate</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/5 rounded-lg">
                    <div className="text-lg font-bold text-secondary">{scheme.maxAmount}</div>
                    <div className="text-sm text-muted-foreground">Max Amount</div>
                  </div>
                </div>

                {/* Progress and Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Beneficiaries
                    </span>
                    <span className="text-sm font-bold">{scheme.beneficiaries.toLocaleString()}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                {/* Deadline */}
                {scheme.deadline && (
                  <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-warning" />
                      <span className="font-medium">Application Deadline</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-warning">
                        {daysLeft && daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(scheme.deadline).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                )}

                {/* Eligibility */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    Eligibility Criteria
                  </h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                    {scheme.eligibility.length > 2 && (
                      <li className="text-sm text-accent">
                        +{scheme.eligibility.length - 2} more criteria
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
                    disabled={scheme.status === 'upcoming'}
                  >
                    {scheme.status === 'upcoming' ? 'Coming Soon' : 'Apply Now'}
                    {scheme.status !== 'upcoming' && <ArrowRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
        <h3 className="text-xl font-bold">Need Help with Applications?</h3>
        <p className="text-muted-foreground">
          Our field officers are available to assist you with subsidy applications and documentation
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="hero" size="lg">
            <Gift className="w-4 h-4 mr-2" />
            Get Application Help
          </Button>
          <Button variant="outline" size="lg">
            Download Forms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subsidies;