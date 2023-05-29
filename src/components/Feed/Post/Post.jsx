import React from 'react';
import styles from './Post.module.css';

/**
 * @typedef Location
 * @property {number} latitude
 * @property {number} longitude
 * @typedef Props
 * @property {'offer' | 'request'} type
 * @property {string} plantName
 * @property {string} [imageUrl]
 * @property {string} [description]
 * @property {Location} location
 */

/**
 * @param {Props} props
 */
function Post({ type, plantName, imageUrl, description, location: { latitude, longitude } }) {
  return (
    <div className={styles['card']}>
      <img className={styles['img']} src={imageUrl} alt={plantName} />
      <p>Post type: {type}</p>
      <p>Plant name: {plantName}</p>
      <p>{description}</p>
    </div>
  );
}

export default Post;
