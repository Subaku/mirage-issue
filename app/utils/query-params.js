import { isEmpty, isNone } from '@ember/utils';

import * as moment from 'moment-timezone';

import { WHEN_SEEN_SEP, QUERY_LOOKUP_SEP } from "../constants";


function whenSeenTokenizer(value) {
  let token = {
    'Seen': 's',
    'Not Seen': 'ns',
    'days': 'd',
    'hours': 'h'
  }[value];

  return token || null;
}

function parseWhenSeenToken(token) {
  let value = {
    's': 'Seen',
    'ns': 'Not Seen',
    'd': 'days',
    'h': 'hours'
  }[token];

  return value || null;
}


/**
 * Parse apart a string representing the when_seen query parameter. The format of the parameter is
 * in the following format:
 * <s|ns>-<a digit>-<d|h>
 *
 * s - Seen
 * ns - Not Seen
 * d - days
 * h - hours
 *
 * So ns10d means "Not Seen for 10 days" etc.
 * Values returned will be in the following order: ["Seen", "5", "days"]
 *
 * @param {String} whenSeen The parameter to parse.
 * @returns {null|Array} Values parsed apart and converted or null.
 */
export function parseWhenSeen(whenSeen) {
  if (isEmpty(whenSeen)) {
    return null;
  }

  let values = whenSeen.split(WHEN_SEEN_SEP).map((token, i) => {
    // The middle value is expected to be the number.
    if (i === 1) {
      return Number.isInteger(parseInt(token)) ? token : null;
    }
    return parseWhenSeenToken(token);
  });
  return values.length !== 3 || values.any(value => isEmpty(value)) ? null : values;
}

/**
 * Takes individual values and constructs a string meant for use as a query parameter. The returned
 * string format is of the form expected for parseWhenSeen().
 *
 *
 * @param {String} visionValue Either "Seen" or "Not Seen"
 * @param {Number} timeValue A valid Number. This value can be as a string.
 * @param {String} timeType Either "days" or "hours"
 * @returns {string|null} Query parameter for when_seen or null.
 */
export function constructWhenSeen(visionValue, timeValue, timeType) {
  let tokens = [
    whenSeenTokenizer(visionValue),
    timeValue,
    whenSeenTokenizer(timeType)
  ];

  if (tokens.any(token => isEmpty(token)) || !Number.isInteger(parseInt(tokens[1]))) {
    return null
  }

  return tokens.join(WHEN_SEEN_SEP);
}


export function whenSeenToQueryParam(whenSeen, fromNow=null) {
  if (isEmpty(whenSeen)) {
    return null;
  }

  let [visionType, timeValue, timeType] = parseWhenSeen(whenSeen);
  let now = isEmpty(fromNow) ? moment.utc() : fromNow;

  let lookup = {
    'Seen': 'gte',
    'Not Seen': 'lt'
  }[visionType];

  let dtValue = now.subtract(timeValue, timeType).toISOString();
  return {[`when_seen${QUERY_LOOKUP_SEP}${lookup}`]: dtValue};
}

export function normalizeAssetLocationParams(params) {
  let query = {};

  for (let [param, value] of Object.entries(params)) {
    if (param === 'when_seen' && !isNone(value)) {
      query = Object.assign(query, whenSeenToQueryParam(value));
    } else if (!isNone(value)) {
      query[param] = value;
    }
  }
  return query;
}
