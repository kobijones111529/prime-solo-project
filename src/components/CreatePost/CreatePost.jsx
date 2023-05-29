import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewPost } from "../../redux/sagas/posts";

/**
 * @typedef {import("../../../types/posts").NewPost} NewPost
 */

function CreatePost() {
  const dispatch = useDispatch();

  /** @type {['offer' | 'request' | undefined, React.Dispatch<React.SetStateAction<'offer' | 'request' | undefined>>]} */
  const [type, setType] = useState();
  const [plantName, setPlantName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [contactUrl, setContactUrl] = useState('');

  const input = useMemo(() => {
    /**
     * @property {'offer' | 'request' | undefined} type
     */
    const input = {};

    input.type = type;
    if (plantName.trim() !== '') input.plantName = plantName.trim();
    if (imageUrl.trim() !== '') input.imageUrl = imageUrl.trim();
    if (description.trim() !== '') input.description = description.trim();
    if (contactUrl.trim() !== '') input.contactUrl = contactUrl.trim();

    return input;
  }, [type, plantName, imageUrl, description, contactUrl]);

  const validatedInput = useMemo(
    /** @returns {NewPost | null} */
    () => {
      const trimmed = {
        plantName: plantName.trim(),
        imageUrl: imageUrl.trim(),
        description: description.trim(),
        conatct: contactUrl.trim()
      };

      /**
       * @typedef Input
       * @property {'offer' | 'request'} [postType]
       * @property {string} [imageUrl]
       * @property {string} [plantName]
       * @property {string} [description]
       * @property {string} [contact]
       */

      /** @type {Input} */
      const input = {
        ...(type && { postType: type }),
        ...(trimmed.imageUrl.length > 0 && { imageUrl: trimmed.imageUrl }),
        ...(trimmed.plantName.length > 0 && { plantName: trimmed.plantName }),
        ...(trimmed.description.length > 0 && { description: trimmed.description }),
        ...(trimmed.conatct.length > 0 && { contact: trimmed.conatct })
      };

      if (!(
        input.postType
        && input.plantName
        && input.contact
      )) {
        return null;
      }

      return {
        type: input.postType,
        location: {
          latitude: 0,
          longitude: 0
        },
        plantName: input.plantName,
        imageUrl: input.imageUrl || null,
        description: input.description || null,
        contact: input.contact
      };
    }, [type, plantName, imageUrl, description, contactUrl]
  );

  /** @type {import("react").FormEventHandler<HTMLFormElement>} */
  const handleSubmit = event => {
    event.preventDefault();

    if (validatedInput === null) {
      console.error('Invalid inputs');
      return;
    }

    dispatch(postNewPost(validatedInput));
  };

  return (
    <form action="post" onSubmit={handleSubmit}>
      <fieldset name="type">
        <legend>Post type</legend>
        <label>
          Offer
          <input
            type="radio"
            onChange={event => {
              if (event.target.checked) {
                setType('offer');
              }
            }}
            checked={type === 'offer'}
          />
        </label>
        <label>
          Request
          <input
            type="radio"
            onChange={event => {
              if (event.target.checked) {
                setType('request');
              }
            }}
            checked={type === 'request'}
          />
        </label>
      </fieldset>
      <input
        type="text"
        name="plantName"
        placeholder="Plant name"
        value={plantName}
        onChange={event => setPlantName(event.target.value)}
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={imageUrl}
        onChange={event => setImageUrl(event.target.value)}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <input
        type="text"
        name="contactUrl"
        placeholder="Contact"
        value={contactUrl}
        onChange={event => setContactUrl(event.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
