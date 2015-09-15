import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import NavHelper from './components/nav-helper';
import Nav from './components/nav-switcher';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'Layout',

    render () {

        const {navs} = this.props;

        return (
            <NavHelper>
                <nav className='top-nav top-nav-light cf' role='navigation'>
                    <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
                    <label htmlFor='menu-toggle'>Menu</label>
                    <ul className='list-unstyled list-inline breadcrumbs'>
                        <li><a className='piq-link' href='/'></a></li>
                        {navs.map((nav) => {
                            return <Nav key={nav.title} nav={nav}/>
                        })}
                    </ul>
                </nav>
                <div className='body'>
                    { this.props.children }
                </div>
            </NavHelper>
        );
    }
})
