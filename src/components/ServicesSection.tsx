import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ServicesSection = () => {
  const services = [
    {
      title: 'Video Editing',
      description: "I'm dedicated to produce high-quality content, stay updated with trends, and collaborate with clients, consistently delivering impactful designs that enhance brand identity and drive to success specific needs of our clients.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V4m0 0H5a2 2 0 00-2 2v12a2 2 0 002 2h2M12 8l3 3-3 3m-6 0l3-3-3-3" />
        </svg>
      ),
      features: ['Professional Color Grading', 'Smooth Transitions', 'Audio Enhancement', 'Motion Graphics'],
      link: 'https://sundarportfoliovideo.my.canva.site/'
    },
    {
      title: 'Graphic Designer',
      description: "Creative and detail oriented graphic designer specializing in visually compelling designs, including logo's, banner's, and branding materials. Transforming ideas into impactful visuals that captivate to engage and we encourage your feedback throughout the design process to ensure that we are meeting your expectations.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ['Logo Design', 'Brand Identity', 'Print Materials', 'Digital Graphics'],
      link: 'https://drive.google.com/drive/folders/1OohGm-YrV0-q9_F1M4ZMxNS7pZ369AAC?usp=drive_link'
    },
    {
      title: 'Web Developer',
      description: "We use the latest web technologies and development tools to create websites that are fast, secure, and scalable.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ['Responsive Design', 'Modern Technologies', 'Fast & Secure', 'SEO Optimized'],
      link: '#'
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-warning text-lg font-medium mb-2">What I Offer!</p>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional creative services tailored to bring your vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-2xl transition-all duration-300 border-border/50 bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-primary/10 w-20 h-20 flex items-center justify-center group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full review-button"
                    asChild
                  >
                    <a 
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Projects...
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Arrow Image */}
        <div className="text-center mt-16">
          <img 
            src="https://sundar-git-main-sundarradnus3s-projects.vercel.app/arrow%20(2).png"
            alt="Arrow pointing to services"
            className="mx-auto w-16 h-16 opacity-60"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;