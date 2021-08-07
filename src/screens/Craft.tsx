import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';
import SlidingUnderline from 'styled/SlidingUnderline';

const TRANSITION_DURATION = 0.3;

const Wrapper = styled.div`
  padding-left: var(--bleed);
  padding-right: var(--bleed);
  position: relative;
`;

const ListsWrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: var(--flow-gap);
  will-change: color;
  transition: color ${TRANSITION_DURATION}s ease;

  h2 {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-md);
  }

  li {
    font-size: var(--font-size-3xl);
    margin-top: var(--space2);
  }
`;

const VideoWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;

  will-change: opacity;
  transition: opacity ${TRANSITION_DURATION}s ease;
  z-index: -1;

  video {
    min-height: 100%;
    min-width: 100%;
  }
`;

const variants = {
  from: {
    opacity: 0,
    y: 10,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Craft = ({ data }: { data: CraftTopic[] }) => {
  const initialVid = data[0].vidSrc;
  const [currentVid, setCurrentVid] = useState(initialVid);
  const [vidIsShown, setVidIsShown] = useState(false);

  const list = [
    { title: 'Materials', items: data.filter((c) => c.type === 'material') },
    { title: 'Techniques', items: data.filter((c) => c.type === 'technique') },
  ];

  let timeout: NodeJS.Timeout | null = null;
  const handleMouseEnter = (item: CraftTopic) => {
    setVidIsShown(false);
    timeout = setTimeout(() => {
      setCurrentVid(item.vidSrc || initialVid);
      setVidIsShown(true);
    }, 300);
  };

  return (
    <Wrapper>
      <header className="sr-only">
        <h1>Craft</h1>
      </header>
      <VideoWrapper style={{ opacity: vidIsShown ? 1 : 0 }}>
        <video src={currentVid} autoPlay loop muted />
      </VideoWrapper>
      <ListsWrapper
        style={{ color: vidIsShown ? 'white' : 'var(--text-color)' }}
      >
        <AnimatePresence>
          {list.map((data) => (
            <motion.section
              initial="from"
              animate="to"
              exit="from"
              variants={variants}
              key={data.title}
            >
              <motion.h2 variants={variants}>{data.title}</motion.h2>
              <motion.ul variants={variants}>
                {data.items.map((item) => (
                  <motion.li variants={variants} key={item.id}>
                    <SlidingUnderline
                      color="white"
                      delay={0.8}
                      to="/craft/wood/"
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseOut={() => {
                        clearTimeout(timeout!);
                        setVidIsShown(false);
                      }}
                    >
                      {item.name}
                    </SlidingUnderline>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </ListsWrapper>
    </Wrapper>
  );
};

export default Craft;
