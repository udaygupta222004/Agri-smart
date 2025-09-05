import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Banknote, Percent, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface LoanScheme {
  name: string;
  description: string;
  maxAmount: string;
  interestRate: string;
  tenure: string;
  eligibility: string[];
  status: 'available' | 'limited' | 'seasonal';
  category: 'crop' | 'equipment' | 'infrastructure' | 'emergency';
}

const loanSchemes: LoanScheme[] = [
  {
    name: 'Kisan Credit Card (KCC)',
    description: 'Flexible credit facility for crop production and allied activities',
    maxAmount: '₹3 Lakh',
    interestRate: '7% (Subsidized)',
    tenure: '5 Years',
    eligibility: ['Landowner farmers', 'Tenant farmers', 'Oral lessees'],
    status: 'available',
    category: 'crop'
  },
  {
    name: 'PM-KISAN Tractor Loan',
    description: 'Subsidized loans for purchasing agricultural machinery and equipment',
    maxAmount: '₹10 Lakh',
    interestRate: '8.5%',
    tenure: '7 Years',
    eligibility: ['Small & Marginal farmers', 'Valid land documents required'],
    status: 'available',
    category: 'equipment'
  },
  {
    name: 'Crop Insurance Loan',
    description: 'Emergency financial support for crop loss due to natural calamities',
    maxAmount: '₹5 Lakh',
    interestRate: '6% (Emergency)',
    tenure: '3 Years',
    eligibility: ['Insured crop farmers', 'Documented crop loss'],
    status: 'seasonal',
    category: 'emergency'
  },
  {
    name: 'Warehouse Infrastructure Loan',
    description: 'Funding for building storage and post-harvest infrastructure',
    maxAmount: '₹25 Lakh',
    interestRate: '9%',
    tenure: '10 Years',
    eligibility: ['FPOs', 'Individual farmers with >5 acres'],
    status: 'limited',
    category: 'infrastructure'
  }
];

const categoryColors = {
  crop: 'bg-primary/10 text-primary',
  equipment: 'bg-secondary/10 text-secondary',
  infrastructure: 'bg-accent/10 text-accent',
  emergency: 'bg-destructive/10 text-destructive'
};

const statusColors = {
  available: 'bg-success/10 text-success',
  limited: 'bg-warning/10 text-warning',
  seasonal: 'bg-accent/10 text-accent'
};

const LoanSchemes = () => {
  return (
    <div className="space-y-6" id="loans">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Government Loan Schemes</h2>
        <p className="text-muted-foreground">
          Access affordable credit facilities for farming operations and infrastructure development
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loanSchemes.map((loan, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {loan.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={categoryColors[loan.category]} variant="secondary">
                      {loan.category}
                    </Badge>
                    <Badge className={statusColors[loan.status]} variant="secondary">
                      {loan.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="leading-relaxed">
                {loan.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-primary" />
                    <span className="font-medium">Max Amount</span>
                  </div>
                  <span className="font-bold text-primary">{loan.maxAmount}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-secondary" />
                    <span className="font-medium">Interest Rate</span>
                  </div>
                  <span className="font-bold text-secondary">{loan.interestRate}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium">Tenure</span>
                  </div>
                  <span className="font-bold text-accent">{loan.tenure}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Eligibility
                </h4>
                <ul className="space-y-1">
                  {loan.eligibility.map((criteria, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  Learn More
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-primary to-primary-glow">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoanSchemes;