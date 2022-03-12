import React from 'react';
import {getHeaders} from './utils.js';

class LikeButton extends React.Component { 

    constructor(props) {
        super(props);

        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    toggleLike (ev) {
        // console.log('toggleLike');
        if(this.props.likeId) {
            this.unlike();
        } else {
            this.like();
        }
    }

    like () {
        // console.log("LIKE");
        const postId = this.props.postId;
        fetch('/api/posts/' + postId + '/likes', {
            headers: getHeaders(),
            body: JSON.stringify({}),
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // this.requeryPost();
            this.props.requeryPost();
        })
    }

    unlike () {
        // console.log("UNLIKE");
        const postId = this.props.postId;
        const likeId = this.props.likeId;
        fetch('/api/posts/' + postId + '/likes/' + likeId, {
            headers: getHeaders(),
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // this.requeryPost();
            this.props.requeryPost()
        })
    }

    render () {
        const likeId = this.props.likeId;
        // console.log("RENDERING");
        return (
            <button role="switch"
            className='like'
                aria-label="Like Button" 
                aria-checked={likeId ? true : false}
                onClick={this.toggleLike}>
                <i className={likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        ); 
    }
}

export default LikeButton;