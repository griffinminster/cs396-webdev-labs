import React from 'react';
import BookmarkButton from './BookmarkButton';
import LikeButton from './LikeButton';
import {getHeaders} from './utils'

class Post extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            // post: this.props.model
            model: this.props.model
        };
        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        console.log("requeryPost");
        // fetch(`/api/posts/${this.state.post.id}`, {
        fetch('api/posts/' + this.props.model.id , {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                // post: data,
                // isModalShowing: false
                model: data
            });
        });
    }

    componentDidUpdate() {
        console.log("updated")
    }

    render () {
        // const post = this.state.post;
        const post = this.state.model;
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div>
                        <LikeButton 
                            likeId={post.current_user_like_id}
                            postId={post.id}
                            requeryPost={this.requeryPost} />
                        <BookmarkButton
                            bookmarkId={post.current_user_bookmark_id}
                            postId={post.id}
                            requeryPost={this.requeryPost}/>
                    </div>
                    <p>{ post.caption }</p>
                </div>
            </section> 
        ); 
    }
}

export default Post;