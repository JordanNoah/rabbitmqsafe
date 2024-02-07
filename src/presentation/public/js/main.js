const routes = [
    {
        path: '/dashboard',
        component: dashboard
    }
]

const router = new VueRouter({
    routes
})

new Vue({
    el:"#app",
    vuetify: new Vuetify(),
    router
})