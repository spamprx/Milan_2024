import React, { useState, useEffect, useRef } from 'react';

const IOSStyleScrollbar = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
    setIsScrolling(true);
    clearTimeout(containerRef.current.scrollTimer);
    containerRef.current.scrollTimer = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const getScrollThumbHeight = () => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const scrollRatio = containerHeight / contentHeight;
    return Math.max(scrollRatio * containerHeight, 20); // Minimum thumb height of 20px
  };

  const getScrollThumbTop = () => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const maxScrollTop = contentHeight - containerHeight;
    const scrollRatio = scrollTop / maxScrollTop;
    return scrollRatio * (containerHeight - getScrollThumbHeight());
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-64 overflow-y-auto pr-3"
      onScroll={handleScroll}
    >
      <div ref={contentRef} className="pr-3">
        {children}
      </div>
      {isScrolling && contentHeight > containerRef.current?.clientHeight && (
        <div 
          className="absolute top-0 right-0 w-2 h-full bg-transparent"
        >
          <div
            className="w-full rounded-full bg-gray-500 opacity-50 transition-opacity duration-300"
            style={{
              height: `${getScrollThumbHeight()}px`,
              transform: `translateY(${getScrollThumbTop()}px)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default IOSStyleScrollbar;