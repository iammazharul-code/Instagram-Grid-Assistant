import React from 'react';

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Settings" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
);

export const DownChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Down Chevron" className={className} fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9a.999.999 0 0 1 1.414 0l9 9a.999.999 0 0 1-.707 1.707Z" transform="rotate(180 12 12)"></path></svg>
);

export const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Posts" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
);

export const ReelsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Reels" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="3" y2="13.44"></line></svg>
);

export const TaggedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Posts with you" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M10.201 1.854a3.903 3.903 0 0 0-2.828 0L.908 5.708a3.903 3.903 0 0 0-1.954 3.409v6.766a3.903 3.903 0 0 0 1.954 3.409l6.465 3.854a3.903 3.903 0 0 0 2.828 0l6.465-3.854a3.903 3.903 0 0 0 1.954-3.409V9.117a3.903 3.903 0 0 0-1.954-3.409L10.201 1.854ZM12 14.25a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.5" x2="16.5" y1="7.5" y2="7.5"></line></svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-label="Home" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.001 16.502v-3.001a1.5 1.5 0 1 1 3 0v3.001a.75.75 0 0 0 .75.75h2.25a2.25 2.25 0 0 0 2.25-2.25V9.333a2.251 2.251 0 0 0-1.021-1.91l-4.502-3.001a1.5 1.5 0 0 0-1.456 0l-4.502 3.001a2.251 2.251 0 0 0-1.021 1.91v5.669a2.25 2.25 0 0 0 2.25 2.25H8.25a.75.75 0 0 0 .75-.75Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-label="Search" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M18.5 10.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line></svg>
);

export const NewPostIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-label="New post" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line></svg>
);

export const AddStoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Add to your story" className={className} fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M12 2.75a.75.75 0 0 1 .75.75v7.75h7.75a.75.75 0 0 1 0 1.5h-7.75v7.75a.75.75 0 0 1-1.5 0v-7.75H2.75a.75.75 0 0 1 0-1.5h7.75V3.5a.75.75 0 0 1 .75-.75Z"></path></svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const CreateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-label="Create" className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5a1 1 0 0 1 1-1z"></path></svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);