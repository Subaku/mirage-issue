import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import * as moment from 'moment-timezone';


module('Integration | Helper | humanize-date', function(hooks) {
  setupRenderingTest(hooks);

  let dt = '2019-12-07T10:05:00Z';

  hooks.beforeEach(function() {
    this.set('dtStr', dt);
  })

  test('it renders properly', async function(assert) {
    await render(hbs`{{humanize-date dtStr}}`);
    assert.equal(this.element.textContent.trim(), moment.utc(dt).fromNow());
  });
});
