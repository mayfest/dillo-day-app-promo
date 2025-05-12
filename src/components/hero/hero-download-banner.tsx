import React, { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
}

const HeroDownloadBanner = () => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<Dot[]>([]);
  const [brightDots, setBrightDots] = useState(new Set<number>());
  const patternIndex = useRef(0);
  const intervalId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  const DOT_SIZE = 20;
  const SPACING = DOT_SIZE + 15;
  const PATTERN_DURATION = 5000;
  const BORDER_TOP = 32;
  const BORDER_BOTTOM = 32;
  const BORDER_LEFT = 32;
  const BORDER_RIGHT = 32;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      setLayout({ width, height });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const { width: w, height: h } = layout;
    if (!w || !h) return;
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
  }, [layout]);

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
        className='w-full h-128 bg-[#D61919] rounded-lg overflow-hidden relative'
      >
        {dots.map(({ x, y }, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 rounded-full bg-amber-200 z-10 shadow-lg ${
              brightDots.has(i) ? 'bg-white shadow-yellow-300 shadow-2xl' : ''
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
        <div
          className='absolute inset-8 bg-white rounded-md z-20
             flex flex-col divide-[#173885] divide-y-3 overflow-hidden'
        >
          {[
            {
              key: 'announce',
              content: 'NOW ANNOUNCING',
              size: 'text-5xl',
              flex: 'flex-1',
            },
            {
              key: 'app',
              content: ['THE DILLO DAY MOBILE APP'],
              size: 'text-6xl',
              flex: 'flex-[2]',
            },
            {
              key: 'scroll',
              content: 'SCROLL DOWN FOR MORE',
              size: 'text-3xl',
              flex: 'flex-1',
            },
          ].map(({ key, content, size, flex }) => (
            <div
              key={key}
              className={`${flex} flex flex-col items-center justify-center px-4`}
            >
              {Array.isArray(content) ? (
                content.map((line, i) => (
                  <p
                    key={i}
                    className={`w-full text-center ${size} font-semibold text-[#2E3171] leading-tight font-rye`}
                  >
                    {line}
                  </p>
                ))
              ) : (
                <p
                  className={`w-full text-center ${size} font-semibold text-[#2E3171] leading-tight font-poppins`}
                >
                  {content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDownloadBanner;
