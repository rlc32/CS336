import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import '../css/base.css';

import CommentBox from './commentBox';
import CommentEdit from './commentEdit';
import { StoreTools } from './flux';
StoreTools.startLoadingComments();


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={CommentBox}/>
        <Route path="/:id" component={CommentEdit} />
    </Router>
), document.getElementById('content')
);