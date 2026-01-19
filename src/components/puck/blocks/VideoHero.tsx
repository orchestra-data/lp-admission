import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import * as React from 'react';

export interface VideoHeroProps {
  title: string;
  subtitle: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  alignment: 'left' | 'center';
}

export function VideoHero({
  title,
  subtitle,
  videoUrl,
  thumbnailUrl,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  alignment,
}: VideoHeroProps) {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={cn(
            'grid gap-12 items-center',
            alignment === 'left' ? 'md:grid-cols-2' : 'text-center'
          )}
        >
          {/* Content */}
          <div className={cn(alignment === 'center' && 'max-w-3xl mx-auto')}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {subtitle}
            </p>
            <div
              className={cn(
                'flex gap-4',
                alignment === 'center' ? 'justify-center' : 'justify-start'
              )}
            >
              <Button size="lg" asChild>
                <a href={ctaLink}>{ctaText}</a>
              </Button>
              {secondaryCtaText && secondaryCtaLink && (
                <Button size="lg" variant="outline" asChild>
                  <a href={secondaryCtaLink}>{secondaryCtaText}</a>
                </Button>
              )}
            </div>
          </div>

          {/* Video */}
          {(videoUrl || thumbnailUrl) && alignment === 'left' && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              {showVideo && videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => setShowVideo(true)}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                    >
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VideoHero;
