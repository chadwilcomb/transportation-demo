import React from 'react';
import NavHelper from '../components/nav-helper';

export default React.createClass({
    displayName: 'PublicPage',

    render () {
        return (
            <NavHelper className='container' >
              <header role='banner'>
                <a className='piq-link-lg' href='http://www.placeiq.com/' target='_blank'></a>
              </header>
              <div>
                <p>Building a new model of consumer behavior.</p>
                <a href='/zones' className='button button-large'>
                  <span className='mega-octicon octicon-pin'></span> Transportation Demo
                </a>
              </div>
            </NavHelper>
        )
    }
});
