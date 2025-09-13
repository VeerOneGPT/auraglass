'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useEcommerce, Product, Recommendation } from './GlassEcommerceProvider';

export interface ProductRecommendationsProps {
  productId?: string;
  title?: string;
  subtitle?: string;
  maxItems?: number;
  variant?: 'grid' | 'carousel' | 'list' | 'compact';
  showPrices?: boolean;
  showRatings?: boolean;
  showQuickActions?: boolean;
  recommendationType?: 'similar' | 'trending' | 'personalized' | 'bought-together' | 'viewed-together' | 'all';
  className?: string;
  onProductClick?: (product: Product) => void;
}

interface ProductCardProps {
  recommendation: Recommendation;
  variant: 'grid' | 'carousel' | 'list' | 'compact';
  showPrice?: boolean;
  showRating?: boolean;
  showQuickActions?: boolean;
  onProductClick?: (product: Product) => void;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  recommendation,
  variant,
  showPrice = true,
  showRating = true,
  showQuickActions = true,
  onProductClick,
  onAddToCart,
  onAddToWishlist
}) => {
  const { product, score, reason, explanation, confidence } = recommendation;
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'similar': return '🔄';
      case 'trending': return '📈';
      case 'personalized': return '🎯';
      case 'bought-together': return '🛍️';
      case 'viewed-together': return '👀';
      default: return '✨';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'similar': return 'bg-blue-100 text-blue-800';
      case 'trending': return 'bg-red-100 text-red-800';
      case 'personalized': return 'bg-purple-100 text-purple-800';
      case 'bought-together': return 'bg-green-100 text-green-800';
      case 'viewed-together': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCompactCard = () => (
    <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3 glass-glass-p-3 hover:glass-surface-subtle glass-radius-lg transition-colors">
      <img
        src={imageError ? 'https://via.placeholder.com/60x60?text=No+Image' : (product.thumbnail || product.images[0])}
        alt={product.name}
        className="glass-glass-w-12 glass-glass-h-12 object-cover glass-radius"
        onError={() => setImageError(true)}
      />
      
      <div className="glass-glass-flex-1 glass-glass-min-w-0">
        <h3 className="glass-glass-font-medium glass-text-secondary glass-glass-text-sm glass-glass-truncate">
          {product.name}
        </h3>
        {showPrice && (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 mt-1">
            <span className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="glass-glass-text-xs glass-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
      
      {showQuickActions && (
        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id);
            }}
            className="glass-glass-p-1 glass-text-secondary hover:glass-glass-text-primary transition-colors"
            title="Add to wishlist"
          >
            ♡
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            className="glass-glass-p-1 glass-text-secondary hover:glass-glass-text-primary transition-colors"
            title="Add to cart"
          >
            🛒
          </button>
        </div>
      )}
    </div>
  );

  const renderListCard = () => (
    <div className="glass-glass-flex glass-glass-gap-4 glass-glass-p-4 glass-glass-border glass-glass-border-subtle glass-radius-lg hover:glass-glass-shadow-md transition-all">
      <img
        src={imageError ? 'https://via.placeholder.com/120x120?text=No+Image' : (product.thumbnail || product.images[0])}
        alt={product.name}
        className="w-20 h-20 object-cover glass-radius"
        onError={() => setImageError(true)}
      />
      
      <div className="glass-glass-flex-1">
        <div className="glass-glass-flex glass-glass-items-start glass-glass-justify-between glass-glass-mb-2">
          <h3 className="glass-glass-font-medium glass-text-secondary line-clamp-2">
            {product.name}
          </h3>
          <div className={cn("text-xs px-2 py-1 rounded-full", getReasonColor(reason))}>
            {getReasonIcon(reason)} {reason.replace('-', ' ')}
          </div>
        </div>
        
        <p className="glass-glass-text-sm glass-text-secondary glass-glass-mb-3 line-clamp-2">
          {explanation}
        </p>
        
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
            {showPrice && (
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                <span className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="glass-glass-text-sm glass-text-secondary line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            )}
            
            {showRating && (
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-1">
                <span className="glass-glass-text-primary">★</span>
                <span className="glass-glass-text-sm glass-text-secondary">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
          
          {showQuickActions && (
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToWishlist(product.id);
                }}
                className="glass-glass-px-3 glass-glass-py-1 glass-glass-text-sm glass-text-secondary hover:glass-glass-text-primary transition-colors"
              >
                ♡ Wishlist
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product.id);
                }}
                className="glass-glass-px-3 glass-glass-py-1 glass-surface-blue glass-glass-text-primary glass-glass-text-sm glass-radius hover:glass-surface-blue transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
        
        {/* Confidence Indicator */}
        <div className="mt-2 glass-glass-flex glass-glass-items-center glass-glass-gap-2">
          <span className="glass-glass-text-xs glass-text-secondary">Match confidence:</span>
          <div className="glass-glass-flex-1 bg-gray-200 glass-radius-full h-1">
            <div 
              className="glass-surface-blue h-1 glass-radius-full transition-all"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="glass-glass-text-xs glass-text-secondary">{Math.round(confidence * 100)}%</span>
        </div>
      </div>
    </div>
  );

  const renderGridCard = () => (
    <div
      className="group glass-glass-relative glass-surface-subtle glass-glass-border glass-glass-border-subtle glass-radius-lg overflow-hidden hover:glass-glass-shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="glass-glass-relative aspect-square overflow-hidden">
        <img
          src={imageError ? 'https://via.placeholder.com/300x300?text=No+Image' : (product.thumbnail || product.images[0])}
          alt={product.name}
          className="glass-glass-w-full glass-glass-h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Badges */}
        <div className="glass-glass-absolute glass--glass--glassglass--top-2 left-2 glass-glass-flex glass-glass-flex-col glass-glass-gap-1">
          {product.isOnSale && (
            <span className="glass-surface-red glass-glass-text-primary glass-glass-text-xs glass-glass-px-2 glass-glass-py-1 glass-radius">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="glass-surface-green glass-glass-text-primary glass-glass-text-xs glass-glass-px-2 glass-glass-py-1 glass-radius">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="glass-surface-yellow glass-glass-text-primary glass-glass-text-xs glass-glass-px-2 glass-glass-py-1 glass-radius">
              BESTSELLER
            </span>
          )}
        </div>
        
        {/* Recommendation Reason */}
        <div className="glass-glass-absolute glass--glass--glassglass--top-2 right-2">
          <div className={cn("text-xs px-2 py-1 rounded-full", getReasonColor(reason))}>
            {getReasonIcon(reason)}
          </div>
        </div>
        
        {/* Quick Actions Overlay */}
        {showQuickActions && (
          <div className={cn(
            "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist(product.id);
              }}
              className="glass-glass-p-2 glass-surface-subtle glass-radius-full glass-text-secondary hover:glass-glass-text-primary transition-colors"
              title="Add to wishlist"
            >
              ♡
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              className="glass-glass-p-2 glass-surface-blue glass-glass-text-primary glass-radius-full hover:glass-surface-blue transition-colors"
              title="Add to cart"
            >
              🛒
            </button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="glass-glass-p-4">
        <h3 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.brand && (
          <p className="glass-glass-text-sm glass-text-secondary glass-glass-mb-2">{product.brand}</p>
        )}
        
        {showRating && (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-1 glass-glass-mb-3">
            <div className="glass-glass-flex glass-glass-text-primary">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="glass-glass-text-sm glass-text-secondary">
              ({product.reviewCount})
            </span>
          </div>
        )}
        
        {showPrice && (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-mb-3">
            <span className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="glass-glass-text-sm glass-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}
        
        {/* Reason Explanation */}
        <p className="glass-glass-text-xs glass-text-secondary glass-glass-mb-3">{explanation}</p>
        
        {/* Confidence Bar */}
        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
          <span className="glass-glass-text-xs glass-text-secondary">Match:</span>
          <div className="glass-glass-flex-1 bg-gray-200 glass-radius-full h-1">
            <div 
              className="glass-surface-blue h-1 glass-radius-full"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="glass-glass-text-xs glass-text-secondary">{Math.round(confidence * 100)}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      onClick={() => onProductClick?.(product)}
      className="glass-glass-cursor-pointer"
    >
      {variant === 'compact' && renderCompactCard()}
      {variant === 'list' && renderListCard()}
      {(variant === 'grid' || variant === 'carousel') && renderGridCard()}
    </div>
  );
};

export const GlassProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  productId,
  title = 'Recommended for You',
  subtitle,
  maxItems = 8,
  variant = 'grid',
  showPrices = true,
  showRatings = true,
  showQuickActions = true,
  recommendationType = 'all',
  className,
  onProductClick
}) => {
  const {
    recommendations,
    getRecommendations,
    generateRecommendations,
    addToCart,
    addToWishlist
  } = useEcommerce();

  const [loading, setLoading] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load recommendations
  useEffect(() => {
    if (!productId) return;
    
    const loadRecommendations = async () => {
      setLoading(true);
      
      let recs = getRecommendations(productId);
      
      if (recs.length === 0) {
        recs = await generateRecommendations(productId);
      }
      
      // Filter by recommendation type
      if (recommendationType !== 'all') {
        recs = recs.filter(rec => rec.reason === recommendationType);
      }
      
      setCurrentRecommendations(recs.slice(0, maxItems));
      setLoading(false);
    };

    loadRecommendations();
  }, [productId, recommendationType, maxItems, getRecommendations, generateRecommendations]);

  const handleAddToCart = useCallback((productId: string) => {
    addToCart(productId, 1);
    // You could show a toast notification here
  }, [addToCart]);

  const handleAddToWishlist = useCallback((productId: string) => {
    addToWishlist(productId);
    // You could show a toast notification here
  }, [addToWishlist]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => 
      prev + 1 >= Math.ceil(currentRecommendations.length / getItemsPerView()) ? 0 : prev + 1
    );
  }, [currentRecommendations.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => 
      prev - 1 < 0 ? Math.ceil(currentRecommendations.length / getItemsPerView()) - 1 : prev - 1
    );
  }, [currentRecommendations.length]);

  const getItemsPerView = () => {
    switch (variant) {
      case 'carousel': return 4;
      case 'grid': return 8;
      default: return currentRecommendations.length;
    }
  };

  if (loading) {
    return (
      <Glass className={cn("p-6", className)}>
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-py-12">
          <div className="animate-spin glass-radius-full glass-glass-h-12 glass-glass-w-12 glass-glass-border-4 glass-glass-border-blue glass-glass-border-t-transparent"></div>
        </div>
      </Glass>
    );
  }

  if (currentRecommendations.length === 0) {
    return (
      <Glass className={cn("p-6", className)}>
        <div className="glass-glass-text-center glass-glass-py-12">
          <div className="glass-glass-text-4xl glass-glass-mb-4">🤖</div>
          <h3 className="glass-glass-text-lg glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
            No recommendations available
          </h3>
          <p className="glass-text-secondary">
            We're still learning about your preferences. Check back later!
          </p>
        </div>
      </Glass>
    );
  }

  return (
    <Glass className={cn("p-6", className)}>
      {/* Header */}
      <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between mb-6">
        <div>
          <h2 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary">
            {title}
          </h2>
          {subtitle && (
            <p className="glass-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        
        {variant === 'carousel' && (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <button
              onClick={prevSlide}
              className="glass-glass-p-2 glass-text-secondary hover:glass-text-secondary transition-colors"
            >
              ←
            </button>
            <span className="glass-glass-text-sm glass-text-secondary">
              {currentIndex + 1} / {Math.ceil(currentRecommendations.length / getItemsPerView())}
            </span>
            <button
              onClick={nextSlide}
              className="glass-glass-p-2 glass-text-secondary hover:glass-text-secondary transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Recommendations Grid/Carousel */}
      <div className={cn(
        variant === 'grid' && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        variant === 'carousel' && "overflow-hidden",
        variant === 'list' && "space-y-4",
        variant === 'compact' && "space-y-2"
      )}>
        {variant === 'carousel' ? (
          <div
            className="glass-glass-flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${Math.ceil(currentRecommendations.length / getItemsPerView()) * 100}%`
            }}
          >
            {Array.from({ length: Math.ceil(currentRecommendations.length / getItemsPerView()) }, (_, slideIndex) => (
              <div
                key={slideIndex}
                className="glass-glass-grid glass-glass-glass-grid-cols-4 glass-glass-gap-6 glass-glass-w-full glass-glass-flex-shrink-0"
              >
                {currentRecommendations
                  .slice(slideIndex * getItemsPerView(), (slideIndex + 1) * getItemsPerView())
                  .map(recommendation => (
                    <ProductCard
                      key={recommendation.productId}
                      recommendation={recommendation}
                      variant={variant}
                      showPrice={showPrices}
                      showRating={showRatings}
                      showQuickActions={showQuickActions}
                      onProductClick={onProductClick}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
              </div>
            ))}
          </div>
        ) : (
          currentRecommendations.map(recommendation => (
            <ProductCard
              key={recommendation.productId}
              recommendation={recommendation}
              variant={variant}
              showPrice={showPrices}
              showRating={showRatings}
              showQuickActions={showQuickActions}
              onProductClick={onProductClick}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))
        )}
      </div>

      {/* AI Insights */}
      <div className="mt-6 glass-glass-p-4 bg-blue-50 glass-radius-lg">
        <div className="glass-glass-flex glass-glass-items-start glass-glass-gap-3">
          <div className="glass-glass-text-2xl">🤖</div>
          <div>
            <h3 className="glass-glass-font-medium glass-glass-text-primary glass-glass-mb-1">AI Insights</h3>
            <p className="glass-glass-text-sm glass-glass-text-primary">
              These recommendations are personalized based on your browsing history, 
              purchase patterns, and preferences similar to users like you. 
              Our AI analyzes {currentRecommendations.length} factors to suggest the best products for you.
            </p>
            <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-2 mt-3">
              {Array.from(new Set(currentRecommendations.map(r => r.reason))).map(reason => (
                <span
                  key={reason}
                  className={cn("text-xs px-2 py-1 rounded-full", getReasonColor(reason))}
                >
                  {getReasonIcon(reason)} {reason.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Glass>
  );

  function getReasonColor(reason: string): string {
    switch (reason) {
      case 'similar': return 'bg-blue-100 text-blue-800';
      case 'trending': return 'bg-red-100 text-red-800';
      case 'personalized': return 'bg-purple-100 text-purple-800';
      case 'bought-together': return 'bg-green-100 text-green-800';
      case 'viewed-together': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getReasonIcon(reason: string): string {
    switch (reason) {
      case 'similar': return '🔄';
      case 'trending': return '📈';
      case 'personalized': return '🎯';
      case 'bought-together': return '🛍️';
      case 'viewed-together': return '👀';
      default: return '✨';
    }
  }
};
