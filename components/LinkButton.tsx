import React from 'react';
import type { Link } from '../types';

interface LinkButtonProps {
  link: Link;
  onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, onClick }) => {
  const commonClasses = "w-full bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3 text-center text-shadow";

  const content = (
    <>
      {link.icon}
      <span className="truncate">{link.title}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={commonClasses}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      {content}
    </a>
  );
};

export default LinkButton;