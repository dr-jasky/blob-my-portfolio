
import React from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  titleAs?: 'h1' | 'h2' | 'h3'; 
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  id, 
  children, 
  className = '', 
  titleClassName = '', 
  subtitle ,
  titleAs = 'h2' // Default to h2 for sections
}) => {
  const TitleComponent = titleAs;

  return (
    <section id={id} className={`py-20 md:py-24 xl:py-28 relative ${className}`}> {/* Standardized padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">  {/* Consistent bottom margin */}
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && (
            <p className="text-md md:text-lg text-text-muted mt-4 max-w-3xl mx-auto leading-relaxed"> {/* Adjusted mt and text size */}
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
