import { HTMLMotionProps, motion } from 'framer-motion';

type Props = HTMLMotionProps<'span'> & {
  text: string;
  duration: number;
};

const StaggeredText = ({ text, duration, ...props }: Props) => {
  const charVariants = {
    hidden: { y: '100%' },
    visible: {
      y: '0%',
      transition: {
        ease: 'easeOut',
        duration,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };
  return (
    <motion.span
      variants={charVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      {...props}
    >
      {text.split(/(\s)/).map((word, idx) => {
        if (word === ' ') return word;
        return (
          <motion.span
            key={word + `${idx}`}
            style={{
              overflow: 'hidden',
              position: 'relative',
              display: 'inline-block',
            }}
            variants={charVariants}
          >
            <motion.span
              style={{
                display: 'inline-block',
              }}
              variants={charVariants}
              data-word={word}
              data-index={idx}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export default StaggeredText;
