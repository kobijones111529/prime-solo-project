import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../redux/sagas/post";

function ViewUserPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(store => store.post);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  if (post === null) {
    return <p>Loading . . .</p>
  }

  return (
    <div>
      <img src={post.image_url} alt={post.plant_name} />
      <p>{post.type}</p>
      <p>{post.plant_name}</p>
      <p>{post.description}</p>
      <p>{post.latitude}, {post.longitude}</p>
    </div>
  );
}

export default ViewUserPost;
