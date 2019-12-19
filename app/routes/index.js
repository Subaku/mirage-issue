import Route from '@ember/routing/route';

import { task } from 'ember-concurrency';


export default class IndexRoute extends Route{

  @task(function * (params) {
    return yield this.store.findAll('asset-location-summary');
  }).cancelOn('deactivate').restartable() fetchSummariesTask;


  model(params) {
    return {
      summariesTask: this.fetchSummariesTask.perform(params)
    };
  }
}
