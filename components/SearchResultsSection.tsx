import { Stack } from '@roeybiran/every-layout-styled-components';
import { UNKNOWN_MODEL } from 'lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { SearchResult } from 'pages/search';

interface Props {
  title: string;
  results: SearchResult[];
}

export default function SearchResultsSection({ title, results }: Props) {
  if (results.length === 0) return null;

  return (
    <Stack as="section">
      <h2 className="txt-m">{title}</h2>
      <ul className="grid">
        {results.map((item) => (
          <li key={item.id}>
            <div
              className={`img-container ${
                title === 'Designers' ? 'avatar' : ''
              }`}
            >
              <Image
                src={item.thumb.src}
                width={64}
                height={64}
                objectFit="contain"
                alt={item.label}
                placeholder="blur"
                blurDataURL={item.thumb.blurDataUrl}
              />
            </div>
            <Link href={item.slug}>
              <a className={`${item.label === UNKNOWN_MODEL ? 'unknown' : ''}`}>
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Stack>
  );
}
