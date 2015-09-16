import Model from 'ampersand-model';
import numeral from 'numeral';

export default Model.extend({

    props: {
        origin: 'number',
        destination: 'number',
        count: 'number',
        percentage: 'number',
        hour: 'number',
    },


    derived: {
      pct: {
        deps: ['percentage'],
        fn () {
          return numeral(this.percentage).format('0.00%');
        }
      },
    }

});
