// Calculate the angle of the letter around the circle
// There are 26 letters in the alphabet, so each letter
// is spaced 360 / 26 = 13.846 degrees apart
const angle = 13.846;

// Calculate the x and y coordinates of the letter
const x = 50 + 50 * Math.cos(angle);
const y = 50 + 50 * Math.sin(angle);