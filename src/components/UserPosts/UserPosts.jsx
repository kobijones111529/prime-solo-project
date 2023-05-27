import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { fetchUserPosts } from "../../redux/sagas/posts";
import { PostsState } from "../../redux/reducers/posts";

function UserPosts() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const posts = useSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [user]);

  const showPosts = () => {
    switch (posts.tag) {
      case PostsState.None:
      case PostsState.Loading:
        return <p>Loading...</p>;
      case PostsState.Posts:
        const p = posts.posts;
        return (
          <ol>{
            p.map(post =>
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
