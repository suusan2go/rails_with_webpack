import React from 'react';

const renderComment = comments => (
  comments.map((comment, i) => (
    <div className="alert alert-warning" key={i}>
      <h2>コメントの詳細</h2>
      <p>{comment}</p>
    </div>
  ))
);

export default function CommentList(props) {
  const { comments } = props;
  return (
    <div>
      <h2>コメント一覧です</h2>
      {renderComment(comments)}
    </div>
  );
}

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
};
