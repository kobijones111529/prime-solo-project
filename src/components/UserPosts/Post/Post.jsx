import { Link } from 'react-router-dom';
import styles from './Post.module.css';
import React from 'react';
import PropTypes from 'prop-types'

/**
 * @typedef {object} Props
 * @property {number} id
 * @property {'offer' | 'request'} type
 * @property {string} plantName
 * @property {string} [imageUrl]
 */

/**
 * @param {Props} props
 */
function Post({ id, type, plantName, imageUrl }) {
  return (
    <div className={styles['card']}>
      <img className={styles['img']} src={imageUrl} alt={plantName} />
      <p>{type}</p>
      <p>{plantName}</p>
      <Link to={`/posts/${id}`}><button>View</button></Link>
    </div>
  );
}

export default Post;
