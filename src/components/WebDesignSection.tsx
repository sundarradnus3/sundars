import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const WebDesignSection = () => {
  const webProjects = [
    {
      id: '1',
      title: 'E-commerce Website',
      description: 'Modern responsive e-commerce platform with shopping cart functionality',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/600/400',
      demoUrl: '#',
      category: 'E-commerce'
    },
    {
      id: '2',
      title: 'Corporate Website',
      description: 'Professional corporate website with CMS integration and SEO optimization',
      technologies: ['WordPress', 'PHP', 'MySQL', 'SEO'],
      image: '/api/placeholder/600/400',
      demoUrl: '#',
      category: 'Corporate'
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Creative portfolio showcase with smooth animations and responsive design',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      image: '/api/placeholder/600/400',
      demoUrl: '#',
      category: 'Portfolio'
    },
    {
      id: '4',
      title: 'Landing Page',
      description: 'High-converting landing page with optimized user experience and analytics',
      technologies: ['React', 'Tailwind', 'Analytics', 'A/B Testing'],
      image: '/api/placeholder/600/400',
      demoUrl: '#',
      category: 'Landing Page'
    }
  ];

  return (
    <section id="web-design" className="responsive-py">
      <div className="container mx-auto responsive-px">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-4xl font-heading font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Web Design & Development
            </span>
          </h2>
          <p className="responsive-text-xl text-muted-foreground max-w-2xl mx-auto">
            Custom web solutions that combine stunning design with powerful functionality to drive your business forward.
          </p>
        </div>

        <div className="scroll-gallery">
          {webProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="media-card bg-card border-border group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative flex-shrink-0 h-40 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    View Demo
                  </Button>
                </div>
                <Badge 
                  variant="secondary"
                  className="absolute top-2 right-2"
                >
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="font-heading responsive-text-lg line-clamp-1">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-3 sm:p-4 pt-0">
                <p className="text-muted-foreground responsive-text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full review-button"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDesignSection;