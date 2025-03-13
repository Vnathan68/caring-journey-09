
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar, User, Heart, Menu as MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
    // Close services dropdown when route changes
    setIsServicesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '#', dropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Obstetrics', path: '/services/obstetrics', icon: Heart },
    { name: 'Gynecology', path: '/services/gynecology', icon: User },
    { name: 'Family Planning', path: '/services/family-planning', icon: Calendar },
  ];

  const renderLinks = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.name} className="relative">
          {link.dropdown ? (
            <div className="relative">
              <button
                className={cn(
                  "flex items-center font-medium py-2 transition-colors",
                  "hover:text-clinic-600 focus:outline-none",
                  isServicesOpen ? "text-clinic-600" : ""
                )}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                {link.name}
                <ChevronDown 
                  className={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180"
                  )} 
                />
              </button>

              {isServicesOpen && (
                <div className="absolute mt-2 w-56 rounded-xl shadow-lg glass-panel overflow-hidden z-50">
                  <ul className="py-2">
                    {serviceLinks.map((service) => (
                      <li key={service.name}>
                        <Link
                          to={service.path}
                          className="flex items-center px-4 py-3 text-sm hover:bg-clinic-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <service.icon className="h-4 w-4 mr-2 text-clinic-500" />
                          <span>{service.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={link.path}
              className={cn(
                "font-medium py-2 transition-colors",
                "hover:text-clinic-600",
                location.pathname === link.path && "text-clinic-600"
              )}
            >
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-clinic-600" />
          <span className="font-poppins font-semibold text-xl">Santa Matilda</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            {renderLinks()}
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button
                variant="link"
                className="text-foreground hover:text-clinic-600"
                asChild
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={logout}
                className="hover:bg-clinic-50 hover:text-clinic-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hover:bg-clinic-50 hover:text-clinic-600"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="bg-clinic-600 hover:bg-clinic-700 text-white"
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-40 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 mt-8">
            <ul className="space-y-6 text-lg">
              {renderLinks()}
            </ul>
          </nav>

          <div className="mt-auto mb-8 space-y-4">
            {isAuthenticated ? (
              <>
                <Button
                  className="w-full bg-clinic-600 hover:bg-clinic-700 text-white"
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full border-clinic-200 hover:bg-clinic-50 text-foreground"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full bg-clinic-600 hover:bg-clinic-700 text-white"
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-clinic-200 hover:bg-clinic-50 text-foreground"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
