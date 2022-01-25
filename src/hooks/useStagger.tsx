import { RefObject, useEffect } from 'react';

export default function useStagger(
  rootRef: RefObject<HTMLElement>,
  inViewOnly = true
) {
  useEffect(() => {
    if (!rootRef.current) return;
    const staggers = rootRef.current.querySelectorAll('[data-stagger]');

    let observer: IntersectionObserver | null;
    if (inViewOnly) {
      observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((e) => e.isIntersecting)
            .forEach((entry) => {
              (entry.target as HTMLElement).style.animationPlayState =
                'running';
            });
        },
        {
          threshold: 0.1,
        }
      );
    }

    staggers.forEach((node) => {
      node.childNodes.forEach((node, idx) => {
        const htmlNode = node as HTMLElement;
        let initial =
          Number(node.parentElement?.style.animationDelay.replace(/m?s/, '')) ??
          0;
        htmlNode.style.animationDelay = `${initial + (idx + 1) / 10}s`;
        htmlNode.classList.add('fade-slide-up');
        if (inViewOnly) {
          htmlNode.style.animationPlayState = 'paused';
          observer?.observe(htmlNode);
        }
      });
    });

    return function () {
      if (inViewOnly) {
        observer?.disconnect();
      }
    };
  }, [rootRef, inViewOnly]);
}
