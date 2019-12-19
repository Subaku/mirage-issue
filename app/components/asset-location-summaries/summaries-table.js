import Component from '@ember/component';

export default class SummariesTable extends Component {
  classNames = ['summaries-table'];

  summaryColumns = [
    {name: 'Location', slug: 'location'},
    {name: 'Inventory', slug: 'inventory'},
    {name: 'Non-Assigned Inventory', slug: 'non-assigned'},
    {name: '', slug: 'actions'},
  ];

  didInsertElement() {
    // EmberTable doesn't have any way to access the <table></table> element itself so we resort to
    // this in order to hook it up to Bootstrap's CSS.
    this.element.querySelector('table').classList.add('table', 'table-condensed');
  }
}
