import React, { useEffect } from "react";
import Post from "./Post/Post";
import { fetchPosts } from "../../../redux/sagas/posts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

/**
 * @typedef {import("../../../../types/posts").Post} Post
 */

function Feed() {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const showFeed = () => {
    switch (feed.tag) {
      case 'None':
      case 'Loading':
        return <p>Loading...</p>;
      case 'Some':
        return (
          <ol>
            {feed.posts.map((/** @type {Post} */ post) =>
              <Post
                key={post.id}
                type={post.type}
                plantName={post.plant_name}
                {...(post.image_url && { imageUrl: post.image_url })}
                {...(post.description && { description: post.description })}
                location={{ latitude: post.latitude, longitude: post.longitude }}
              />
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
      {showFeed()}
    </div>
  );
}

export default Feed;
