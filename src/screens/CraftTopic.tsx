import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import data from '_data';

const Hero = styled.div`
  img {
    width: 100vw;
    max-height: 75vh;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  margin-top: var(--flow-gap);

  header a {
    text-decoration: underline;
  }

  h1 {
    font-size: var(--font-size-6xl);
  }

  h2 {
    font-size: var(--font-size-4xl);
  }

  .center {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .stack {
    > * + * {
      margin-top: var(--space12);
    }
  }

  .items-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space12);
    text-decoration: underline;

    article {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: var(--space3);
      cursor: pointer;
    }

    img {
      filter: grayscale();
      clip-path: circle(50% at 50% 50%);
      object-fit: contain;
      width: 64px;
      height: 64px;
    }
  }

  .items-gallery:nth-of-type(2) {
    img {
      clip-path: none;
    }

    margin-bottom: var(--space24);
  }
`;

const hero = '/media/craft/wood/hero.jpg';

const text = [
  'The Danes’ remarkable relationship with wood goes a long way back, to the times of the Vikings and their expert shipbuilders. Rulers came and went; industries shifted focus — wood, however, remained a core substance taking part in nearly every aspect of the Danish peoples’ daily lives. This long-established connection to wood and the abundance of forests in Denmark allowed the Danes to develop an unparalleled mastery of this marvelous material.',
];

export default function CraftTopic() {
  return (
    <>
      <Hero>
        <img src={hero} alt="" className="hero" />
      </Hero>
      <Wrapper>
        <div className="center">
          <div className="stack">
            <div>
              <header>
                <Link to="/craft">Craft {'>'}</Link>
                <h1>Wood</h1>
              </header>
            </div>
            <main>
              <div className="stack">
                {text.map((t, i) => (
                  <p className={`prose ${i === 0 ? ' drop-cap' : ''}`} key={t}>
                    {t}
                  </p>
                ))}
                <h2>Wood masters</h2>
                <div className="items-gallery">
                  {data.catalog
                    .filter((designer) =>
                      designer.works.some((work) =>
                        work.materials.includes('wood')
                      )
                    )
                    .slice(0, 10)
                    .map((designer) => (
                      <article>
                        <img src={designer.avatarSrc} alt="" />
                        <h3>
                          {designer.firstName} {designer.lastName}
                        </h3>
                      </article>
                    ))}
                </div>
                <h2>Wood masterpieces</h2>
                <div className="items-gallery">
                  {data.catalog
                    .flatMap((designer) =>
                      designer.works.filter((work) =>
                        work.materials.includes('wood')
                      )
                    )
                    .slice(0, 10)
                    .map((product) => (
                      <article>
                        <img src={product.thumbSrc} alt="" />
                      </article>
                    ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
