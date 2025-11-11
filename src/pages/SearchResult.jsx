import React from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import Loader from "../components/Loader";
import Heading from "../components/Heading";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import SEO from "../components/SEO";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const safeKeyword = (keyword || "").trim();
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteApi(safeKeyword.length > 1 ? `/search?keyword=${safeKeyword}&page=` : "/search?keyword=naruto&page=");

  if (isError) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <h1 className="text-red-300">
          search result not found with keyword - {keyword}
        </h1>
      </div>
    );
  }
  const pages = data?.pages;
  const itemsCount = Array.isArray(pages)
    ? pages.reduce((sum, page) => sum + (Array.isArray(page?.data?.response) ? page.data.response.length : 0), 0)
    : 0;

  return (
    <div className="list-page pt-20">
      <SEO
        title={`Search: ${safeKeyword || "naruto"}`}
        description={`Search results for "${safeKeyword || "naruto"}" on KitsuneTV. Discover anime series and movies.`}
        noIndex={true}
      />
      {pages && !isLoading ? (
        <InfiniteScroll
          dataLength={itemsCount}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Loader className="h-fit" />}
          endMessage={<Footer />}
        >
          <Heading>Search results of {keyword}</Heading>
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
        <div className="h-[100dvh] flex items-center justify-center">
          {safeKeyword.length <= 1 ? (
            <h2 className="text-center text-gray-300">Enter at least 2 characters to search.</h2>
          ) : (
            <Loader className="h-fit" />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
