import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import React from "react";
import { never } from "util/never";
import PropTypes from "prop-types";

/**
 * @typedef {object} Props
 * @property {number} id
 * @property {'offer' | 'request'} type
 * @property {string} plantName
 * @property {string} [imageUrl]
 * @property {string} [description]
 * @property {string} contact
 */

/**
 * @param {Props} props
 * @returns {React.JSX.Element}
 */
function Post({ id, type, plantName, imageUrl, description, contact }) {
	const showPostType = () => {
		switch (type) {
			case "offer":
				return (
					<img
						src="images/price-tag-icon.png"
						className={styles["post-type-icon"]}
					/>
				);
			case "request":
				return (
					<img
						src="images/hand-open.png"
						className={styles["post-type-icon"]}
					/>
				);
			default:
				return never(type);
		}
	};

	const showDescription = () => {
		if (description) {
			return <p className={styles["description"]}>{description}</p>;
		} else {
			return <></>;
		}
	};

	return (
		<div className={styles.card}>
			<img className={styles.img} src={imageUrl} alt={plantName} />
			<div className={styles["top-row"]}>
				{showPostType()}
				<h3>{plantName}</h3>
			</div>
			{showDescription()}
			<div className={styles["contact"]}>
				<h4>Contact</h4>
				<p>{contact}</p>
			</div>
			<Link to={`/posts/${id}`}>
				<button>View</button>
			</Link>
		</div>
	);
}

Post.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	plantName: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
	description: PropTypes.string,
	contact: PropTypes.string.isRequired,
};

export default Post;
