import styled from 'styled-components';

const Wrapper = styled.div`
  /* .video-container {
    max-width: 100vw;
    max-height: 100vh;
  } */
`;

interface Props {
  videos: string[];
}

export default function Videos({ videos }: Props) {
  return videos.length > 0 ? (
    <Wrapper>
      <h2 className="txt-m">Videos</h2>
      {videos.map((vid) => (
        <div className="video-container" key={vid}>
          <video src={vid} muted controls width="100%" />
        </div>
      ))}
    </Wrapper>
  ) : null;
}
