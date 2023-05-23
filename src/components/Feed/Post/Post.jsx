import styles from './Post.module.css';

function Post({ type, plantName, imageUrl, description, location: { latitude, longitude } }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={imageUrl} alt={plantName} />
      <p>Post type: {type}</p>
      <p>Plant name: {plantName}</p>
      <p>{description}</p>
    </div>
  );
}

export default Post;
