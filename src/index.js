import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';
import registerServiceWorker from './registerServiceWorker';

// import 'antd/dist/antd.css';
// import '../node_modules/grommet-css'


ReactDOM.render(<Quiz />, document.getElementById('root'));
registerServiceWorker();


if (module.hot) {
    module.hot.accept();
    }