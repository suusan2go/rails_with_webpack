import React, { Component } from 'react';
import CommentList from './CommentList';

export default class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ comment: e.target.value });
  }

  onClick() {
    const comments = this.state.comments;
    comments.push(this.state.comment);
    this.setState({ comments, comment: '' });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>コメントツールです</h1>
        <textarea onChange={this.onChange} ref="comment" />
        <br />
        <button className="btn btn-primary" onClick={this.onClick}>追加</button>
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}
