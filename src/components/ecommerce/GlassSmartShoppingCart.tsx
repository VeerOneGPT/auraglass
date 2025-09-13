'use client';

import React, { useState, useCallback } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useEcommerce, CartItem, ShippingOption } from './GlassEcommerceProvider';

export interface SmartShoppingCartProps {
  className?: string;
  variant?: 'sidebar' | 'page' | 'dropdown';
  showRecommendations?: boolean;
  showShippingCalculator?: boolean;
  showPromoCode?: boolean;
  showSavedItems?: boolean;
  maxItems?: number;
  onCheckout?: () => void;
  onClose?: () => void;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onMoveToWishlist: (itemId: string) => void;
  onSaveForLater: (itemId: string) => void;
  compact?: boolean;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
  onSaveForLater,
  compact = false
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = useCallback(async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  }, [item.id, item.product.stock, onUpdateQuantity]);

  const itemTotal = item.product.price * quantity;
  const isOnSale = item.product.originalPrice && item.product.originalPrice > item.product.price;
  const savings = isOnSale ? (item.product.originalPrice! - item.product.price) * quantity : 0;

  if (compact) {
    return (
      <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3 glass-glass-p-3 glass-glass-border-b glass-glass-border-subtle last:glass-glass-border-b-0">
        <img
          src={item.product.thumbnail || item.product.images[0]}
          alt={item.product.name}
          className="glass-glass-w-12 glass-glass-h-12 object-cover glass-radius"
        />
        
        <div className="glass-glass-flex-1 glass-glass-min-w-0">
          <h3 className="glass-glass-font-medium glass-text-secondary glass-glass-text-sm glass-glass-truncate">
            {item.product.name}
          </h3>
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 mt-1">
            <span className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
              ${item.product.price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="glass-glass-text-xs glass-text-secondary line-through">
                ${item.product.originalPrice!.toFixed(2)}
              </span>
            )}
            <span className="glass-glass-text-xs glass-text-secondary">
              × {quantity}
            </span>
          </div>
        </div>
        
        <div className="glass-glass-text-right">
          <div className="glass-glass-font-medium glass-text-secondary">
            ${itemTotal.toFixed(2)}
          </div>
          {savings > 0 && (
            <div className="glass-glass-text-xs glass-glass-text-primary">
              Save ${savings.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-glass-flex glass-glass-gap-4 glass-glass-p-4 glass-glass-border-b glass-glass-border-subtle last:glass-glass-border-b-0">
      {/* Product Image */}
      <div className="glass-glass-relative">
        <img
          src={item.product.thumbnail || item.product.images[0]}
          alt={item.product.name}
          className="w-20 h-20 object-cover glass-radius-lg"
        />
        {isOnSale && (
          <div className="glass-glass-absolute -glass--glass--glassglass--top-2 -right-2 glass-surface-red glass-glass-text-primary glass-glass-text-xs glass-glass-px-2 glass-glass-py-1 glass-radius-full">
            SALE
          </div>
        )}
        {item.product.availability !== 'in-stock' && (
          <div className="glass-glass-absolute glass-glass-inset-0 glass-surface-dark bg-opacity-50 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-radius-lg">
            <span className="glass-glass-text-primary glass-glass-text-xs glass-glass-font-medium">
              {item.product.availability === 'out-of-stock' ? 'Out of Stock' : 'Pre-order'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="glass-glass-flex-1 glass-glass-min-w-0">
        <div className="glass-glass-flex glass-glass-items-start glass-glass-justify-between">
          <div className="glass-glass-flex-1">
            <h3 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-1">
              {item.product.name}
            </h3>
            
            {item.product.brand && (
              <p className="glass-glass-text-sm glass-text-secondary glass-glass-mb-1">
                Brand: {item.product.brand}
              </p>
            )}
            
            {item.selectedVariants && (
              <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-1 glass-glass-mb-2">
                {Object.entries(item.selectedVariants).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-glass-glass-block glass-glass-px-2 glass-glass-py-1 glass-surface-subtle glass-text-secondary glass-glass-text-xs glass-radius"
                  >
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-mb-3">
              <span className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary">
                ${item.product.price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="glass-glass-text-sm glass-text-secondary line-through">
                  ${item.product.originalPrice!.toFixed(2)}
                </span>
              )}
              {item.product.availability === 'in-stock' && item.product.stock < 10 && (
                <span className="glass-glass-text-xs text-orange-600 bg-orange-50 glass-glass-px-2 glass-glass-py-1 glass-radius">
                  Only {item.product.stock} left
                </span>
              )}
            </div>

            {/* Gift Options */}
            {item.giftWrap && (
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-mb-2">
                <span className="glass-glass-text-sm glass-glass-text-primary">🎁 Gift wrapped</span>
                {item.giftMessage && (
                  <span className="glass-glass-text-xs glass-text-secondary">with message</span>
                )}
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="glass-text-secondary hover:glass-glass-text-primary glass-glass-p-1"
            title="Remove from cart"
          >
            ✕
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-border glass-glass-border-subtle glass-radius">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="glass-glass-px-3 glass-glass-py-1 hover:glass-surface-subtle disabled:opacity-50 disabled:cursor-not-allowed"
              >
                −
              </button>
              
              <span className="glass-glass-px-4 glass-glass-py-1 glass-glass-border-x glass-glass-border-subtle glass-glass-min-glass-w-12 glass-glass-text-center">
                {isUpdating ? '...' : quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.product.stock || isUpdating}
                className="glass-glass-px-3 glass-glass-py-1 hover:glass-surface-subtle disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
              <button
                onClick={() => onSaveForLater(item.id)}
                className="glass-glass-text-xs glass-glass-text-primary hover:glass-glass-text-primary underline"
              >
                Save for later
              </button>
              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="glass-glass-text-xs glass-glass-text-primary hover:glass-glass-text-primary underline"
              >
                Move to wishlist
              </button>
            </div>
          </div>

          {/* Item Total */}
          <div className="glass-glass-text-right">
            <div className="glass-glass-font-semibold glass-text-secondary">
              ${itemTotal.toFixed(2)}
            </div>
            {savings > 0 && (
              <div className="glass-glass-text-sm glass-glass-text-primary">
                You save ${savings.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingCalculator: React.FC<{
  shippingOptions: ShippingOption[];
  selectedShipping?: ShippingOption;
  onShippingSelect: (option: ShippingOption) => void;
  cartSubtotal: number;
}> = ({ shippingOptions, selectedShipping, onShippingSelect, cartSubtotal }) => {
  return (
    <div className="glass-glass-space-y-3">
      <h3 className="glass-glass-font-medium glass-text-secondary">Shipping Options</h3>
      {shippingOptions.map(option => {
        const isFree = option.price === 0 || (option.id === 'standard' && cartSubtotal >= 50);
        const price = isFree ? 0 : option.price;
        
        return (
          <label
            key={option.id}
            className={cn(
              "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors",
              selectedShipping?.id === option.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping?.id === option.id}
                onChange={() => onShippingSelect(option)}
                className="glass-glass-text-primary"
              />
              <div>
                <div className="glass-glass-font-medium glass-text-secondary">
                  {option.name}
                  {isFree && <span className="glass-glass-text-primary ml-2">FREE</span>}
                </div>
                <div className="glass-glass-text-sm glass-text-secondary">
                  {option.description} • {option.estimatedDays} business days
                </div>
              </div>
            </div>
            <div className="glass-glass-font-medium glass-text-secondary">
              {isFree ? 'FREE' : `$${price.toFixed(2)}`}
            </div>
          </label>
        );
      })}
    </div>
  );
};

const PromoCodeInput: React.FC<{
  onApplyPromo: (code: string) => void;
  appliedPromo?: { code: string; discount: number };
}> = ({ onApplyPromo, appliedPromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onApplyPromo(promoCode);
    setPromoCode('');
    setIsApplying(false);
  };

  return (
    <div className="glass-glass-space-y-3">
      <h3 className="glass-glass-font-medium glass-text-secondary">Promo Code</h3>
      
      {appliedPromo ? (
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-p-3 bg-green-50 glass-glass-border glass-glass-border-green-200 glass-radius-lg">
          <div>
            <div className="glass-glass-font-medium glass-glass-text-primary">
              Code "{appliedPromo.code}" applied
            </div>
            <div className="glass-glass-text-sm glass-glass-text-primary">
              You save ${appliedPromo.discount.toFixed(2)}
            </div>
          </div>
          <button className="glass-glass-text-primary hover:glass-glass-text-primary glass-glass-text-sm underline">
            Remove
          </button>
        </div>
      ) : (
        <div className="glass-glass-flex glass-glass-gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="glass-glass-flex-1 glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          />
          <button
            onClick={handleApply}
            disabled={!promoCode.trim() || isApplying}
            className="glass-glass-px-4 glass-glass-py-2 glass-surface-blue glass-glass-text-primary glass-radius-lg hover:glass-surface-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? '...' : 'Apply'}
          </button>
        </div>
      )}
    </div>
  );
};

export const GlassSmartShoppingCart: React.FC<SmartShoppingCartProps> = ({
  className,
  variant = 'sidebar',
  showRecommendations = true,
  showShippingCalculator = true,
  showPromoCode = true,
  showSavedItems = false,
  maxItems = 20,
  onCheckout,
  onClose
}) => {
  const {
    cart,
    updateCartItem,
    removeFromCart,
    addToWishlist,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    getCartItemCount,
    shippingOptions,
    selectedShipping,
    setShippingOption
  } = useEcommerce();

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number }>();
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    updateCartItem(itemId, quantity);
  }, [updateCartItem]);

  const handleRemove = useCallback((itemId: string) => {
    removeFromCart(itemId);
  }, [removeFromCart]);

  const handleMoveToWishlist = useCallback((itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      addToWishlist(item.productId);
      removeFromCart(itemId);
    }
  }, [cart, addToWishlist, removeFromCart]);

  const handleSaveForLater = useCallback((itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      removeFromCart(itemId);
    }
  }, [cart, removeFromCart]);

  const handleApplyPromo = useCallback((code: string) => {
    // Mock promo code validation
    const validCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FREESHIP': cartShipping
    };
    
    if (validCodes[code as keyof typeof validCodes]) {
      setAppliedPromo({ code, discount: validCodes[code as keyof typeof validCodes] });
    }
  }, [cartShipping]);

  const finalTotal = cartTotal - (appliedPromo?.discount || 0);
  const itemCount = getCartItemCount();

  if (cart.length === 0) {
    return (
      <Glass className={cn("p-6", className)}>
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-6xl glass-glass-mb-4">🛒</div>
          <h2 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary glass-glass-mb-2">
            Your cart is empty
          </h2>
          <p className="glass-text-secondary mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={onClose}
            className="glass-glass-px-6 glass-glass-py-3 glass-surface-blue glass-glass-text-primary glass-radius-lg hover:glass-surface-blue transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Glass>
    );
  }

  return (
    <Glass className={cn("overflow-hidden", className)}>
      <div className="glass-glass-flex glass-glass-flex-col glass-glass-h-full">
        {/* Header */}
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-p-6 glass-glass-border-b glass-glass-border-subtle">
          <div>
            <h2 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary">
              Shopping Cart
            </h2>
            <p className="glass-text-secondary">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="glass-text-secondary hover:glass-text-secondary glass-glass-p-2"
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="glass-glass-flex-1 glass-glass-overflow-y-auto">
          <div className="max-h-96 glass-glass-overflow-y-auto">
            {cart.slice(0, maxItems).map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
                onMoveToWishlist={handleMoveToWishlist}
                onSaveForLater={handleSaveForLater}
                compact={variant === 'dropdown'}
              />
            ))}
            
            {cart.length > maxItems && (
              <div className="glass-glass-p-4 glass-glass-text-center glass-text-secondary">
                And {cart.length - maxItems} more items...
              </div>
            )}
          </div>

          {/* Saved Items */}
          {showSavedItems && savedItems.length > 0 && (
            <div className="glass-glass-border-t glass-glass-border-subtle glass-glass-p-4">
              <h3 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-3">
                Saved for Later ({savedItems.length})
              </h3>
              <div className="glass-glass-space-y-2">
                {savedItems.map(item => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={() => {}}
                    onRemove={(id) => setSavedItems(prev => prev.filter(item => item.id !== id))}
                    onMoveToWishlist={handleMoveToWishlist}
                    onSaveForLater={() => {}}
                    compact
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="glass-glass-border-t glass-glass-border-subtle glass-glass-p-6 glass-glass-space-y-4">
          {/* Shipping Calculator */}
          {showShippingCalculator && (
            <ShippingCalculator
              shippingOptions={shippingOptions}
              selectedShipping={selectedShipping}
              onShippingSelect={setShippingOption}
              cartSubtotal={cartSubtotal}
            />
          )}

          {/* Promo Code */}
          {showPromoCode && (
            <PromoCodeInput
              onApplyPromo={handleApplyPromo}
              appliedPromo={appliedPromo}
            />
          )}

          {/* Order Summary */}
          <div className="glass-glass-space-y-2 pt-4 glass-glass-border-t glass-glass-border-subtle">
            <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm">
              <span>Subtotal:</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            
            {cartShipping > 0 && (
              <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm">
                <span>Shipping:</span>
                <span>${cartShipping.toFixed(2)}</span>
              </div>
            )}
            
            <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm">
              <span>Tax:</span>
              <span>${cartTax.toFixed(2)}</span>
            </div>
            
            {appliedPromo && (
              <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm glass-glass-text-primary">
                <span>Promo ({appliedPromo.code}):</span>
                <span>-${appliedPromo.discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-lg glass-glass-font-semibold pt-2 glass-glass-border-t glass-glass-border-subtle">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className="glass-glass-w-full glass-glass-py-3 glass-surface-blue glass-glass-text-primary glass-glass-font-medium glass-radius-lg hover:glass-surface-blue transition-colors"
          >
            Proceed to Checkout
          </button>

          {/* Security Badge */}
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-gap-2 glass-glass-text-xs glass-text-secondary">
            <span>🔒</span>
            <span>Secure checkout with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </Glass>
  );
};
