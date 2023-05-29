import { Link } from 'react-router-dom';
import styles from './Post.module.css';
import React from 'react';

function Post({ id, type, plantName, imageUrl }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={imageUrl} alt={plantName} />
      <p>{type}</p>
      <p>{plantName}</p>
      <Link to={`/posts/${id}`}><button>View</button></Link>
    </div>
  );
}

export default Post;
