import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['location', 'asset', 'assignedTo', 'seenBy'],
});
