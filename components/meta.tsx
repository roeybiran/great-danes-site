// https://css-tricks.com/essential-meta-tags-social-media/

interface Props {
  title: string;
  description: string;
  imagePath?: string;
  url?: string;
  siteName?: string;
  imgAlt?: string;
}

export default function Meta({
  title,
  description,
  imagePath,
  url,
  siteName,
  imgAlt,
}: Props) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Essential META Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imagePath && <meta property="og:image" content={imagePath} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Non-Essential, But Recommended */}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {imgAlt && <meta name="twitter:image:alt" content={imgAlt} />}
    </>
  );
}
