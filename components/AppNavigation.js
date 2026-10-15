'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupabaseSession } from './SupabaseSession';

const links = [
  { href: '/', icon: '⌂', label: 'Explore' },
  { href: '/say', icon: '↗', label: 'Say it' },
  { href: '/saved', icon: '☆', label: 'My Kannada' },
  { href: '/account', icon: '◎', label: 'Account' },
];

export default function AppNavigation() {
  const pathname = usePathname();
  const { user } = useSupabaseSession();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('kc_theme') === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('kc_theme', next);
    setDark(next === 'dark');
  }

  const isActive = link => pathname === link.href || (link.href === '/' && pathname.startsWith('/pack/'));

  return (
    <>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Kannada Companion home"><span className="brand-mark" aria-hidden="true">ಕ</span><span>Kannada <b>Companion</b></span></Link>
        <nav className="desktop-links" aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} className={isActive(link) ? 'active' : ''}>{link.href === '/account' && user ? 'Account' : link.href === '/account' ? 'Sign in' : link.label}</Link>)}
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title={`Switch to ${dark ? 'light' : 'dark'} theme`}><span aria-hidden="true">{dark ? '☼' : '◐'}</span></button>
      </header>
      <nav className="bottom-nav" aria-label="Main navigation">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={isActive(link) ? 'active' : ''}><span className="nav-icon" aria-hidden="true">{link.icon}</span><span>{link.href === '/account' && !user ? 'Sign in' : link.label}</span></Link>)}
      </nav>
    </>
  );
}