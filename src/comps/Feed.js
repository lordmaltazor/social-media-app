import React, { useState } from 'react';
import CommentsModal from './CommentModal';
import Post from './Post';

function Feed({posts, postsRef, username, creatingComment, setCreatingComment}) {
    const [inspectedPost, setInspectedPost] = useState(null);
    
    return (
        <div className="feed">
            {(posts && posts.length > 0) ? posts.map(post => <Post key={post.id} post={post} postsRef={postsRef} username={username} isInteractable={true} creatingComment={creatingComment} setCreatingComment={setCreatingComment} setInspectedPost={setInspectedPost}/>) : <p className="no-posts">There doesn't seem to be any posts here yet :/</p>}

            {creatingComment && <CommentsModal post={inspectedPost} postsRef={postsRef} username={username} setCreatingComment={setCreatingComment}/>}
        </div>
    )
}

export default Feed;
