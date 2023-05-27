import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../../../redux/sagas/post";
import { PostState } from "../../../redux/reducers/post";

function ViewUserPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(store => store.post);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  const showPost = () => {
    switch (post.tag) {
      case PostState.None:
      case PostState.Loading:
        return <p>Loading...</p>;
      case PostState.Post:
        const p = post.post;
        return (
          <>
            <img src={p.image_url} alt={p.plant_name} />
            <p>{p.type}</p>
            <p>{p.plant_name}</p>
            <p>{p.description}</p>
            <p>{p.latitude}, {p.longitude}</p>
            <Link to={`/posts/${id}/edit`}>
              <button>Edit</button>
            </Link>
          </>
        );
      default:
        return <p>{'Something went wrong :('}</p>;
    }
  };

  return (
    <div>
      {showPost()}
    </div>
  );
}

export default ViewUserPost;
