import { useEffect} from 'react';

const useScrollReveal = (ref: React.MutableRefObject<HTMLElement | null>) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const revealPosition = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (revealPosition < windowHeight) {
          ref.current.classList.add('animate-fadeIn');
        } else {
          ref.current.classList.remove('animate-fadeIn');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
};

export default useScrollReveal;
