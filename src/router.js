import Router from 'vue-router'
import ViewRecord from './record/index.vue'
import ViewHome from './home/index.vue'

Vue.use(Router)


export default new Router({
    // mode: 'abstract',
    routes: [
        { path: '/', redirect: '/record' },
        { path: '/record', component: ViewRecord },
        { path: '/home', component: ViewHome }
    ]
})