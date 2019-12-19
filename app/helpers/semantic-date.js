import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

import * as moment from 'moment-timezone';


export default helper(function semanticDate([value], {fmt='h:mma MM/DD', tz=null}) {
  var formattedDate = tz === null ? moment.utc(value).format(fmt) : moment.utc(value).tz(tz).format(fmt);
  return htmlSafe(`<time datetime="${value}">${formattedDate}</time>`)
});
