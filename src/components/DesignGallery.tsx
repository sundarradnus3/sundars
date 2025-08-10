import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface DesignItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const DesignGallery = () => {
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });

  // Sample design data - replace with real data
  const designs: DesignItem[] = [
    {
      id: '1',
      title: 'Brand Identity Design',
      image: '/api/placeholder/400/500',
      category: 'Branding',
      description: 'Complete brand identity package including logo, colors, and typography.',
      reviews: [
        { id: '1', author: 'Emily Davis', rating: 5, comment: 'Amazing design work! Love the creativity.', date: '2024-01-14' },
        { id: '2', author: 'Robert Brown', rating: 5, comment: 'Professional and modern approach.', date: '2024-01-11' }
      ]
    },
    {
      id: '2',
      title: 'Social Media Graphics',
      image: '/api/placeholder/400/500',
      category: 'Social Media',
      description: 'Eye-catching social media posts and story templates.',
      reviews: [
        { id: '3', author: 'Lisa Garcia', rating: 4, comment: 'Great for social media campaigns!', date: '2024-01-13' }
      ]
    },
    {
      id: '3',
      title: 'Print Advertisement',
      image: '/api/placeholder/400/500',
      category: 'Print Design',
      description: 'High-impact print advertisement with bold typography and colors.',
      reviews: [
        { id: '4', author: 'David Miller', rating: 5, comment: 'Outstanding print design quality.', date: '2024-01-09' },
        { id: '5', author: 'Anna Taylor', rating: 4, comment: 'Very creative and professional.', date: '2024-01-07' }
      ]
    },
    {
      id: '4',
      title: 'Website UI Design',
      image: '/api/placeholder/400/500',
      category: 'Web Design',
      description: 'Modern and responsive website interface design.',
      reviews: []
    },
    {
      id: '5',
      title: 'Logo Collection',
      image: '/api/placeholder/400/500',
      category: 'Logo Design',
      description: 'Creative logo designs for various industries and brands.',
      reviews: [
        { id: '6', author: 'Chris Wilson', rating: 5, comment: 'Excellent logo concepts!', date: '2024-01-06' }
      ]
    }
  ];

  const categories = ['All', 'Branding', 'Social Media', 'Print Design', 'Web Design', 'Logo Design'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(design => design.category === activeCategory);

  const handleReviewSubmit = (designId: string) => {
    if (!newReview.author || !newReview.comment) return;
    
    // Here you would typically send to backend
    console.log('New design review:', { designId, ...newReview });
    setNewReview({ author: '', rating: 5, comment: '' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-warning' : 'text-muted'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="graphic-design" className="responsive-py">
      <div className="container mx-auto responsive-px">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-4xl font-heading font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Design Portfolio
            </span>
          </h2>
          <p className="responsive-text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover my graphic design work across various categories and read client reviews.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-gradient-primary" : "review-button"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="scroll-gallery">
          {filteredDesigns.map((design, index) => (
            <div
              key={design.id}
              className="media-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Design Image */}
              <div className="relative flex-shrink-0 h-40 sm:h-48 overflow-hidden">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-gradient-primary"
                        onClick={() => setSelectedDesign(design)}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{design.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Large Design Image */}
                        <div className="aspect-square max-h-96 mx-auto">
                          <img
                            src={design.image}
                            alt={design.title}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary">{design.category}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground">{design.description}</p>
                        
                        {/* Reviews Section */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold">Reviews ({design.reviews.length})</h4>
                          
                          {design.reviews.map((review) => (
                            <div key={review.id} className="p-4 rounded-lg bg-muted/50">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.author}</span>
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          ))}
                          
                          {/* Add Review Form */}
                          <div className="p-4 rounded-lg border border-border space-y-4">
                            <h5 className="font-medium">Leave a Review</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="Your name"
                                value={newReview.author}
                                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                                className="px-3 py-2 rounded-lg bg-background border border-border"
                              />
                              <select
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                className="px-3 py-2 rounded-lg bg-background border border-border"
                              >
                                {[5, 4, 3, 2, 1].map(num => (
                                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                                ))}
                              </select>
                            </div>
                            <Textarea
                              placeholder="Your review..."
                              value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              className="bg-background"
                            />
                            <Button 
                              onClick={() => handleReviewSubmit(design.id)}
                              className="review-button"
                            >
                              Submit Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Category Badge */}
                <Badge 
                  variant="secondary"
                  className="absolute top-2 right-2"
                >
                  {design.category}
                </Badge>
              </div>

              {/* Design Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-heading font-semibold responsive-text-lg mb-2 line-clamp-1">{design.title}</h3>
                <p className="text-muted-foreground responsive-text-sm mb-3 line-clamp-2">{design.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(design.reviews.reduce((acc, r) => acc + r.rating, 0) / (design.reviews.length || 1))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({design.reviews.length})
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="review-button">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;