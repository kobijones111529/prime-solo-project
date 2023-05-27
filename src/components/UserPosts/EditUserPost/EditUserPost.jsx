import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../../redux/sagas/post";
import { PostState } from "../../../redux/reducers/post";

function EditUserPost() {
  const dispatch = useDispatch();
  const post = useSelector(store => store.post);
  const user = useSelector(store => store.user);
  const { id } = useParams();

  /** @type {['offer' | 'request' | undefined, React.Dispatch<React.SetStateAction<'offer' | 'request' | undefined>>]} */
  const [postTypeInput, setPostTypeInput] = useState();
  const [imageUrlInput, setImageUrlInput] = useState();
  const [plantNameInput, setPlantNameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [contactInput, setContactInput] = useState();

  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [user, id]);

  const uploadImage = url => {
    const trimmed = url.trim();
    if (trimmed.length > 0) {
      setImageUrl(trimmed);
    } else {
      setImageUrl(null);
    }
  };

  const handleSubmit = () => {
    const data = {};
    if (postTypeInput !== undefined) {
      data.type = postTypeInput;
    }
    if (plantNameInput !== undefined) {
      data.plantName = plantNameInput;
    }
    if (imageUrlInput !== undefined) {
      data.imageUrl = imageUrl;
    }
    if (descriptionInput !== undefined) {
      data.description = descriptionInput;
    }
    if (contactInput !== undefined) {
      data.contactUrl = contactInput;
    }

    console.log('TODO: submit edit:', data);
  };

  const showPost = () => {
    switch (post.tag) {
      case PostState.None:
      case PostState.Loading:
        return <p>Loading...</p>;
      case PostState.Post:
        const data = post.post;
        return (
          <form onSubmit={handleSubmit}>
            <fieldset name="type">
              <legend>Post type</legend>
              <label>
                Offer
                <input
                  type="radio"
                  value="offer"
                  onChange={event => setPostTypeInput(event.target.value)}
                  checked={postTypeInput === 'offer' || (postTypeInput === undefined && data.type === 'offer')}
                />
              </label>
              <label>
                Request
                <input
                  type="radio"
                  value="request"
                  onChange={event => setPostTypeInput(event.target.value)}
                  checked={postTypeInput === 'request' || (postTypeInput === undefined && data.type === 'request')}
                />
              </label>
            </fieldset>
            {imageUrl !== null || data.image_url !== null ? <img src={imageUrl || data.image_url} /> : <></>}
            <input type="text" placeholder="Image URL" value={imageUrlInput || data.image_url} onChange={e => setImageUrlInput(e.target.value)} />
            <button type="button" onClick={() => uploadImage(imageUrlInput)} disabled={!imageUrlInput}>Upload</button>
            <input type="text" placeholder="Plant name" value={plantNameInput || data.plant_name} onChange={e => setPlantNameInput(e.target.value)} />
            <textarea type="text" placeholder="Description" value={descriptionInput || data.description} onChange={e => setDescriptionInput(e.target.value)} />
            <input type="text" placeholder="Contact" value={contactInput || data.contact_url} onChange={e => setContactInput(e.target.value)} />
            <button type="submit">Save changes</button>
            <button type="reset">Discard changes</button>
          </form>
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

export default EditUserPost;
