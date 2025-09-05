import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Phone, MessageSquare, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceQuery {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  language: string;
  category: 'farming' | 'weather' | 'scheme' | 'disease' | 'general';
}

const mockQueries: VoiceQuery[] = [
  {
    id: '1',
    query: 'मेरी गेहूं की फसल में पत्ते पीले हो रहे हैं, क्या करूं?',
    response: 'पत्तों का पीला होना नाइट्रोजन की कमी या अतिरिक्त पानी का संकेत हो सकता है। तुरंत यूरिया का छिड़काव करें और पानी की मात्रा कम करें।',
    timestamp: new Date(),
    language: 'hindi',
    category: 'disease'
  },
  {
    id: '2', 
    query: 'What is the current MSP for rice?',
    response: 'The current MSP for common rice is ₹2,300 per quintal for Kharif 2024. You can sell your produce at the nearest procurement center.',
    timestamp: new Date(Date.now() - 3600000),
    language: 'english',
    category: 'scheme'
  }
];

const VoiceSupport = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [voiceQueries, setVoiceQueries] = useState<VoiceQuery[]>(mockQueries);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Start actual speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentQuery(transcript);
        handleStopRecording();
      };
      
      recognition.start();
    }
    
    toast({
      title: "Recording Started",
      description: "Speak your question clearly. We support Hindi, English, and regional languages.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    
    // Simulate voice processing
    setTimeout(() => {
      const mockQuery = "मौसम की जानकारी चाहिए";
      const mockResponse = "कल से 3 दिन तक हल्की बारिश की संभावना है। खेत में पानी भरने से बचने के लिए जल निकासी की व्यवस्था करें।";
      
      const newQuery: VoiceQuery = {
        id: Date.now().toString(),
        query: mockQuery,
        response: mockResponse,
        timestamp: new Date(),
        language: selectedLanguage,
        category: 'weather'
      };
      
      setVoiceQueries(prev => [newQuery, ...prev]);
      setCurrentQuery(mockQuery);
      
      toast({
        title: "Query Processed",
        description: "Voice response is ready to play",
      });
    }, 2000);
  };

  const handlePlayResponse = (query: VoiceQuery) => {
    setIsPlaying(true);
    
    // Use Web Speech API for text-to-speech if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(query.response);
      utterance.lang = query.language === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      // Fallback simulation
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
    
    toast({
      title: "Playing Response",
      description: `Playing in ${query.language}`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'farming': return 'bg-primary/10 text-primary';
      case 'weather': return 'bg-accent/10 text-accent';
      case 'scheme': return 'bg-secondary/10 text-secondary';
      case 'disease': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6" id="support">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Voice Support System</h2>
        <p className="text-muted-foreground">
          Get farming advice in your local language through voice interaction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Input Section */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" />
              Voice Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about farming, weather, schemes, or diseases in Hindi, English, or regional languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recording Interface */}
            <div className="text-center space-y-4">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-destructive/20 border-4 border-destructive animate-pulse' 
                  : 'bg-primary/20 border-4 border-primary hover:bg-primary/30'
              }`}>
                {isRecording ? (
                  <MicOff className="w-8 h-8 text-destructive" />
                ) : (
                  <Mic className="w-8 h-8 text-primary" />
                )}
              </div>
              
              <div className="space-y-2">
                {isRecording ? (
                  <>
                    <p className="text-lg font-medium text-destructive">Recording...</p>
                    <p className="text-sm text-muted-foreground">Tap to stop recording</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium">Ready to Help</p>
                    <p className="text-sm text-muted-foreground">Tap to start voice query</p>
                  </>
                )}
              </div>

              <Button
                size="lg"
                variant={isRecording ? "destructive" : "hero"}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="w-full"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Voice Query
                  </>
                )}
              </Button>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <h4 className="font-medium">Supported Languages</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'hindi', name: 'हिन्दी', flag: '🇮🇳' },
                  { code: 'english', name: 'English', flag: '🇬🇧' },
                  { code: 'punjabi', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
                  { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
                  { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
                ].map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    {lang.flag} {lang.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Expert
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Query History */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              Recent Queries
            </CardTitle>
            <CardDescription>
              Your voice interactions and responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {voiceQueries.length > 0 ? (
              voiceQueries.map((query) => (
                <div key={query.id} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(query.category)} variant="secondary">
                          {query.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {query.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{query.query}</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-3 rounded border-l-4 border-primary">
                    <p className="text-sm">{query.response}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePlayResponse(query)}
                      disabled={isPlaying}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Playing...
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 mr-1" />
                          Play Audio
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Share
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No voice queries yet</p>
                <p className="text-sm mt-1">Start by asking a farming question</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceSupport;