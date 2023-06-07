import { useEffect } from "react";
import Post from "./Post/Post";
import { fetchUserPosts } from "../../../../redux/sagas/posts";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useHistory } from "react-router-dom";

import styles from "./UserPosts.module.css";

/**
 * @typedef {import("../../../../../types/posts").Post} Post
 */

function UserPosts() {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const user = useAppSelector((store) => store.user);
	const posts = useAppSelector((store) => store.posts);

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, [user]);

	const handleCreatePost = () => {
		history.push("/posts/new");
	};

	const showPosts = () => {
		switch (posts.tag) {
			case "None":
			case "Loading":
				return <p>Loading...</p>;
			case "Some":
				return (
					<ol className={styles["posts-container"]}>
						{posts.posts.map(
							/**
							 * @param {Post} post
							 */
							(post) => (
								<li key={post.id}>
									<Post
										id={post.id}
										type={post.type}
										plantName={post.plant_name}
										{...(post.image_url && { imageUrl: post.image_url })}
										{...(post.description && { description: post.description })}
										contact={post.contact_url}
									/>
								</li>
							)
						)}
					</ol>
				);
			default:
				return <p>{"Something went wrong :("}</p>;
		}
	};

	return (
		<div className={styles["container"]}>
			<i
				onClick={handleCreatePost}
				className={["fa-solid", "fa-plus", styles["create-post-button"]].join(
					" "
				)}
			/>
			{showPosts()}
		</div>
	);
}

export default UserPosts;
