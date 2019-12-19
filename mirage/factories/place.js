import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

let levelToIcon = {
  0: 'icon-organization',
  1: 'icon-yard',
  2: [
    'icon-bkt-truck',
    'icon-crew',
    'icon-room',
    'icon-foreman-truck',
    'icon-heavy-foreman-truck',
    'icon-line-truck',
    'icon-sqt-truck',
    'icon-pump-truck',
  ],
  3: [
    'icon-bkt-truck',
    'icon-foreman-truck',
    'icon-heavy-foreman-truck',
    'icon-line-truck',
    'icon-sqt-truck',
    'icon-pump-truck',
  ]
}

export default Factory.extend({
  name() {
    return faker.address.city();
  },

  level() {
    // Level 1-3
    return Math.floor(Math.random() * 2 + 1);
  },

  lft(i) {
    return i;
  },

  url(i) {
    return `http://example.com/place/${i}/`;
  },

  icon() {
    let icons = levelToIcon[this.level];
    if (typeof icons === 'string' ) {
      return icons;
    } else {
      return icons[Math.floor(Math.random() * icons.length)]
    }
  }
});
