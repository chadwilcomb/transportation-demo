import State from 'ampersand-state';
// import numeral from 'numeral';

export default State.extend({

    idAttribute: 'person_type_id',
    props: {
        person_type_id: 'string',
        name: 'string'
    },

    initialize () {
        this.on('change:person_type_id', this.resetCategory);
    },

    resetCategory () {
        app.category.category = null;
        app.category.name = null;
    },

});
