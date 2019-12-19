import Component from '@ember/component';
import { readOnly, notEmpty, mapBy, sum } from '@ember/object/computed';
import { action, computed } from '@ember/object';


export default class AssetLocationSummaries extends Component {
  @readOnly('summariesTask.value') summaries;
  @readOnly('summariesTask.isRunning') isSummariesLoading;

  assetLocationsTask = null;
  selectedLocation = null;
  @readOnly('assetLocationsTask.isRunning') isAssetLocationsLoading;

  @readOnly('assetLocationsTask.value') assetLocations;
  @notEmpty('assetLocations') showAssetLocations;
  @mapBy('assetLocations', 'asset') locationAssets;
  @mapBy('locationAssets', 'value') assetValues;
  @sum('assetValues') totalAssetValue;


  /***** Getters ******/

  @computed('summaries.[]')
  get summariesAsRows() {
    // Something about Ember-Data's RecordArray stuff throws Ember Table off...
    return this.summaries.toArray();
  }

  @computed('locationAssets.[]')
  get totalTools() {
    return this.locationAssets.reduce((total, asset) => {
      return total + (asset.get('isTool') ? 1 : 0);
    }, 0)
  }

  @computed('locationAssets.[]')
  get totalEquipment() {
    return this.locationAssets.reduce((total, asset) => {
      return total + (asset.get('isEquipment') ? 1 : 0);
    }, 0)
  }


  /***** Actions ******/

  @action
  viewAssetLocations(forLocation) {
    this.set('assetLocationsTask', this.get('fetchAssetLocations')(forLocation));
    this.set('selectedLocation', forLocation);
  }

  @action
  stopViewingAssetLocations() {
    this.set('assetLocationsTask', null);
    this.set('selectedLocation', null);
  }
}
