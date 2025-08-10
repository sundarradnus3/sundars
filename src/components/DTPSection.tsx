import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const DTPSection = () => {
  const dtpServices = [
    {
      id: '1',
      title: 'Brochure Design',
      description: 'Professional tri-fold and bi-fold brochures for marketing campaigns',
      features: ['High-resolution print ready', 'CMYK color format', 'Multiple layout options'],
      image: '/api/placeholder/400/300'
    },
    {
      id: '2',
      title: 'Flyer Design',
      description: 'Eye-catching flyers for events, promotions, and announcements',
      features: ['A4/A5 sizes available', 'Creative layouts', 'Print-optimized'],
      image: '/api/placeholder/400/300'
    },
    {
      id: '3',
      title: 'Business Cards',
      description: 'Professional business card designs that make lasting impressions',
      features: ['Standard dimensions', 'Premium finishes', 'Double-sided options'],
      image: '/api/placeholder/400/300'
    },
    {
      id: '4',
      title: 'Catalog Design',
      description: 'Product catalogs and company portfolios with professional layouts',
      features: ['Multi-page layouts', 'Product showcase', 'Brand consistency'],
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <section id="dtp" className="responsive-py bg-muted/30">
      <div className="container mx-auto responsive-px">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-4xl font-heading font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              DTP Services
            </span>
          </h2>
          <p className="responsive-text-xl text-muted-foreground max-w-2xl mx-auto">
            Desktop Publishing services for all your print design needs with professional quality and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 responsive-gap">
          {dtpServices.map((service, index) => (
            <Card 
              key={service.id} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-2 right-2 bg-gradient-primary">
                  DTP
                </Badge>
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-heading responsive-text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-muted-foreground responsive-text-sm mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="responsive-text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTPSection;