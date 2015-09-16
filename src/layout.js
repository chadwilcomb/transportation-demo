import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import NavHelper from './components/nav-helper';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'Layout',

    render () {

        return (
            <NavHelper>
                <nav className='top-nav top-nav-light cf' role='navigation'>
                    <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
                    <label htmlFor='menu-toggle'>Menu</label>
                    <ul className='list-unstyled list-inline breadcrumbs'>
                        <li><a className='piq-link' href='/'></a></li>
                        <li className='button-group'>
                          <a href='/' className='current-item'>Transportation Study Zones</a>
                        </li>
                    </ul>
                </nav>
                <div className='body'>
                    { this.props.children }
                </div>
            </NavHelper>
        );
    }
})
