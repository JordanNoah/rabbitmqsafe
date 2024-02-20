const routes = [
    {
        path: '/dashboard',
        component: dashboard,
        name: 'dashboard',
        children: [
            {
                path:'rabbit',
                name:'rabbit'
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