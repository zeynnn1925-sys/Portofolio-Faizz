/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import { RoomExperience } from './room/RoomExperience';
import NotFound from './components/NotFound';

export default function App() {
  const [path, setPath] = useState(() => {
    const pathname = window.location.pathname;
    if (pathname !== '/' && pathname !== '/index.html' && pathname !== '') {
      return '404';
    }
    if (window.location.hash === '#404') {
      return '404';
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname !== '/' && pathname !== '/index.html' && pathname !== '') {
        setPath('404');
      } else if (hash === '#404') {
        setPath('404');
      } else {
        setPath('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    setPath('home');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-bone-light select-text selection:bg-amber-clay selection:text-ink-navy">
      <CustomCursor />
      {path === 'home' ? (
        <main className="w-full h-full relative overflow-hidden">
          <RoomExperience />
        </main>
      ) : (
        <NotFound onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

