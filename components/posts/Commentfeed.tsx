import React from 'react';
import CommentItem from './CommentItem';

interface CommentfeedProps {
  comments?: Record<string, any>;
}

const Commentfeed: React.FC<CommentfeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: any) => {
        return <CommentItem key={comment.id} data={comment} />;
      })}
    </>
  );
};

export default Commentfeed;
