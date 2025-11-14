import type React from 'react';

export interface Link {
  title: string;
  url: string;
  icon: React.ReactNode;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface Gospel {
    passage: string;
    text: string;
}