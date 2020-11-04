import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import Axios from 'axios'

Vue.component('date-picker', VuePersianDatetimePicker);
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    inputFormat: 'YYYY-MM-DD',
    format: 'jYYYY-jMM-jDD',
    editable: false,
    inputClass: 'date_custom',
    placeholder: 'تاریخ مورد نظر را انتخاب نمایید',
    altFormat: 'YYYY-MM-DD',
    color: '#00acc1',
    autoSubmit: false,
    //...  
    //... And whatever you want to set as default 
    //... 
  }
});

Vue.use(VueSimpleAlert, { reverseButtons: true });

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
const accessToken = `Bearer ${localStorage.token}`

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
}

new Vue({
  router,
  store,
  Axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
