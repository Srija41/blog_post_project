import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navBar}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        BlogApp
      </Link>

      {/* Desktop Links */}
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Hamburger Button */}
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
