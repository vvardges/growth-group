import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user has scrolled to the bottom of the page or is near it.
 * @param buffer - The buffer percentage (0 to 100) that determines how close the user needs to be to the bottom of the page to be considered "at the bottom" (default is 10%).
 *
 * @returns `true` if the user is at or near the bottom of the page (within the specified buffer), otherwise `false`.
 */
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
