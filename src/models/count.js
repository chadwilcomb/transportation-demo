import Model from 'ampersand-model';
// import numeral from 'numeral';

export default Model.extend({

    props: {
        origin: 'number',
        destination: 'number',
        count: 'number',
        hour: 'number',
    },

    
    // derived: {
    //     index: {
    //         deps: ['value'],
    //         fn () {
    //             return numeral(this.value).format('0%');
    //         }
    //     },
    // }

});
