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
  className = "gradient-bg text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition inline-flex items-center focus-visible-outline",
  iconClass = "fas fa-file-alt mr-2", 
  text = "View HTML CV",
  target,
}) => {
  if (!personalInfoData.cvUrl) {
    console.warn("CVLinkButton: cvUrl is not configured in personalInfoData.");
    return null; 
  }

  const content = (
    <>
      <i className={iconClass}></i>
      {text}
    </>
  );
  
  // If cvUrl is an external link or meant to open in new tab
  if (personalInfoData.cvUrl.startsWith('http') || target === "_blank") {
    return (
      <a 
        href={personalInfoData.cvUrl} 
        className={`${className} focus-visible-outline`} // Ensure focus outline is applied
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  // Link to the HTML CV page (e.g., /cv-html)
  return (
    <Link 
      to={personalInfoData.cvUrl} 
      className={`${className} focus-visible-outline`} // Ensure focus outline is applied
    >
      {content}
    </Link>
  );
};