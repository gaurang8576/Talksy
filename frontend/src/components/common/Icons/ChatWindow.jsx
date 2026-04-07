import React from 'react';

export const SendIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="m21.45 11.11-18-9c-.31-.15-.68-.14-.97.04s-.47.5-.47.85v18a1 1 0 0 0 1 1c.15 0 .31-.04.45-.11l18-9c.34-.17.55-.52.55-.89s-.21-.73-.55-.89ZM4 4.62 16.76 11H4zM4 13h12.76L4 19.38z"></path>
  </svg>
);

export const PaperClipIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className} style={{ transform: 'rotate(315deg)' }}>
    <path d="M17 5H9c-3.86 0-7 3.14-7 7s3.14 7 7 7h9v-2H9c-2.76 0-5-2.24-5-5s2.24-5 5-5h8c.79 0 1.54.31 2.11.89a2.967 2.967 0 0 1 .01 4.23 3 3 0 0 1-2.12.89H9c-.26 0-.5-.11-.7-.3-.19-.2-.3-.44-.3-.7s.11-.51.3-.7.44-.3.7-.3h8v-2H9c-.79 0-1.54.32-2.11.89S6 11.22 6 12.01s.31 1.54.89 2.11c.57.57 1.32.89 2.11.89h8c1.32 0 2.58-.52 3.53-1.47S22 11.34 22 10.01s-.52-2.58-1.47-3.53a4.95 4.95 0 0 0-3.52-1.47Z"></path>
  </svg>
);

export const MicIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M16 12V6c0-2.21-1.79-4-4-4S8 3.79 8 6v6c0 2.21 1.79 4 4 4s4-1.79 4-4m-6 0V6c0-1.1.9-2 2-2s2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2"></path>
    <path d="M18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6H4c0 4.07 3.06 7.44 7 7.93V22h2v-2.07c3.94-.49 7-3.86 7-7.93z"></path>
  </svg>
);
