/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Heading from "../components/Heading";
import AZ from "../layouts/AZ";
import React from "react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import SEO from "../components/SEO";

const ListPage = () => {
  const validateQueries = [
    "top-airing",
    "most-popular",
    "most-favorite",
    "completed",
    "recently-added",
    "recently-updated",
    "top-upcoming",
    "subbed-anime",
    "dubbed-anime",
    "movie",
    "tv",
    "ova",
    "ona",
    "special",
    "az-list",
    "genre",
    "producer",
  ];
  const { category, query = null } = useParams();

  const isValidQuery = validateQueries.includes(category);

  if (!isValidQuery) {
    return <PageNotFound />;
  }

  const endpoint = `/animes/${category}${query ? `/${query}` : ""}?page=`;
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }
  const pages = data?.pages;

  return (
    <div className="list-page pt-14">
      {(() => {
        const labels = {
          "top-airing": "Top Airing",
          "most-popular": "Most Popular",
          "most-favorite": "Most Favorite",
          "completed": "Completed",
          "recently-added": "Recently Added",
          "recently-updated": "Recently Updated",
          "top-upcoming": "Top Upcoming",
          "subbed-anime": "Subbed Anime",
          "dubbed-anime": "Dubbed Anime",
          movie: "Anime Movies",
          tv: "Anime TV Series",
          ova: "OVA",
          ona: "ONA",
          special: "Special",
          "az-list": "A-Z List",
          genre: query ? `Genre: ${query}` : "Genre",
          producer: query ? `Producer: ${query}` : "Producer",
        };
        const label = labels[category] || category;
        const title = query ? `${label} Anime` : `${label} Anime`;
        const description = `Browse ${label.toLowerCase()} anime on KitsuneTV. Watch free in HD with English sub & dub.`;
        return <SEO title={title} description={description} />;
      })()}
      {category === "az-list" && <AZ selected={query} />}
      {pages && !isLoading ? (
        <InfiniteScroll
          dataLength={data?.pages.flat().length || 0} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Loader className="h-fit" />}
          endMessage={<Footer />}
        >
          <Heading>
            {query ? "" : category} {query} Anime
          </Heading>
          <div className="flex flex-wrap justify-around items-center">
            {pages?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.response.map((item, index) => (
                  <div key={item.id + index} className="flw-item">
                    <Image data={item} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Loader className="h-[100dvh]" />
      )}
    </div>
  );
};

export default ListPage;
