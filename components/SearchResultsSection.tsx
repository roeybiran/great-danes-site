import Image from 'next/image';
import Link from 'next/link';
import { Stack } from '@roeybiran/every-layout-styled-components';

export default function SearchResultsSection({ results, title }: any) {
  return (results ?? []).length > 0 ? (
    <Stack as="section">
      <h2 className="txt-m">{title}</h2>
      <ul className="grid">
        {results.map((item: any) => (
          <li key={item.name}>
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
                alt={item.name}
                placeholder="blur"
                blurDataURL={item.thumb.blurDataUrl}
              />
            </div>
            <Link href={`/archive/${item.slug}`}>
              <a
                className={`${item.name === 'Unknown Model' ? 'unknown' : ''}`}
              >
                {item.name}
              </a>
            </Link>
            {title === 'Products' && (
              <p className="product-designer">{item.designer}</p>
            )}
          </li>
        ))}
      </ul>
    </Stack>
  ) : null;
}
