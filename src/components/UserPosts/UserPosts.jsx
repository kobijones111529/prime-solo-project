import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { fetchUserPosts } from "../../redux/sagas/posts";

function UserPosts() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const posts = useSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [user]);

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
