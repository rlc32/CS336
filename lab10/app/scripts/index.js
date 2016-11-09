import React from 'react';
import ReactDOM from 'react-dom';


import '../css/base.css';
import CommentBox from './commentBox';




ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval="{2000}" />,
  document.getElementById('content')
);