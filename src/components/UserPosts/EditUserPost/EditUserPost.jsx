import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../../redux/sagas/post";
import { editPost } from "../../../redux/sagas/posts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { never } from "../../../util/never";

/**
 * @typedef {import('../../../../types/posts').Post} Post
 * @typedef {import("../../../../types/posts").EditPost} EditPost
 * @typedef {import('react')} React
 */

/**
 * @template T
 * @typedef {import("../../../hooks/useReduxStore").useState<T>} useState
*/

/**
 * @typedef {'no_edit' | 'edit'} EditModeTag
 * @typedef {{ tag: EditModeTag }} TaggedEditMode
 * @typedef {{ tag: 'no_edit' }} NoEdit
 */

/**
 * @template T
 * @typedef {{ tag: 'edit', value: T }} Edit
 */

/**
 * @template T
 * @typedef {TaggedEditMode & (NoEdit | Edit<T>)} EditMode
 */

function EditUserPost() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(store => store.post);
  const user = useAppSelector(store => store.user);
  /** @type {{ id: string }} */
  const params = useParams();
  const id = Number(params.id);

  const [imageUrlEdit, setImageUrlEdit] = useState(
    /** @returns {EditMode<{ input: string, loaded: string | null }>} */
    () => ({ tag: 'no_edit' })
  );
  const [plantNameEdit, setPlantNameEdit] = useState(
    /** @returns {EditMode<string>} */
    () => ({ tag: 'no_edit' })
  );
  const [descriptionEdit, setDescriptionEdit] = useState(
    /** @returns {EditMode<string>} */
    () => ({ tag: 'no_edit' })
  );
  const [contactEdit, setContactEdit] = useState(
    /** @returns {EditMode<string>} */
    () => ({ tag: 'no_edit' })
  );

  useEffect(() => {
    const timout = setTimeout(() => {
      setImageUrlEdit(mode => {
        if (mode.tag === 'edit') {
          return {
            ...mode,
            value: {
              ...mode.value,
              loaded: mode.value.input
            }
          };
        } else {
          return mode;
        }
      })
    }, 1000);
    return () => clearTimeout(timout);
  }, [imageUrlEdit]);

  /** @type {useState<'offer' | 'request' | undefined>} */
  const [postTypeInput, setPostTypeInput] = useState();
  /** @type {useState<string | undefined>} */
  const [contactInput, setContactInput] = useState();

  const loadedImage = useMemo(() => {
    if (imageUrlEdit.tag === 'edit') {
      return imageUrlEdit.value.loaded;
    } else if (post.tag === 'Some') {
      return post.post.image_url;
    } else {
      return null;
    }
  }, [post, imageUrlEdit]);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [user, id]);

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = event => {
    event.preventDefault();

    /** @type {EditPost} */
    const data = {};
    if (postTypeInput !== undefined) {
      data.type = postTypeInput;
    }
    if (plantNameEdit.tag === 'edit') {
      const trimmed = plantNameEdit.value.trim();
      if (trimmed.length < 1) {
        alert('Plant name required');
        return;
      } else {
        data.plantName = trimmed;
      }
    }
    if (loadedImage !== null) {
      const trimmed = loadedImage.trim();
      if (trimmed.length < 1) {
        data.imageUrl = null
      } else {
        data.imageUrl = trimmed;
      }
    }
    if (descriptionEdit.tag === 'edit') {
      const trimmed = descriptionEdit.value.trim();
      if (trimmed.length < 1) {
        data.description = null;
      } else {
        data.description = trimmed;
      }
    }
    if (contactEdit.tag === 'edit') {
      const trimmed = contactEdit.value.trim();
      if (trimmed.length < 1) {
        alert('Contact method required');
        return;
      } else {
        data.contact = trimmed;
      }
    }

    dispatch(editPost(id, data));
  };

  /**
   * @param {Post} post 
   */
  const showEditImageUrl = post => {
    if (imageUrlEdit.tag === 'edit') {
      return (
        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrlEdit.value.input}
            onChange={event => {
              setImageUrlEdit({
                ...imageUrlEdit,
                value: {
                  ...imageUrlEdit.value,
                  input: event.target.value
                }
              })
            }}
          />
          <button
            type="button"
            onClick={() => {
              setImageUrlEdit({ tag: 'no_edit' });
            }}
          >
            X
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              setImageUrlEdit({ tag: 'edit', value: { input: post.image_url || '', loaded: post.image_url || '' } })
            }}
          >
            {post.image_url === null ? 'Add image' : 'Change image'}
          </button>
        </div>
      );
    }
  }

  /**
   * @param {Post} post
   */
  const showEditPostType = post => {
    return (
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
            checked={postTypeInput ? postTypeInput === 'offer' : post.type === 'offer'}
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
            checked={postTypeInput ? postTypeInput === 'request' : post.type === 'request'}
          />
        </label>
      </fieldset>
    );
  };

  /**
   * @param {Post} post
   */
  const showEditPlantName = post => {
    if (plantNameEdit.tag === 'edit') {
      return (
        <div>
          <input
            type="text"
            placeholder="Plant name"
            value={plantNameEdit.value}
            onChange={event => {
              setPlantNameEdit(mode => {
                if (mode.tag === 'edit') {
                  return { ...mode, value: event.target.value };
                } else {
                  return mode;
                }
              });
            }}
          />
          <button
            type="button"
            onClick={() => {
              setPlantNameEdit({ tag: 'no_edit' })
            }}
          >
            X
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{post.plant_name}</p>
          <button
            type="button"
            onClick={() => {
              setPlantNameEdit({
                tag: 'edit',
                value: post.plant_name
              });
            }}
          >
            Edit
          </button>
        </div>
      );
    }
  };

  /**
   * @param {Post} post
   */
  const showEditDescription = post => {
    switch (descriptionEdit.tag) {
      case 'edit':
        return (
          <div>
            <textarea
              placeholder="Description"
              value={descriptionEdit.value}
              onChange={event => {
                setDescriptionEdit(mode => {
                  switch (mode.tag) {
                    case 'edit':
                      return { ...mode, value: event.target.value };
                    case 'no_edit':
                      return mode;
                    default:
                      return never(mode);
                  }
                });
              }}
            />
            <button
              type="button"
              onClick={() => {
                setDescriptionEdit({ tag: 'no_edit' });
              }}
            >
              X
            </button>
          </div>
        );
      case 'no_edit':
        return (
          <div>
            {post.description === null ? <p>No description</p> : <p>{post.description}</p>}
            <button
              type="button"
              onClick={() => {
                setDescriptionEdit({ tag: 'edit', value: post.description || '' });
              }}
            >
              Edit
            </button>
          </div>
        );
      default:
        return never(descriptionEdit);
    }
  };

  /**
   * @param {Post} post
   */
  const showEditContact = post => {
    switch (contactEdit.tag) {
      case 'edit':
        return (
          <div>
            <input
              type="text"
              placeholder="Contact"
              value={contactEdit.value}
              onChange={event => {
                setContactEdit(mode => {
                  switch (mode.tag) {
                    case 'edit':
                      return { ...mode, value: event.target.value };
                    case 'no_edit':
                      return mode;
                    default:
                      return never(mode);
                  }
                });
              }}
            />
            <button
              type="button"
              onClick={() => {
                setContactEdit({ tag: 'no_edit' });
              }}
            >
              X
            </button>
          </div>
        );
      case 'no_edit':
        return (
          <div>
            <p>{post.contact_url}</p>
            <button
              type="button"
              onClick={() => {
                setContactEdit({ tag: 'edit', value: post.contact_url });
              }}
            >
              Edit
            </button>
          </div>
        );
      default:
        return never(contactEdit);
    }
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
            {loadedImage ? <img src={loadedImage} /> : <></>}
            {showEditImageUrl(data)}
            {showEditPostType(data)}
            {showEditPlantName(data)}
            {showEditDescription(data)}
            {showEditContact(data)}
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
