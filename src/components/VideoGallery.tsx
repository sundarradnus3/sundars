import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  isYoutube: boolean;
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

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });

  // Sample video data - replace with real data
  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'Corporate Promotional Video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isYoutube: true,
      description: 'A high-quality corporate promotional video showcasing modern editing techniques.',
      reviews: [
        { id: '1', author: 'John Doe', rating: 5, comment: 'Excellent work! Very professional.', date: '2024-01-15' },
        { id: '2', author: 'Jane Smith', rating: 4, comment: 'Great editing skills, loved the transitions.', date: '2024-01-10' }
      ]
    },
    {
      id: '2',
      title: 'Event Highlight Reel',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isYoutube: true,
      description: 'Dynamic event coverage with smooth transitions and color grading.',
      reviews: [
        { id: '3', author: 'Mike Johnson', rating: 5, comment: 'Captured the event perfectly!', date: '2024-01-12' }
      ]
    },
    {
      id: '3',
      title: 'Product Showcase',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'sample-video.mp4',
      isYoutube: false,
      description: 'Creative product demonstration with professional lighting and effects.',
      reviews: []
    },
    {
      id: '4',
      title: 'Social Media Content',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isYoutube: true,
      description: 'Engaging social media videos optimized for various platforms.',
      reviews: [
        { id: '4', author: 'Sarah Wilson', rating: 4, comment: 'Perfect for social media!', date: '2024-01-08' }
      ]
    }
  ];

  const handleReviewSubmit = (videoId: string) => {
    if (!newReview.author || !newReview.comment) return;
    
    // Here you would typically send to backend
    console.log('New review:', { videoId, ...newReview });
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
    <section id="video-edit" className="responsive-py bg-muted/30">
      <div className="container mx-auto responsive-px">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-4xl font-heading font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Video Portfolio
            </span>
          </h2>
          <p className="responsive-text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my video editing work and see what clients have to say about each project.
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="scroll-gallery">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="media-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Video Thumbnail */}
              <div className="relative flex-shrink-0 h-40 sm:h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-gradient-primary"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{video.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Video Player */}
                        <div className="aspect-video">
                          {video.isYoutube ? (
                            <iframe
                              src={video.videoUrl}
                              className="w-full h-full rounded-lg"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={video.videoUrl}
                              controls
                              className="w-full h-full rounded-lg"
                            />
                          )}
                        </div>
                        
                        <p className="text-muted-foreground">{video.description}</p>
                        
                        {/* Reviews Section */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold">Reviews ({video.reviews.length})</h4>
                          
                          {video.reviews.map((review) => (
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
                              onClick={() => handleReviewSubmit(video.id)}
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
                
                {/* Video Type Badge */}
                <Badge 
                  variant={video.isYoutube ? "destructive" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  {video.isYoutube ? 'YouTube' : 'Upload'}
                </Badge>
              </div>

              {/* Video Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-heading font-semibold responsive-text-lg mb-2 line-clamp-1">{video.title}</h3>
                <p className="text-muted-foreground responsive-text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(video.reviews.reduce((acc, r) => acc + r.rating, 0) / (video.reviews.length || 1))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({video.reviews.length})
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

export default VideoGallery;