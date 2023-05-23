import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.posts);

  useEffect(() => {
    dispatch({ type: 'FETCH_POSTS' });
  }, []);

  return (
    <div>
      <ol>
        {
          feed.map(post =>
            <Post
              key={post.id}
              type={post.type}
              plantName={post.plant_name}
              imageUrl={post.image_url}
              description={post.description}
              location={{ latitude: post.latitude, longitude: post.longitude }}
            />
          )
        }
      </ol>
    </div>
  );
}

export default Feed;
