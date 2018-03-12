/**
 * Created by zwwill on 2017/8/28.
 */
import App from './App.vue'
import router from './router'
import mixin from './mixins/mixin'

Vue.mixin(mixin)
new Vue(Vue.util.extend({ el: '#root', router }, App));
