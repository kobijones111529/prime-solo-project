import styles from './Post.module.css';

function Post({ type, plantName, imageUrl, description, location: { latitude, longitude } }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={imageUrl} alt={plantName} />
      <p>{type}</p>
      <p>{plantName}</p>
      <p>{description}</p>
      <p>{latitude}, {longitude}</p>
      <button>View</button>
    </div>
  );
}

export default Post;
