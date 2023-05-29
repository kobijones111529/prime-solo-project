import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../../../redux/sagas/post";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

function ViewUserPost() {
  /** @type {{ id: string }} */
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useAppDispatch();
  const post = useAppSelector(store => store.post);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  const showPost = () => {
    switch (post.tag) {
      case 'None':
      case 'Loading':
        return <p>Loading...</p>;
      case 'Some':
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
