export default {
  breakpoints: [
    // Breakpoints for different screen sizes
    { width: 1920, columns: 6 },
    { width: 1200, columns: 5 },
    { width: 1024, columns: 4 },
    { width: 768, columns: 3 },
    { width: 320, columns: 2 },
    { width: 0, columns: 1 },
  ],
  gap: 16, // Gap between columns and rows in pixels
  buffer: 10, // Percentage of the viewport height to use as a buffer for pre-loading items
};
