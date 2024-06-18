import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false)
  const { id } = useParams();
  
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }
  
  async function getData() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setItems(data);
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
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton-avatar skeleton-box"></div>
                        <div className="profile_name">
                          <h4>
                            <div className="skeleton--title skeleton-box"></div>
                            <div className="skeleton--id skeleton-box">
                            </div>
                            <div className="skeleton--title skeleton-box">
                            </div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                        </div>
                        <div className="skeleton-box skeleton-button">
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  items && (
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={items.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {items.authorName}
                              <span className="profile_username">
                                @{items.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {items.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {isFollowing ? items.followers + 1: items.followers} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={handleFollowClick}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems id={id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
