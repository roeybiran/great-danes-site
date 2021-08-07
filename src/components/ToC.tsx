import { useEffect, useState } from 'react';

interface Props {
  baseClass: string;
  activeClass: string;
  entries: { content: string; id: string }[];
}

export default function ToC({ entries, baseClass, activeClass }: Props) {
  const [activeEntry, setActiveEntry] = useState('');

  useEffect(() => {
    const elements = entries.map(({ id }) => document.getElementById(id));

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((entry) => {
          setActiveEntry(entry.target.id);
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1,
    });
    elements.forEach((e) => e && observer.observe(e));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav>
      <ul>
        {entries.map((entry) => (
          <li
            className={
              baseClass + (entry.id === activeEntry ? ` ${activeClass}` : '')
            }
            key={entry.id}
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        ))}
      </ul>
    </nav>
  );
}
