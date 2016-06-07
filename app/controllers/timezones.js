import Ember from 'ember';

export default Ember.Controller.extend({
  /* create array of timezones with name & offset */
  init: function() {
    var timezones = [];
    for (var i in moment.tz._zones) {
      timezones.push({
        name: moment.tz._zones[i].name,
        offset: moment.tz._zones[i].offsets[0]
      });
    }
    this.set('timezones', timezones);
    this._super();
  },
  selectedTimezone: null,
  actions: {
    /* save a timezone record to our offline datastore */
    change: function(){
      const selectedEl = Ember.$('#timezone-select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const options = Ember.$('#timezone-select option');
      const selectedValue = options[selectedIndex].value;
      const selectedLabel = options[selectedIndex].label;
      this.set('selectedTimezone',{
        name: selectedLabel,
        offset: selectedValue
      })
    },
    add: function() {
      var timezone = this.store.createRecord('timezone', {
        name: this.get('selectedTimezone').name,
        offset: this.get('selectedTimezone').offset
      });
      timezone.save();
    },
    /* delete a timezone record from our offline datastore */
    remove: function(id) {
      this.store.findRecord('timezone', id).then(function(time) {
        time.destroyRecord();
      });
    }
  }
});
