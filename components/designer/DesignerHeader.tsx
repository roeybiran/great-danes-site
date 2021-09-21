import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.header`
  .avatar-container {
    position: relative;
    inline-size: 128px;
    block-size: 128px;
    align-self: center;
  }

  .avatar {
    clip-path: circle(50% at 50% 50%);
  }
`;

interface Props {
  name: string;
  avatar: CustomImage | null;
}

export default function DesignerHeader({ name, avatar }: Props) {
  return (
    <Wrapper>
      {avatar && (
        <div className="avatar-container">
          <Image alt={name} src={avatar.src} className="avatar" layout="fill" />
        </div>
      )}
      <h1 className="txt-l">{name}</h1>
    </Wrapper>
  );
}
