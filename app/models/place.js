import DS from 'ember-data';
const { Model, attr } = DS;


export default class Place extends Model{
  @attr('string') name;

  @attr('string') icon;

  // Url to this Place's details page
  @attr('string') url;

  @attr('number') level;
  @attr('number') lft;
}
