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

// Função para converter URL do YouTube para embed
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Se já é uma URL de embed, retorna
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Extrai o ID do vídeo de diferentes formatos de URL
  let videoId: string | null = null;

  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Formato: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // Formato: https://www.youtube.com/v/VIDEO_ID
  const vMatch = url.match(/youtube\.com\/v\/([^?&]+)/);
  if (vMatch) {
    videoId = vMatch[1];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  // Se não é YouTube, retorna a URL original
  return url;
}

// Função para obter thumbnail do YouTube
function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;

  let videoId: string | null = null;

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) videoId = watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) videoId = shortMatch[1];

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) videoId = embedMatch[1];

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return null;
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

  // Converte URL do YouTube para embed
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  // Se não tem thumbnail mas tem URL do YouTube, usa thumbnail do YouTube
  const finalThumbnail = thumbnailUrl || (videoUrl ? getYouTubeThumbnail(videoUrl) : null);

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
          {(embedUrl || finalThumbnail) && alignment === 'left' && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-lg">
              {showVideo && embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video"
                />
              ) : (
                <>
                  {finalThumbnail ? (
                    <img
                      src={finalThumbnail}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Se a thumbnail de alta resolução falhar, tenta a de média
                        const img = e.target as HTMLImageElement;
                        if (img.src.includes('maxresdefault')) {
                          img.src = img.src.replace('maxresdefault', 'hqdefault');
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => embedUrl && setShowVideo(true)}
                      disabled={!embedUrl}
                      className={cn(
                        "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all",
                        embedUrl
                          ? "bg-white/90 hover:bg-white hover:scale-110 cursor-pointer"
                          : "bg-white/50 cursor-not-allowed"
                      )}
                    >
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </button>
                  </div>
                  {!embedUrl && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-white text-sm bg-black/50 rounded px-2 py-1">
                        Cole a URL do YouTube no campo "URL do Video"
                      </p>
                    </div>
                  )}
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
