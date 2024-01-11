// client/src/utils/Utils.js

export const STRAPI_CMS_URL = process.env.REACT_APP_STRAPI_BASE_URL;
export const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
export const REACT_MODE = process.env.NODE_ENV;

// 2023-10-31 -> 31.10.2023
export function formatDate(inputDate) {
  const dateParts = inputDate.split('-');
  if (dateParts.length !== 3) {
    // Invalid input date format
    return 'Invalid Date';
  }

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Create a new formatted date string
  return `${day}.${month}.${year}`;
}

// 2023-10-31 -> 10/2023
export function formatDateShort(inputDate) {
  const dateParts = inputDate.split('-');
  if (dateParts.length !== 3) {
    // Invalid input date format
    return 'Invalid Date';
  }

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Create a new formatted date string
  return `${month}/${year}`;
}

// publishedAt -> 02.12.2023
export function formatPublishedAt(inputDateString) {
  const inputDate = new Date(inputDateString);
  
  // Extracting date components
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
  const year = inputDate.getUTCFullYear();

  // Formatting the date
  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}

export function extractYouTubeVideoId(url) {
  // Regular expression to match YouTube video ID
  const regex = /[?&]v=([^?&]+)/;

  // Extract the video ID using the regular expression
  const match = url.match(regex);

  // If there's a match, return the video ID, otherwise return null
  return match ? match[1] : null;
}

export function replaceSpacesWithHyphen(inputString) {
  // Use the replace method with a regular expression to replace spaces with hyphens
  return inputString.replace(/ /g, '-');
}

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export function getInitials(name) {
  // Split the name into words
  const words = name.split(' ');

  // Get the first letter of each word
  const initials = words.map(word => word.charAt(0));

  // Combine the initials
  const result = initials.join('');

  return result;
}

export function getFirstName(fullName) {
  // Split the full name into an array of words
  const nameArray = fullName.split(' ');

  // Take the first element of the array as the first name
  const firstName = nameArray[0];

  // If there is a second word, append its first character with a dot
  if (nameArray.length > 1) {
    const secondWordInitial = nameArray[1].charAt(0);
    return `${firstName} ${secondWordInitial}.`;
  }

  // If there is only one word, return it as is
  return firstName;
}