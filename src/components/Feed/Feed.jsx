import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { fetchPosts } from "../../redux/sagas/posts";
import { PostsState } from "../../redux/reducers/posts";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const showFeed = () => {
    switch (feed.tag) {
      case PostsState.Posts:
        return (
          <ol>
            {feed.posts.map(post =>
              <Post
                key={post.id}
                type={post.type}
                plantName={post.plant_name}
                imageUrl={post.image_url}
                description={post.description}
                location={{ latitude: post.latitude, longitude: post.longitude }}
              />
            )}
          </ol>
        );
      case PostsState.Loading:
        return <p>Loading...</p>;
      default:
        return <p>Error loading posts: {feed.error}</p>
    }
  }

  return (
    <div>
      {showFeed()}
    </div>
  );
}

export default Feed;
