import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [selectFilter, setSelectFilter] = useState("");
  const filterQuery = selectFilter ? `?filter=${selectFilter}` : "";

  async function getData() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterQuery}`
      );
      setItems(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  useEffect(() => {
    getData();
  }, [selectFilter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setSelectFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading && items.length > 0
        ? items.slice(0, visibleItems).map((data, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${data.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy author-icon" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {data.expiryDate && (
                  <CountdownTimer expiryDate={data.expiryDate} />
                )}

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${data.nftId}`}>
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${data.nftId}`}>
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item" key={index}>
                <div className="author_list_pp">
                </div>
                <div></div>

                <div className="nft__item_wrap nft--skeleton skeleton-box">
                </div>
                <div className="nft__item_info">
                  <div className="skeleton--title skeleton-box mt-3"></div>
                  <div className="skeleton--id skeleton-box"></div>
                  <div className="nft__item_like">
                    <div className="skeleton--id skeleton-box"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {items.length > visibleItems && (
          <Link
            onClick={loadMoreItems}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
