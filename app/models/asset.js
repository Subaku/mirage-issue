import DS from 'ember-data';
import { match } from '@ember/object/computed';

const { Model, attr } = DS;

export default class Asset extends Model{
  @attr('string') name;
  @attr('string') assetType;
  @attr('string') assetId;
  @attr('string') category;
  @attr('number') value;

  // Url to this asset's detail page
  @attr('string') url;

  @match('category', /Equipment/) isEquipment;
  @match('category', /Tool/) isTool;
}
