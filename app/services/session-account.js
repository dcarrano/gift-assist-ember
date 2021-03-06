import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
 session: service('session'),
 store: service(),

 loadCurrentUser() {
   return new RSVP.Promise((resolve, reject) => {
     let that = this
     const token = this.get('session.data.authenticated.token');
     if (!Ember.isEmpty(token)) {
      $.ajax({
        headers: {'Authorization': `Bearer ${token}`},
        url: 'http://' + config.host + '/api/v1/users/current-user',
        method: 'GET', dataType: 'json',
        success: function(user){
           that.set('account', user);
           resolve()
        },
        failure: function(){
          reject()
        }})
       // return this.get('store').findRecord('user', 'current-user').then((user) => {
       //   this.set('account', user);
       //   resolve();
       // }, reject);
     } else {
       resolve();
     }
   });
  }
});
