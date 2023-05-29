import { useEffect } from "react";
import Post from "./Post/Post";
import { fetchUserPosts } from "../../redux/sagas/posts";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

/**
 * @typedef {import("../../../types/posts").Post} Post
 */

function UserPosts() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);
  const posts = useAppSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [user]);

  const showPosts = () => {
    switch (posts.tag) {
      case 'None':
      case 'Loading':
        return <p>Loading...</p>;
      case 'Some':
        const p = posts.posts;
        return (
          <ol>{
            p.map((/** @type {Post} */ post) =>
              <Post
                key={post.id}
                id={post.id}
                type={post.type}
                plantName={post.plant_name}
                imageUrl={post.image_url}
              />
            )
          }</ol>
        );
      default:
        return <p>{'Something went wrong :('}</p>;
    }
  };

  return (
    <div>
      {showPosts()}
    </div>
  );
}

export default UserPosts;
