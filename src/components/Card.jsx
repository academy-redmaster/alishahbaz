const Card = ({ 
  children, 
  className = "", 
  onClick, 
  href, 
  target, 
  rel,
  ...props 
}) => {
  const baseClassName = `group relative rounded-2xl overflow-hidden transition-all duration-300 ${className}`;
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClassName}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <div className={baseClassName} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;