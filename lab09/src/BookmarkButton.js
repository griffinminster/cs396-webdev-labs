import React from 'react';
import {getHeaders} from './utils.js';

class BookmarkButton extends React.Component { 

    constructor(props) {
        super(props);

        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.bookmark = this.bookmark.bind(this);
        this.unbookmark = this.unbookmark.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    toggleBookmark (ev) {
        // console.log('toggleBoomark');
        if(this.props.bookmarkId) {
            this.unbookmark();
        } else {
            this.bookmark();
        }
    }

    bookmark () {
        // console.log("BOOKMARK");
        fetch('/api/bookmarks', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({ post_id: this.props.postId })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // this.requeryPost();
            this.props.requeryPost();
        })
    }

    unbookmark () {
        // console.log("UNBOOKMARK");
        fetch(`/api/bookmarks/${this.props.bookmarkId}`, {
            headers: getHeaders(),
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // this.requeryPost();
            this.props.requeryPost();
        })
    }

    render () {
        const bookmarkId = this.props.bookmarkId;
        // console.log("RENDERING");
        return (
            <button role="switch"
            className='bookmark'
                aria-label="Bookmark Button" 
                aria-checked={bookmarkId ? true : false}
                onClick={this.toggleBookmark}>
                <i className={bookmarkId ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>                        
            </button>
        ); 
    }
}

export default BookmarkButton;