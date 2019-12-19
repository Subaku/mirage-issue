import Controller from '@ember/controller';
import { action } from '@ember/object';

import { task } from 'ember-concurrency';

import { normalizeAssetLocationParams } from 'inventory/utils/query-params';


export default class Index extends Controller{

  /***** Tasks ******/

  @task(function * (forLocation) {
    // query = Object.assign(query, {location: forLocation.get('id')});
    // return yield this.store.query('asset-location', query);
    return yield this.store.findAll('asset-location');
  }).restartable() fetchAssetLocationsTask;

  /***** Actions ******/

  @action
  fetchAssetLocations(forLocation) {
    return this.fetchAssetLocationsTask.perform(forLocation);
  }
}
