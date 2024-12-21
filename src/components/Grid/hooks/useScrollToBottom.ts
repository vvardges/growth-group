import { useState, useEffect } from 'react';

const useScrollToBottom = (buffer: number = 10) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop - clientHeight <=
      (scrollHeight * buffer) / 100
    ) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => checkScrollPosition();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return isAtBottom;
};

export default useScrollToBottom;
