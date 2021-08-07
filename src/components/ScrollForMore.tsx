import { useEffect, useState } from 'react';

export default function ScrollForMore() {
  const [shown, setIsShown] = useState(true);
  useEffect(() => {
    const handler = () => {};
    window.addEventListener('scroll', handler);
  }, []);
}
