import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper(function levelIndicator([level, offset=0], { indicator='&nbsp;&nbsp;&nbsp;' }) {
  return htmlSafe(indicator.repeat(level - offset));
});
