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
            <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="titleItems">
              <template v-slot:item.content="{item}">
                <span style="margin: 10px 0; display: -webkit-box; max-width: 250px; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  {{item.content}}
                </span>
              </template>
              <template v-slot:item.action="{item}">
                <v-btn icon>
                  <v-icon>
                    mdi-cloud-upload-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
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
            options:{}
        }
    },
    watch:{
        options:{
            handler(){
                this.getEvents()
            },
            deep: true
        },
    },
    methods:{
        getEvents(){
            const objPage = {
                page: this.options.page,
                limit: this.options.itemsPerPage
            }
            axios.post("./api/event/limited",objPage).then((res) => {
                console.log(res.data)
                this.items = res.data.events
                this.titleItems = res.data.totalEvents
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}