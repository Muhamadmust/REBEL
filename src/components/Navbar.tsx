import React from 'react';
import { ShoppingBag, Menu, X, SlidersHorizontal } from 'lucide-react';
import { PageRoute } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  cartCount: number;
  onOpenCart: () => void;
  useColorBlockImages?: boolean;
  onToggleImageMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  useColorBlockImages = false,
  onToggleImageMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Shop', route: { name: 'shop' } as PageRoute },
    { label: 'Lookbook', route: { name: 'lookbook' } as PageRoute },
    { label: 'About', route: { name: 'about' } as PageRoute },
    { label: 'Contact', route: { name: 'contact' } as PageRoute },
  ];

  const isCurrent = (name: string) => currentPage.name === name;

  return (
    <header className="sticky top-0 z-40 bg-[#141810] text-[#F2F0E2] border-b border-[#3B4A2F]/60 transition-colors">
      {/* Top Banner */}
      <div className="text-[11px] uppercase tracking-[0.25em] py-1.5 px-4 text-center border-b border-[#3B4A2F]/50 bg-[#1C2217] text-[#C7CBA9] flex items-center justify-center gap-2">
        <span>Collection 01</span>
        <span className="opacity-40">•</span>
        <span>Lagos, Nigeria</span>
        <span className="opacity-40">•</span>
        <span>Worn On Your Terms</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`nav-link-${link.label.toLowerCase()}`}
              onClick={() => onNavigate(link.route)}
              className={`transition-colors duration-200 py-1 relative ${
                isCurrent(link.route.name)
                  ? 'text-[#8DA05C] font-semibold'
                  : 'text-[#F2F0E2]/80 hover:text-[#8DA05C]'
              }`}
            >
              {link.label}
              {isCurrent(link.route.name) && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8DA05C]" />
              )}
            </button>
          ))}
        </nav>

        {/* Center: Brand Wordmark */}
        <div className="flex-1 md:flex-initial text-left md:text-center">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate({ name: 'home' })}
            className="group inline-flex flex-col items-start md:items-center cursor-pointer"
          >
            <span className="font-serif-heading text-2xl sm:text-3xl font-normal tracking-[0.18em] text-[#F2F0E2] group-hover:text-[#8DA05C] transition-colors">
              REBEL
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#8DA05C] -mt-1 font-mono">
              Streetwear Label
            </span>
          </button>
        </div>

        {/* Right: Mode & Cart */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {onToggleImageMode && (
            <button
              id="toggle-image-mode-btn"
              onClick={onToggleImageMode}
              title={useColorBlockImages ? "Switch to Editorial Photography" : "Switch to Monochrome Palette Block Mode"}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider border border-[#3B4A2F] text-[#C7CBA9] hover:border-[#8DA05C] hover:text-[#8DA05C] transition-colors"
            >
              <SlidersHorizontal size={11} />
              <span>{useColorBlockImages ? 'Palette Mode' : 'Photography'}</span>
            </button>
          )}

          {/* Cart Bag */}
          <button
            id="cart-drawer-trigger-btn"
            onClick={onOpenCart}
            aria-label="View Shopping Bag"
            className="p-2 flex items-center gap-1.5 text-[#F2F0E2] hover:text-[#8DA05C] transition-colors relative"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-widest text-[#8DA05C]">
              ({cartCount})
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#F2F0E2] hover:text-[#8DA05C]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#3B4A2F] bg-[#141810] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-4 text-xs uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-[#3B4A2F]/40 ${
                  isCurrent(link.route.name)
                    ? 'text-[#8DA05C] font-semibold'
                    : 'text-[#F2F0E2]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {onToggleImageMode && (
            <div className="pt-2 flex items-center justify-between border-t border-[#3B4A2F]">
              <button
                onClick={onToggleImageMode}
                className="text-[11px] uppercase tracking-wider text-[#C7CBA9] hover:text-[#8DA05C] flex items-center gap-2"
              >
                <SlidersHorizontal size={13} />
                <span>Mode: {useColorBlockImages ? 'Palette Mode' : 'Photography'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
