import { useState, useCallback } from 'react';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Destinations } from '@/sections/Destinations';
import { Features } from '@/sections/Features';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { Planner } from '@/sections/Planner';
import { ItineraryView } from '@/sections/ItineraryView';
import { SavedItineraries } from '@/sections/SavedItineraries';
import type { UserPreferences, Itinerary, DayPlan } from '@/types';
import { generateMockItinerary } from '@/data/mockData';
import { saveItinerary } from '@/lib/storage';
import { toast } from 'sonner';

type View = 'home' | 'planner' | 'itinerary' | 'saved';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate itinerary using mock data
  const generateItinerary = useCallback(async (prefs: UserPreferences): Promise<Itinerary> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock itinerary
    const result = generateMockItinerary(prefs.destination, prefs.days, {
      budget: prefs.budget,
      interests: prefs.interests,
      travelStyle: prefs.travelStyle
    });

    const itinerary: Itinerary = {
      id: `itinerary_${Date.now()}`,
      destination: prefs.destination,
      days: result.days as DayPlan[],
      totalCost: result.totalCost,
      createdAt: new Date().toISOString(),
      preferences: prefs
    };

    return itinerary;
  }, []);

  const handleStartPlanning = useCallback(() => {
    setCurrentView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmitPreferences = useCallback(async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setIsGenerating(true);

    try {
      const itinerary = await generateItinerary(prefs);
      setCurrentItinerary(itinerary);
      setCurrentView('itinerary');
      toast.success('行程生成成功！');
    } catch (error) {
      toast.error('生成行程时出错，请重试');
      console.error('Error generating itinerary:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [generateItinerary]);

  const handleViewSaved = useCallback(() => {
    setCurrentView('saved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewItinerary = useCallback((itinerary: Itinerary) => {
    setCurrentItinerary(itinerary);
    setCurrentView('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSaveItinerary = useCallback(() => {
    if (currentItinerary) {
      saveItinerary(currentItinerary);
      toast.success('行程已保存到本地');
    }
  }, [currentItinerary]);

  const renderContent = () => {
    switch (currentView) {
      case 'planner':
        return (
          <Planner
            onBack={handleBackToHome}
            onSubmit={handleSubmitPreferences}
            isGenerating={isGenerating}
          />
        );
      
      case 'itinerary':
        if (!currentItinerary) return null;
        return (
          <ItineraryView
            itinerary={currentItinerary}
            onBack={() => setCurrentView(preferences ? 'planner' : 'home')}
            onSave={handleSaveItinerary}
          />
        );
      
      case 'saved':
        return (
          <SavedItineraries
            onBack={handleBackToHome}
            onViewItinerary={handleViewItinerary}
            onCreateNew={handleStartPlanning}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <Hero onStartPlanning={handleStartPlanning} />
            <Destinations />
            <Features />
            <CTA onStartPlanning={handleStartPlanning} />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar 
        onNavigate={(view) => {
          if (view === 'home') handleBackToHome();
          else if (view === 'planner') handleStartPlanning();
          else if (view === 'saved') handleViewSaved();
        }}
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
