export const DEFAULT_GRID_CONFIGS = {
  breakpoints: [
    // Breakpoints for different screen sizes
    { width: 1920, columns: 9 },
    { width: 1200, columns: 5 },
    { width: 1024, columns: 4 },
    { width: 768, columns: 3 },
    { width: 320, columns: 2 },
    { width: 0, columns: 1 },
  ],
  gap: 16, // Gap between columns and rows in pixels
  buffer: 10, // Percentage of the viewport height to use as a buffer for pre-loading items
};

export const PHOTOS_PER_PAGE = 60;
