import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ServiceRequestForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be handled after Supabase integration
    alert('Please connect Supabase to enable form submissions via email.');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-heading font-semibold text-center">
          Request a Service
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Tell us about your project and we'll get back to you within 24 hours
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">Full Name *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                className="bg-input border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="bg-input border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your.email@example.com"
              className="bg-input border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="font-medium">Service Required *</Label>
            <Select name="service" required>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video-editing">Video Editing</SelectItem>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="dtp">DTP (Desktop Publishing)</SelectItem>
                <SelectItem value="web-design">Web Design & Development</SelectItem>
                <SelectItem value="branding">Brand Identity Design</SelectItem>
                <SelectItem value="social-media">Social Media Content</SelectItem>
                <SelectItem value="other">Other (Please specify in message)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="font-medium">Budget Range (Optional)</Label>
            <Select name="budget">
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-5k">Under ₹5,000</SelectItem>
                <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
                <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="above-100k">Above ₹1,00,000</SelectItem>
                <SelectItem value="discuss">Let's Discuss</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-medium">Project Details *</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Please describe your project requirements, timeline, and any specific details..."
              className="bg-input border-border focus:ring-primary min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-opacity"
          >
            Submit Request
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            By submitting this form, you agree to our terms of service and privacy policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestForm;