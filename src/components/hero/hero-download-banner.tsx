import React, { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
}

const HeroDownloadBanner = () => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<Dot[]>([]);
  const [brightDots, setBrightDots] = useState(new Set<number>());
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const patternIndex = useRef(0);
  const intervalId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  const DOT_SIZE = 20;
  const SPACING = DOT_SIZE + 15;
  const PATTERN_DURATION = 5000;

  const containerRef = useRef<HTMLDivElement>(null);

  // Get responsive border values based on screen size
  const getBorders = () => {
    const width = screenSize.width;
    if (width >= 768) {
      // md breakpoint
      return { top: 32, bottom: 32, left: 32, right: 32 };
    } else if (width >= 640) {
      // sm breakpoint
      return { top: 24, bottom: 24, left: 24, right: 24 };
    } else {
      return { top: 16, bottom: 16, left: 16, right: 16 };
    }
  };

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      setLayout({ width, height });
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const { width: w, height: h } = layout;
    if (!w || !h) return;

    const borders = getBorders();
    const BORDER_TOP = borders.top;
    const BORDER_BOTTOM = borders.bottom;
    const BORDER_LEFT = borders.left;
    const BORDER_RIGHT = borders.right;

    const topY = BORDER_TOP / 2 - DOT_SIZE / 2;
    const botY = h - BORDER_BOTTOM / 2 - DOT_SIZE / 2;
    const leftX = BORDER_LEFT / 2 - DOT_SIZE / 2;
    const rightX = w - BORDER_RIGHT / 2 - DOT_SIZE / 2;
    const countH = Math.floor((w - BORDER_LEFT - BORDER_RIGHT) / SPACING) + 1;
    const countV = Math.floor((h - BORDER_TOP - BORDER_BOTTOM) / SPACING) + 1;
    const stepX =
      (w - BORDER_LEFT - BORDER_RIGHT - DOT_SIZE) / Math.max(1, countH - 1);
    const stepY =
      (h - BORDER_TOP - BORDER_BOTTOM - DOT_SIZE) / Math.max(1, countV - 1);

    const newDots: Dot[] = [];
    for (let i = 0; i < countH; i++)
      newDots.push({ x: BORDER_LEFT + i * stepX, y: topY });
    for (let i = 0; i < countV; i++)
      newDots.push({ x: rightX, y: BORDER_TOP + i * stepY });
    for (let i = countH - 1; i >= 0; i--)
      newDots.push({ x: BORDER_LEFT + i * stepX, y: botY });
    for (let i = countV - 1; i >= 0; i--)
      newDots.push({ x: leftX, y: BORDER_TOP + i * stepY });
    setDots(newDots);
  }, [layout, screenSize]);

  const patterns = React.useMemo(
    () => [
      (all: Dot[]) => {
        let idx = 0;
        return setInterval(() => {
          setBrightDots(new Set([idx]));
          idx = (idx + 1) % all.length;
        }, 100);
      },
      (all: Dot[]) => {
        let idx = 0,
          trail = 5;
        return setInterval(() => {
          const s = new Set<number>();
          for (let i = 0; i < trail; i++) s.add((idx + i) % all.length);
          setBrightDots(s);
          idx = (idx + 1) % all.length;
        }, 100);
      },
      (all: Dot[]) =>
        setInterval(() => {
          const s = new Set<number>();
          for (let i = 0; i < all.length / 3; i++)
            s.add(Math.floor(Math.random() * all.length));
          setBrightDots(s);
        }, 300),
      (all: Dot[]) => {
        let on = false;
        return setInterval(() => {
          setBrightDots(on ? new Set() : new Set(all.map((_, i) => i)));
          on = !on;
        }, 500);
      },
    ],
    []
  );

  useEffect(() => {
    if (!dots.length) return;
    if (intervalId.current) clearInterval(intervalId.current);
    if (timeoutId.current) clearTimeout(timeoutId.current);
    function start() {
      intervalId.current = patterns[patternIndex.current](dots);
      timeoutId.current = setTimeout(() => {
        if (intervalId.current) clearInterval(intervalId.current);
        patternIndex.current = (patternIndex.current + 1) % patterns.length;
        start();
      }, PATTERN_DURATION);
    }
    start();
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [dots, patterns]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div
        ref={containerRef}
        className='w-full min-h-[36rem] sm:min-h-[40rem] md:h-128 relative overflow-visible'
      >
        {/* RED BACKGROUND with lights */}
        <div className='absolute inset-0 bg-[#D61919] rounded-lg z-0' />

        {/* Lights */}
        {dots.map(({ x, y }, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 rounded-full z-10 ${
              brightDots.has(i)
                ? 'bg-white shadow-yellow-300 shadow-2xl'
                : 'bg-amber-200 shadow-md'
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              boxShadow: brightDots.has(i)
                ? '0 0 15px 5px rgba(255,235,59,0.8)'
                : '0 0 5px 2px rgba(249,231,159,0.7)',
            }}
          />
        ))}

        {/* White content container */}
        <div
          className='absolute inset-4 sm:inset-6 md:inset-8 bg-white rounded-md z-5
          flex flex-col divide-[#173885] divide-y-2 overflow-hidden text-wrap'
        >
          {/* Top content: NOW ANNOUNCING */}
          <div className='flex-1 flex flex-col items-center justify-center px-4 py-2 text-center'>
            <p className='w-full text-3xl md:text-6xl font-poppins font-semibold text-[#2E3171] leading-snug break-words text-balance'>
              NOW ANNOUNCING
            </p>
          </div>

          {/* Middle content: THE DILLO DAY MOBILE APP */}
          <div className='flex-[2] flex flex-col items-center justify-center px-4 py-2 text-center'>
            <p className='w-full text-5xl md:text-7xl font-rye font-semibold text-[#2E3171] leading-snug break-words text-balance'>
              THE DILLO DAY MOBILE APP
            </p>
          </div>

          {/* Bottom content: Store badges */}
          <div className='flex-1 flex flex-row items-center justify-center gap-6 px-4 py-4'>
            <a
              href='https://github.com/ethanpaneraa/dillo-53-apk-host/releases/download/AndroidBuild/application-f83034e0-da7f-4506-a7e1-b00430e1d06a.apk'
              target='_blank'
              rel='noopener noreferrer'
              className='block w-48 h-24 md:w-58 md:h-52 transition-transform hover:scale-105'
              aria-label='Download on Google Play'
            >
              <img
                src={`${import.meta.env.BASE_URL}google-play.png`}
                alt='Download on Google Play'
                className='w-full h-full object-contain'
              />
            </a>
            <a
              href='https://apps.apple.com/us/app/dillo-day-2025/id6745717280'
              target='_blank'
              rel='noopener noreferrer'
              className='block w-40 h-14 md:w-52 md:h-16 transition-transform hover:scale-105'
              aria-label='Download on the App Store'
            >
              <img
                src={`${import.meta.env.BASE_URL}app-store.svg`}
                alt='Download on the App Store'
                className='w-full h-full object-contain'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDownloadBanner;
