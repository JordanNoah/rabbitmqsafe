const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
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
        },
        eventsItemsTable:[],
        eventsItemsLengthTable:0,
        appliedFilters:[],
        defaultFilters:[{name: 'Id',key: 'id'},{name: 'Signature',key: 'signature'},{name: 'Content',key: 'content'},{name: 'Timestamp',key: 'timestamp'}],
        optionsDatatable:{},
        io:null,
        isSyncRabbit:true,
        jsonViewer:{
            open:false,
            item:null
        }
    },
    mutations:{
        openJsonViewer(state, itemJson){
            state.jsonViewer.open = true
            state.jsonViewer.item = itemJson
        },
        setConfigTable(state,configTable){
            state.tableConfig = {
                page: configTable.page -1,
                limit: configTable.itemsPerPage,
                order: {row:configTable.sortBy[0],desc:configTable.sortDesc[0]}
            }
        },
        setEventsItemsTable(state, eventsItems) {
            state.eventsItemsTable = eventsItems
        },
        setEventsItemsLengthTable(state, itemsLength) {
            state.eventsItemsLengthTable = itemsLength
        },
        setFilterTable(state, filter) {
            const objectFilter = {
                uuid: crypto.randomUUID(),
                filter: filter.selectedFilter,
                text: filter.textFilter
            }
            state.appliedFilters.push(objectFilter)
        },
        removeFilterTable(state, filter) {},
        resetTableConfig(state){
            state.tableConfig = {
                page: 0,
                limit: 10
            }
            state.optionsDatatable.page = 1
        },
        updateIoSocket(state){
            state.io = io()
            state.io.on("isSyncRabbit",(args) => {
                console.log(args)
                state.isSyncRabbit = args.sync
            })
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