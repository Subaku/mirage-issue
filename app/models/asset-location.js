import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;


export default class AssetLocation extends Model{
  @belongsTo('asset') asset;
  @belongsTo('place', { inverse: null }) location;
  @belongsTo('place', { inverse: null }) assignedTo;
  @belongsTo('place', { inverse: null }) seenBy;
  @attr('string') whenSeen;
}
