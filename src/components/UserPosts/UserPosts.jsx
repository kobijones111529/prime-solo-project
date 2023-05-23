import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";

function UserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(store => store.userPosts);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_POSTS' });
  }, []);

  return (
    <ol>
      {
        posts.map(post =>
          <Post
            key={post.id}
            id={post.id}
            type={post.type}
            plantName={post.plant_name}
            imageUrl={post.image_url}
          />
        )
      }
    </ol>
  );
}

export default UserPosts;
