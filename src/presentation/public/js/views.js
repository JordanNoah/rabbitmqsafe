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
            <v-data-table :headers="headers" :items="items">
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
            items:[]
        }
    },
    mounted: function () {
        this.getEvents()
    },
    methods:{
        getEvents(){
            axios.get("./api/event/").then((res) => {
                console.log(res.data)
                this.items = res.data
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}