import { module, test } from 'qunit';

import * as moment from 'moment-timezone';

import {
  parseWhenSeen,
  constructWhenSeen,
  whenSeenToQueryParam
} from 'inventory/utils/query-params';


module('Unit | Utility | query-params | parseWhenSeen', function() {

  test('it handles variations of "none"', function(assert) {
    assert.strictEqual(parseWhenSeen(null), null);
    assert.strictEqual(parseWhenSeen(undefined), null);
    assert.strictEqual(parseWhenSeen(''), null);
  });

  test('it correctly parses apart values', function(assert) {
    assert.deepEqual(parseWhenSeen('s-6-d'), ['Seen', '6', 'days']);
    assert.deepEqual(parseWhenSeen('s-4-h'), ['Seen', '4', 'hours']);
    assert.deepEqual(parseWhenSeen('ns-10-d'), ['Not Seen', '10', 'days']);
    assert.deepEqual(parseWhenSeen('ns-9-h'), ['Not Seen', '9', 'hours']);
  });

  test('it does not parse partially correct values', function(assert) {
    assert.strictEqual(parseWhenSeen('sd'), null);
    assert.strictEqual(parseWhenSeen('s-d'), null);
    assert.strictEqual(parseWhenSeen('s-4'), null);
    assert.strictEqual(parseWhenSeen('10-d'), null);
    assert.strictEqual(parseWhenSeen('n-9-h'), null);
    assert.strictEqual(parseWhenSeen('ns-s-h'), null);
  });
});

module('Unit | Utility | query-params | constructWhenSeen', function() {

  test('it handles variations of "none"', function(assert) {
    assert.strictEqual(constructWhenSeen(null, null, null), null);
    assert.strictEqual(constructWhenSeen(undefined, undefined, undefined), null);
    assert.strictEqual(constructWhenSeen('', '', ''), null);
  });

  test('it does not construct partially correct values', function(assert) {
    assert.strictEqual(constructWhenSeen('Seen', '', ''), null);
    assert.strictEqual(constructWhenSeen('Not Seen', '', ''), null);
    assert.strictEqual(constructWhenSeen('Not Seen', '6', ''), null);
    assert.strictEqual(constructWhenSeen('Seen', null, 'days'), null);
  });

  test('it does not construct incorrect values', function(assert) {
    assert.strictEqual(constructWhenSeen('Seen By', '', ''), null);
    assert.strictEqual(constructWhenSeen('Not Seen', '6', 'months'), null);
    assert.strictEqual(constructWhenSeen('Seen', 'thing', 'days'), null);
  });

  test('it correctly constructs parameter', function(assert) {
    assert.strictEqual(constructWhenSeen('Seen', '7', 'days'), 's-7-d');
    assert.strictEqual(constructWhenSeen('Seen', '14', 'hours'), 's-14-h');
    assert.strictEqual(constructWhenSeen('Not Seen', '1', 'days'), 'ns-1-d');
    assert.strictEqual(constructWhenSeen('Not Seen', '3', 'hours'), 'ns-3-h');
  });
});

module('Unit | Utility | query-params | whenSeenToQueryParam', function() {

  test('it handles variations of "none"', function (assert) {
    assert.strictEqual(whenSeenToQueryParam(null), null);
    assert.strictEqual(whenSeenToQueryParam(undefined), null);
    assert.strictEqual(whenSeenToQueryParam(''), null);
  });

  test('correct variations return correct filter', function (assert) {
    let nowDt = '2019-09-20T10:10:10.000Z';
    assert.deepEqual(whenSeenToQueryParam('s-4-d', moment.utc(nowDt)), {'when_seen__gte': '2019-09-16T10:10:10.000Z'});
    assert.deepEqual(whenSeenToQueryParam('s-6-h', moment.utc(nowDt)), {'when_seen__gte': '2019-09-20T04:10:10.000Z'});
    assert.deepEqual(whenSeenToQueryParam('ns-10-d', moment.utc(nowDt)), {'when_seen__lt': '2019-09-10T10:10:10.000Z'});
    assert.deepEqual(whenSeenToQueryParam('ns-1-h', moment.utc(nowDt)), {'when_seen__lt': '2019-09-20T09:10:10.000Z'});
  });
});
