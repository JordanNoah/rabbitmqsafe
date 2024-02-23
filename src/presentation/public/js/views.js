const dashboard = {
    template: `
        <v-container>
          <v-container fluid class="px-0">
            <v-row no-gutters>
              <v-col cols="6" class="pr-1">
                <searcher></searcher>
              </v-col>
              <v-col cols="6">
                <allowed-signature></allowed-signature>
              </v-col>              
            </v-row>
          </v-container>
          <v-card outlined>
            <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="titleItems" :loading="loadingTable">
              <template v-slot:item.content="{item}">
                <span style="margin: 10px 0; display: -webkit-box; max-width: 250px; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  {{item.content}}
                </span>
              </template>
              <template v-slot:item.action="{item}">
                <v-btn icon @click="publishRabbit(item.uuid)">
                  <v-icon>
                    mdi-cloud-upload-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
          <config-rabbit></config-rabbit>
        </v-container>
    `,
    data: function () {
        return {
            headers:[
                {
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value:'id'
                },
                {
                    text: 'Signature',
                    align: 'start',
                    sortable: false,
                    value:'property.type'
                },
                {
                    text: 'Content',
                    align: 'start',
                    sortable: false,
                    value:'content'
                },
                {
                    text: 'timestamp',
                    align: 'start',
                    sortable: false,
                    value:'property.timestamp'
                },
                {
                    text: 'action',
                    align: 'start',
                    sortable: false,
                    value:'action'
                },
            ],
            items:[],
            titleItems:0,
            options:{},
            loadingTable:false
        }
    },
    watch:{
        options:{
            handler(){
                this.$store.commit('setConfigTable',this.options)
                this.getEvents()
            },
            deep: true
        }
    },
    methods:{
        getEvents(){
            this.loadingTable = true
            const objPage = {
                page: (this.options.page - 1),
                limit: this.options.itemsPerPage
            }
            axios.post("./api/event/limited",objPage).then((res) => {
                this.items = res.data.events
                this.titleItems = res.data.totalEvents
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.loadingTable = false
            })
        },
        publishRabbit(uuidEvent){
            const objectRabbit = {
                "rabbit_username":localStorage.getItem('rabbit_username'),
                "rabbit_password":localStorage.getItem('rabbit_password'),
                "rabbit_protocol":localStorage.getItem('rabbit_protocol'),
                "rabbit_hostname":localStorage.getItem('rabbit_hostname'),
                "rabbit_port":localStorage.getItem('rabbit_port'),
                "rabbit_vhost":localStorage.getItem('rabbit_vhost'),
                "rabbit_queue":localStorage.getItem('rabbit_queue'),
                "rabbit_exchange":localStorage.getItem('rabbit_exchange'),
                "rabbit_routingKey":localStorage.getItem('rabbit_routingKey'),
                "rabbit_sendType":localStorage.getItem('rabbit_sendType'),
                "uuid_event":uuidEvent
            }

            const filteredObjectRabbit = {};

            for (const key in objectRabbit) {
                if (objectRabbit[key] !== null && objectRabbit[key] !== undefined) {
                    filteredObjectRabbit[key] = objectRabbit[key];
                }
            }

            axios.post("./api/rabbit/publish",filteredObjectRabbit).then((res) => {
                console.log(res.data())
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}