import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ id }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setItems(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
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
              ))
            : items && items.nftCollection && items.nftCollection.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy author-icon" src={items.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
