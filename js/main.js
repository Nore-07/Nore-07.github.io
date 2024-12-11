const header = document.querySelector('.header');

// Define the classes for header states
const maxHeightClass = 'normal';
const minHeightClass = 'small';

// Variables to track scroll positions
let lastScrollY = window.scrollY;
let scrollDownThreshold = 50; // Smaller threshold for scrolling down (shrinking)
let scrollUpThreshold = 150; // Larger threshold for scrolling up (expanding)
let cumulativeScroll = 0; // Tracks the cumulative scroll direction

// Flag to track the current size state of the header
let isSmall = false;

// Listen to the scroll event
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Calculate the scroll delta
  const scrollDelta = currentScrollY - lastScrollY;

  // Accumulate scroll deltas based on direction
  if (scrollDelta > 0) {
    // Scrolling down
    cumulativeScroll += scrollDelta;
    if (!isSmall && cumulativeScroll >= scrollDownThreshold) {
      // Shrink header if threshold is met
      header.classList.add(minHeightClass);
      header.classList.remove(maxHeightClass);
      isSmall = true;
      cumulativeScroll = 0; // Reset cumulative scroll
    }
  } else if (scrollDelta < 0) {
    // Scrolling up
    cumulativeScroll += Math.abs(scrollDelta); // Note: scrollDelta is negative, so we use absolute value
    if (isSmall && cumulativeScroll >= scrollUpThreshold) {
      // Expand header if threshold is met
      header.classList.remove(minHeightClass);
      header.classList.add(maxHeightClass);
      isSmall = false;
      cumulativeScroll = 0; // Reset cumulative scroll
    }
  }

  // Update last scroll position
  lastScrollY = currentScrollY;
});
