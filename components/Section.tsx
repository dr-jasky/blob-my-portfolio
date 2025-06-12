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
  titleClassName = '', // e.g., "accented" for gradient text
  subtitle ,
  titleAs = 'h2' 
}) => {
  const TitleComponent = titleAs;

  return (
    <section id={id} className={`py-16 md:py-20 relative ${className}`}> {/* Theme's padding */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16"> {/* Theme's margin */}
          <TitleComponent className={`section-title-custom text-3xl md:text-4xl ${titleClassName}`}> {/* Theme's title class */}
            {title}
          </TitleComponent>
          {subtitle && (
            <p className="text-lg text-gray-400 mt-5 max-w-3xl mx-auto leading-relaxed"> {/* Theme's text color and margin */}
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
