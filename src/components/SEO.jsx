import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const siteName = "KitsuneTV";
const siteUrl = "https://kitsunetv.xyz";
const defaultTitle = "KitsuneTV — Watch Free Anime Online";
const defaultDescription = "Stream thousands of anime episodes and movies for free. English sub & dub, HD quality, latest and popular titles.";
const defaultImage = "https://kitsunetv.xyz/vite.svg"; // Public asset placeholder

const SEO = ({ title, description, image, noIndex = false }) => {
  const location = useLocation();
  const canonical = `${siteUrl}${location.pathname}${location.search || ""}`;

  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?keyword={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Canonical & robots */}
      <link rel="canonical" href={canonical} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Performance hints */}
      <link rel="preconnect" href="https://eren-world.onrender.com" />
      <link rel="dns-prefetch" href="https://eren-world.onrender.com" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLdWebsite)}</script>
    </Helmet>
  );
};

export default SEO;