import { useEffect } from 'react';
import { useMatches } from 'react-router';

const usePageTitle = (defaultTitle = 'Nexus Living') => {
  const matches = useMatches();

  useEffect(() => {
    
    const lastMatchWithTitle = [...matches].reverse().find(m => m.handle?.title);
    
    const title = lastMatchWithTitle?.handle?.title;

    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }, [matches, defaultTitle]);
};

export default usePageTitle;