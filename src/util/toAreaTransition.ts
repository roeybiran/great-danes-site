import gsap from 'gsap';

const toAreaTimeline = gsap.timeline({
  defaults: {
    ease: 'power1.out',
    duration: 0.3,
  },
});

interface toAreaProps {
  onFadeOutFinish: () => void;
  onFadeInFinish: () => void;
}

const toArea = ({ onFadeOutFinish, onFadeInFinish }: toAreaProps) => {
  return toAreaTimeline
    .to('#overlay', {
      opacity: 1,
      duration: 0.3,
      onComplete: onFadeOutFinish,
    })
    .to(
      '#overlay',
      {
        opacity: 0,
        duration: 0.3,
        onComplete: onFadeInFinish,
      },
      '<0.5'
    );
};

export default toArea;
