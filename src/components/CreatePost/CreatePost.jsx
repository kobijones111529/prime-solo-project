import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewPost } from "../../redux/sagas/posts";

function CreatePost() {
  const dispatch = useDispatch();

  /** @type {['offer' | 'request' | undefined, React.Dispatch<React.SetStateAction<'offer' | 'request' | undefined>>]} */
  const [type, setType] = useState();
  const [plantName, setPlantName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [contactUrl, setContactUrl] = useState('');

  const input = useMemo(() => {
    const input = {};

    input.type = type;
    if (plantName.trim() !== '') input.plantName = plantName.trim();
    if (imageUrl.trim() !== '') input.imageUrl = imageUrl.trim();
    if (description.trim() !== '') input.description = description.trim();
    if (contactUrl.trim() !== '') input.contactUrl = contactUrl.trim();

    return input;
  }, [type, plantName, imageUrl, description, contactUrl]);

  const [inputErrors, validatedInput] = useMemo(() => {
    const missing = 'missing';

    const errors = {};

    if (input.type === undefined) errors.type = missing;
    if (input.plantName === undefined) errors.plantName = missing;
    if (input.contactUrl === undefined) errors.contactUrl = missing;

    return [errors, Object.keys(errors).length === 0 ? input : null];
  }, [input]);

  /**
   * @param {SubmitEvent} event
   */
  const handleSubmit = event => {
    event.preventDefault();

    if (validatedInput === null) {
      console.error('Invalid inputs');
      return;
    }

    dispatch(postNewPost({
      type: validatedInput.type,
      plantName: validatedInput.plantName,
      imageUrl: validatedInput.imageUrl,
      description: validatedInput.description,
      location: {
        latitude: 0,
        longitude: 0
      },
      contactUrl: validatedInput.contactUrl
    }));
  };

  return (
    <form action="post" onSubmit={handleSubmit}>
      <fieldset name="type">
        <legend>Post type</legend>
        <label>
          Offer
          <input
            type="radio"
            value="offer"
            onChange={event => setType(event.target.value)}
            checked={type === 'offer'}
          />
        </label>
        <label>
          Request
          <input
            type="radio"
            value="request"
            onChange={event => setType(event.target.value)}
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
