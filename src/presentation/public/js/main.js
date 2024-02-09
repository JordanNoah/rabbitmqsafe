const routes = [
    {
        path: '/dashboard',
        component: dashboard,
        children: [
            {
                path:'rabbit'
            }
        ]
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