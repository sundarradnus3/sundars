import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import VideoGallery from '@/components/VideoGallery';
import DesignGallery from '@/components/DesignGallery';
import DTPSection from '@/components/DTPSection';
import WebDesignSection from '@/components/WebDesignSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <VideoGallery />
      <DesignGallery />
      <DTPSection />
      <WebDesignSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Index;
