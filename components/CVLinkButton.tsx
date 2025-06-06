
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
  className = "btn-base gradient-bg-alt", 
  iconClass = "fas fa-file-lines", 
  text = "View HTML CV",
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
  
  // Ensure focus-visible-outline is always part of the className for accessibility
  // If className prop doesn't include btn-base, it might look unstyled.
  // It's better if the consuming component ensures btn-base is there or this component forces it.
  // For now, we assume className will include btn-base if a full button style is desired.
  const combinedClassName = `${className} focus-visible-outline`;

  if (personalInfoData.cvUrl.startsWith('http') || target === "_blank" || personalInfoData.cvUrl.endsWith('.pdf')) { // Added check for PDF
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
