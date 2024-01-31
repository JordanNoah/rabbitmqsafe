const routes = [
    {
        path: '/foo',
        component: Foo
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