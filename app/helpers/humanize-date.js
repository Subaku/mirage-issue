import { helper } from '@ember/component/helper';

import * as moment from 'moment-timezone';


export default helper(function humanizeDate([value]) {
  return moment.utc(value).fromNow();
});
