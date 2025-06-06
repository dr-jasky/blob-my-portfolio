
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
  titleAs = 'h2'
}) => {
  const TitleComponent = titleAs;

  return (
    <section id={id} className={`py-24 md:py-28 relative ${className}`}> {/* Increased vertical padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20"> 
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && (
            <p className="text-lg md:text-xl text-text-muted mt-1 max-w-3xl mx-auto"> 
              {/* Removed inline style for 'top'. CSS in index.html will handle spacing */}
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
