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

const store = new Vuex.Store({
    state:{
        tableConfig: {
            page:0,
            limit:10
        }
    },
    mutations:{
        setConfigTable(state,configTable){
            state.tableConfig = {
                page: configTable.page,
                limit: configTable.itemsPerPage
            }
        }
    },
    actions:{}
})

new Vue({
    el:"#app",
    vuetify: new Vuetify(),
    router,
    store:store
})