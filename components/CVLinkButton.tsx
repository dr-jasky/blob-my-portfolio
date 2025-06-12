import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData } from '../data';

interface CVLinkButtonProps {
  className?: string;
  iconClass?: string;
  text?: string;
  target?: string; 
}

export const CVLinkButton: React.FC<CVLinkButtonProps> = ({
  className = "btn-base btn-gradient-primary", // Default to new theme's gradient button
  iconClass = "fas fa-file-alt", // Default icon from new theme
  text = "HTML CV", // Default text from new theme
  target,
}) => {
  if (!personalInfoData.cvUrl) {
    console.warn("CVLinkButton: cvUrl is not configured in personalInfoData.");
    return null; 
  }

  const content = (
    <>
      {iconClass && <i className={iconClass}></i>}
      {text}
    </>
  );
  
  // Ensure focus-visible-outline is always applied for accessibility
  const combinedClassName = `${className} focus-visible-outline`; 

  if (personalInfoData.cvUrl.startsWith('http') || target === "_blank" || personalInfoData.cvUrl.endsWith('.pdf')) {
    return (
      <a 
        href={personalInfoData.cvUrl} 
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link 
      to={personalInfoData.cvUrl} 
      className={combinedClassName}
    >
      {content}
    </Link>
  );
};
