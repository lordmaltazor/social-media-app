import React, { useState } from 'react';
import firebase from 'firebase';
import { firestore } from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import CreatePostModal from './CreatePostModal';
import Feed from './Feed';
import SearchForUserModal from './SearchForUserModal';

function Homepage({ user, setHasLoggedIn, users, usersRef }) {
    const [creatingPost, setCreatingPost] = useState(false);
    const [creatingComment, setCreatingComment] = useState(false);
    const [addingFriend, setAddingFriend] = useState(false);

    const [postText, setPostText] = useState('');

    const postsRef = firestore.collection('posts');
    const query = postsRef.orderBy('createdAt', "desc");
    const [posts] = useCollectionData(query, { idField: 'id' });

    const friendsRef = usersRef.doc(user.id).collection('friends');
    const [friends] = useCollectionData(friendsRef, { idField: 'id' });

    const [menu, setMenu] = useState(false);

    const getFriendsPost = () => {
        if (friends == null) {
            return;
        }

        let friendsPosts = [];

        let friendsNames = [];
        for (let i = 0; i < friends.length; i++) {
            friendsNames[i] = friends[i].username;
        }

        for (let i = 0; i < posts.length; i++) {
            if (friendsNames.includes(posts[i].sender)) {
                friendsPosts.push(posts[i]);
            }
        }

        //console.log(friendsPosts);

        return friendsPosts;
    }

    getFriendsPost();

    const signOut = () => {
        setHasLoggedIn(false);
    }

    const createPost = () => {
        setPostText('');

        setCreatingPost(true);
    }

    const cancelPost = () => {
        setCreatingPost(false);
    }

    const post = () => {
        if (postText !== '') {
            setCreatingPost(false);

            addPostToDatabase();
        }
    }

    const addPostToDatabase = async () => {
        await postsRef.add({
            text: postText,
            likedBy: [],
            sender: user.username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return (
        <div className="homepage">
            <nav>
                <h1 className="title">Social Media App</h1>

                <div className="desktop-nav">
                    <div className="buttons-container">
                        <button className="create-post-button" onClick={createPost}>Create Post</button>
                        <button className="add-friend-button" onClick={() => setAddingFriend(true)}>Add Friend</button>
                    </div>

                    <div className="profile-info">
                        <p className="current-username">{user.username}</p>
                        <button className="sign-out-button" onClick={signOut}>Sign Out</button>
                    </div>
                </div>

                <div className="mobile-nav">
                    <button className="hamburger-menu-button" onClick={() => setMenu(true)}><FaBars /></button>

                    {menu && <div className="backdrop"></div>}

                    {menu && <div className="mobile-menu">
                        <button className="close" onClick={() => setMenu(false)}><FaTimes /></button>

                        <div className="mobile-profile-info">
                            <p className="mobile-current-username">{user.username}</p>
                            <button className="mobile-sign-out-button" onClick={signOut}>Sign Out</button>
                        </div>

                        <div className="mobile-buttons-container">
                            <button className="mobile-create-post-button" onClick={() => {
                                createPost();
                                setMenu(false);
                            }}>Create Post</button>
                            <button className="mobile-add-friend-button" onClick={() => {
                                setAddingFriend(true);
                                setMenu(false);
                            }}>Add Friend</button>
                        </div>
                    </div>}
                </div>
            </nav>

            <Feed getFriendsPost={getFriendsPost} postsRef={postsRef} username={user.username} creatingComment={creatingComment} setCreatingComment={setCreatingComment} />

            {creatingPost && <CreatePostModal setPostText={setPostText} cancelPost={cancelPost} post={post} />}

            {addingFriend && <SearchForUserModal user={user} users={users} usersRef={usersRef} friends={friends} friendsRef={friendsRef} setAddingFriend={setAddingFriend} />}
        </div>
    )
}

export default Homepage;
