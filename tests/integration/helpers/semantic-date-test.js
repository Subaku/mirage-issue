import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | semantic-date', function(hooks) {
  setupRenderingTest(hooks);

  let dt = '2019-12-05T12:27:08Z';

  hooks.beforeEach(function() {
    this.set('dtStr', dt);
  });

  test('it renders to default format', async function(assert) {
    await render(hbs`{{semantic-date dtStr}}`);

    assert.dom('time').hasAttribute('datetime', dt);
    assert.dom('time').hasText('12:27pm 12/05');
  });

  test('it renders with given format', async function(assert) {
    await render(hbs`{{semantic-date dtStr fmt="YYYY/DD/MM hh"}}`);

    assert.dom('time').hasAttribute('datetime', dt);
    assert.dom('time').hasText('2019/05/12 12');
  });

  test('it renders for given timezone', async function(assert) {
    await render(hbs`{{semantic-date dtStr tz="US/Eastern"}}`);

    assert.dom('time').hasAttribute('datetime', dt);
    assert.dom('time').hasText('7:27am 12/05');
  });
});
