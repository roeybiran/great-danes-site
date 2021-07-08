export {};
// import styled from 'styled-components/macro';
// import hero from 'cms/hans-wegner/hero.jpg';
// import img1 from 'cms/hans-wegner/1.jpg';
// import img2 from 'cms/hans-wegner/2.jpg';
// import ch24 from 'cms/hans-wegner/ch24.svg';
// import pp550 from 'cms/hans-wegner/pp550.svg';
// import pp501 from 'cms/hans-wegner/pp501.svg';
// import { P, Blockquote } from './Prose';
// import FadeIn from './FadeIn';

// const BlockquoteWithOverride = styled(Blockquote)`
//   font-size: var(--font-size-4xl);
//   line-height: var(--line-height-4xl);
//   height: 100vh;
//   display: flex;
//   justify-items: center;
//   align-items: center;
//   justify-content: center;
//   p {
//     max-width: 100%;
//   }
// `;

// const Hero = styled.img`
//   max-height: 100vh;
//   margin: 24px auto;
// `;

// const Wrapper = styled.div`
//   h1 {
//     font-size: var(--font-size-6xl);
//     line-height: var(--line-height-6xl);
//   }

//   header {
//     grid-column: span 2;
//     display: flex;
//     align-items: baseline;
//     gap: var(--space4);
//   }

//   header > p {
//     font-size: var(--font-size-3xl);
//     line-height: var(--line-height-3xl);
//   }

//   padding: 0 var(--space16);
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: var(--space8);

//   img {
//     grid-column: span 2;
//     width: 100%;
//   }

//   > div:last-child {
//     grid-column: span 2;
//     gap: var(--space8);
//     display: flex;
//     justify-content: space-around;
//     img {
//       max-width: 300px;
//     }
//   }
// `;
// export default function HansWegner() {
//   return (
//     <>
//       <BlockquoteWithOverride>
//         <FadeIn>
//           <p>
//             If only you could design just one good chair in your life — but, you
//             simply cannot.
//           </p>
//         </FadeIn>
//       </BlockquoteWithOverride>
//       <FadeIn>
//         <Hero src={hero}></Hero>
//       </FadeIn>
//       <FadeIn>
//         <Wrapper>
//           <header>
//             <h1>Hans Wegner</h1>
//             <p>1914&mdash;2007</p>
//           </header>
//           <P>
//             Among Danish furniture designers, Hans J. Wegner (1914-2007) is
//             considered one of the most creative, innovative and prolific. Often
//             referred to as the master of the chair, Wegner created almost 500 in
//             his lifetime – many of them considered masterpieces. His iconic
//             Wishbone Chair is probably the most well-known and has been in
//             continuous production since 1950.
//           </P>
//           <P>
//             Wegner was part of the spectacular generation that created what is
//             today referred to as “the Golden Age” of modern Danish design. “Many
//             foreigners have asked me how we created the Danish style,” Wegner
//             once said. “And I’ve answered that it was a continuous process of
//             purification and of simplification – to cut down to the simplest
//             possible design of four legs, a seat, and a combined back and
//             armrest.”
//           </P>
//           <img src={img1} alt="" />
//           <P>
//             The son of a cobbler, Wegner was born in 1914 in Tønder, a town in
//             southern Denmark. He began his apprenticeship with Danish master
//             cabinetmaker H. F. Stahlberg when he was just 14 years old. Later
//             on, he moved to Copenhagen and attended the School of Arts and
//             Crafts from 1936 to 1938 before setting out as a furniture designer.
//           </P>
//           <P>
//             In 1938, Wegner was approached by architects and designers Arne
//             Jacobsen and Erik Møller, and started designing furniture for the
//             new Aarhus City Hall. During the same period, Wegner began
//             collaborating with master cabinetmaker Johannes Hansen, who was a
//             driving force in bringing new furniture design to the Danish public
//             at the Copenhagen Cabinetmakers’ Guild Exhibitions.
//           </P>
//           <P>
//             The core of Wegner’s legacy is his focus on showing the inner soul
//             of furniture pieces through a simple and functional exterior.
//             Wegner’s background as a cabinetmaker gave him a deep understanding
//             of how to integrate exacting joinery techniques with exquisite form.
//             His aesthetic was also based on a deep respect for wood and its
//             characteristics, and a vast curiosity about other natural materials
//             that enabled him to bring an organic, natural softness to
//             formalistic minimalism.
//           </P>
//           <P>
//             Wegner established his own design studio in 1943 and created a
//             series of lightweight chairs for Carl Hansen & Søn from 1949 until
//             1968, including the Wishbone Chair, which has been in production at
//             Carl Hansen & Søn ever since.
//           </P>
//           <img src={img2} alt="" />
//           <P>
//             Wegner is seen as one of the most renowned and creative Danish
//             furniture designers. He received many design awards, including the
//             Lunning Prize in 1951, the Grand Prix of the Milan Triennale in
//             1951, the Royal Danish Academy of Fine Arts’ Eckersberg Medal in
//             1956, Sweden’s Prince Eugen Medal in 1961, the Danish Furniture
//             Prize in 1980, the C. F. Hansen Medal in 1982, and the 8th
//             International Design Award in 1997. He was made an Honorary Royal
//             Designer for industry by the Royal Society of Arts in London in
//             1959, became an honorary member of the Royal Danish Academy of Fine
//             Arts in 1995, and was awarded an honorary Doctorate by the Royal
//             College of Art in 1997.
//           </P>
//           <P>
//             Almost all of the world’s major design museums, from the Museum of
//             Modern Art in New York and Designmuseum Danmark in Copenhagen to Die
//             Neue Sammlung in Munich, exhibit his works. Hans J. Wegner died in
//             Denmark in January 2007, aged 92.
//           </P>
//           <FadeIn>
//             {/* <div> */}
//             <img src={ch24} alt="" />
//             <img src={pp550} alt="" />
//             <img src={pp501} alt="" />
//             {/* </div> */}
//           </FadeIn>
//         </Wrapper>
//       </FadeIn>
//     </>
//   );
// }
