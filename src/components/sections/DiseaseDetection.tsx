import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiseaseDetectionProps {
  currentLanguage: string;
}

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  preventiveMeasures: string[];
}

const mockResults: DetectionResult[] = [
  {
    disease: 'Late Blight (Tomato)',
    confidence: 87,
    severity: 'high',
    treatment: [
      'Apply copper-based fungicide immediately',
      'Remove affected leaves and dispose properly',
      'Improve air circulation around plants',
      'Reduce watering frequency'
    ],
    preventiveMeasures: [
      'Use resistant varieties',
      'Maintain proper plant spacing',
      'Avoid overhead watering',
      'Apply preventive fungicide spray'
    ]
  }
];

const DiseaseDetection = ({ currentLanguage }: DiseaseDetectionProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults(mockResults[0]);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Plant disease has been successfully identified",
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'high': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6" id="disease-detection">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Plant Disease Detection</h2>
        <p className="text-muted-foreground">
          Upload a photo of your plant to get instant disease diagnosis and treatment recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Take a clear photo of the affected plant parts (leaves, stems, fruits)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Plant preview" 
                    className="max-w-full max-h-64 mx-auto rounded-lg object-cover"
                  />
                  <p className="text-sm text-muted-foreground">
                    {selectedImage?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your image here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
              <Button 
                className="flex-1"
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Disease'
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Analysis Progress</span>
                  <span>Processing...</span>
                </div>
                <Progress value={33} className="animate-pulse" />
                <p className="text-xs text-muted-foreground text-center">
                  Using advanced AI models to identify plant diseases...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Detection Results
            </CardTitle>
            <CardDescription>
              AI-powered diagnosis with treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                {/* Disease Identification */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{results.disease}</h3>
                    <Badge className={getSeverityColor(results.severity)}>
                      {getSeverityIcon(results.severity)}
                      {results.severity} severity
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span className="font-medium">{results.confidence}%</span>
                    </div>
                    <Progress value={results.confidence} className="h-2" />
                  </div>
                </div>

                {/* Treatment */}
                <div className="space-y-3">
                  <h4 className="font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Immediate Treatment
                  </h4>
                  <ul className="space-y-2">
                    {results.treatment.map((step, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="space-y-3">
                  <h4 className="font-medium text-primary flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Prevention Tips
                  </h4>
                  <ul className="space-y-2">
                    {results.preventiveMeasures.map((tip, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="hero" className="w-full">
                  Get Detailed Treatment Plan
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Upload an image to start disease detection</p>
                <p className="text-sm mt-2">
                  Our AI will analyze the image and provide detailed diagnosis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;