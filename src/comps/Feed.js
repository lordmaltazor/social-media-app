import React, { useState } from 'react';
import CommentsModal from './CommentModal';
import Post from './Post';

function Feed({getFriendsPost, postsRef, username, creatingComment, setCreatingComment}) {
    const [inspectedPost, setInspectedPost] = useState(null);
    
    //console.log(getFriendsPost()[0]);

    return (
        <div className="feed">
            {getFriendsPost() && getFriendsPost().length > 0 ? getFriendsPost().map(post => <Post key={post.id} post={post} postsRef={postsRef} username={username} isInteractable={true} creatingComment={creatingComment} setCreatingComment={setCreatingComment} setInspectedPost={setInspectedPost}/>) : <p className="no-posts">Click the 'Add Friend' button to add friends!</p>}

            {creatingComment && <CommentsModal post={inspectedPost} postsRef={postsRef} username={username} setCreatingComment={setCreatingComment}/>}
        </div>
    )
}

export default Feed;
