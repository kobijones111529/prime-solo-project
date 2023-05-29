import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../../redux/sagas/post";
import { editPost } from "../../../redux/sagas/posts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

/**
 * @typedef {import("../../../../types/posts").EditPost} EditPost
 * @typedef {import('react')} React
 */

/**
 * @template T
 * @typedef {import("../../../hooks/useReduxStore").useState<T>} useState
*/

function EditUserPost() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(store => store.post);
  const user = useAppSelector(store => store.user);
  /** @type {{ id: string }} */
  const params = useParams();
  const id = Number(params.id);

  /** @type {useState<'offer' | 'request' | undefined>} */
  const [postTypeInput, setPostTypeInput] = useState();
  /** @type {useState<string | undefined>} */
  const [imageUrlInput, setImageUrlInput] = useState();
  /** @type {useState<string | undefined>} */
  const [plantNameInput, setPlantNameInput] = useState();
  /** @type {useState<string | undefined>} */
  const [descriptionInput, setDescriptionInput] = useState();
  /** @type {useState<string | undefined>} */
  const [contactInput, setContactInput] = useState();

  /** @type {useState<string | null>} */
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [user, id]);

  /**
   * @param {string} url 
   */
  const uploadImage = url => {
    const trimmed = url.trim();
    if (trimmed.length > 0) {
      setImageUrl(trimmed);
    } else {
      setImageUrl(null);
    }
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = event => {
    event.preventDefault();

    /** @type {EditPost} */
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
      data.contact = contactInput;
    }

    dispatch(editPost(id, data));
  };

  const showPost = () => {
    switch (post.tag) {
      case 'None':
      case 'Loading':
        return <p>Loading...</p>;
      case 'Some':
        const data = post.post;
        return (
          <form onSubmit={handleSubmit}>
            <fieldset name="type">
              <legend>Post type</legend>
              <label>
                Offer
                <input
                  type="radio"
                  onChange={event => {
                    if (event.target.checked) {
                      setPostTypeInput('offer');
                    }
                  }}
                  checked={postTypeInput === 'offer' || (postTypeInput === undefined && data.type === 'offer')}
                />
              </label>
              <label>
                Request
                <input
                  type="radio"
                  onChange={event => {
                    if (event.target.checked) {
                      setPostTypeInput('request');
                    }
                  }}
                  checked={postTypeInput === 'request' || (postTypeInput === undefined && data.type === 'request')}
                />
              </label>
            </fieldset>
            {imageUrl !== null || data.image_url !== null ? <img src={imageUrl || data.image_url} /> : <></>}
            <input type="text" placeholder="Image URL" value={imageUrlInput || data.image_url} onChange={e => setImageUrlInput(e.target.value)} />
            <button type="button" onClick={() => uploadImage(imageUrlInput)} disabled={!imageUrlInput}>Upload</button>
            <input type="text" placeholder="Plant name" value={plantNameInput || data.plant_name} onChange={e => setPlantNameInput(e.target.value)} />
            <textarea placeholder="Description" value={descriptionInput || data.description} onChange={e => setDescriptionInput(e.target.value)} />
            <input type="text" placeholder="Contact" value={contactInput === undefined ? data.contact_url : contactInput} onChange={e => setContactInput(e.target.value)} />
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
