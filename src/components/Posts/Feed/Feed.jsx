import React, { useEffect } from "react";
import Post from "./Post/Post";
import { fetchPosts } from "../../../redux/sagas/posts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Filters from "./Filters/Filters";

import styles from './Feed.module.css';

/**
 * @typedef {import("../../../../types/posts").Post} Post
 */

function Feed() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(store => store.filters);
  const feed = useAppSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchPosts(filters));
  }, [filters]);

  const showFeed = () => {
    switch (feed.tag) {
      case 'None':
      case 'Loading':
        return <p>Loading...</p>;
      case 'Some':
        return (
          <ol className={styles['container']}>
            {feed.posts.map((/** @type {Post} */ post) =>
              <li className={styles['card']}>
                <Post
                  key={post.id}
                  type={post.type}
                  plantName={post.plant_name}
                  {...(post.image_url && { imageUrl: post.image_url })}
                  {...(post.description && { description: post.description })}
                  location={{ latitude: post.latitude, longitude: post.longitude }}
                  contact={post.contact_url}
                />
              </li>
            )}
          </ol>
        );
      case 'Error':
        return <p>Error loading posts: {feed.error}</p>
      default:
        return <p>{'Something went wrong :('}</p>;
    }
  }

  return (
    <div>
      <Filters />
      {showFeed()}
    </div>
  );
}

export default Feed;
