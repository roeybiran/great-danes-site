export {};

// import { motion } from 'framer-motion';
// import { InView } from 'react-intersection-observer';

// const variant = {
//   start: { opacity: 0, translateY: '10%' },
//   end: {
//     translateY: '0%',
//     opacity: 1,
//     transition: {
//       delay: 1,
//       duration: 1,
//       ease: 'easeOut',
//     },
//   },
// };

// export default function FadeIn(props: { children: React.ReactNode }) {
//   return (
//     <InView>
//       {({ ref, inView }) => (
//         <motion.div
//           ref={ref}
//           initial="start"
//           animate={inView ? 'end' : 'start'}
//           variants={variant}
//         >
//           {props.children}
//         </motion.div>
//       )}
//     </InView>
//   );
// }
