import DS from 'ember-data';
import { isNone } from '@ember/utils';

import ApplicationSerializer from './application';

const { EmbeddedRecordsMixin } = DS;

export default class AssetLocationSummarySerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    location: { embedded: 'always' }
  };

  // extractId(modelClass, resourceHash) {
  //   return isNone(resourceHash['location']) ? -1 : resourceHash['location']['id'];
  // }
}
