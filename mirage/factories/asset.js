import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.lorem.word();
  },

  assetType() {
    return faker.lorem.word();
  },

  assetId() {
    return faker.lorem.word();
  },

  category(i) {
    return i % 2 === 0 ? 'Tool' : 'Equipment';
  },

  value() {
    return Math.floor(Math.random() * 3000);
  },

  url(i) {
    return `http://example.com/asset/${i}/`;
  }
});
