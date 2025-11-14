import React from 'react';
import type { SocialLink } from '../types';

interface SocialIconProps {
  social: SocialLink;
}

const SocialIcon: React.FC<SocialIconProps> = ({ social }) => {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      className="text-white hover:text-orange-300 transition-colors duration-300 transform hover:scale-110"
    >
      <span className="text-shadow">{social.icon}</span>
    </a>
  );
};

export default SocialIcon;