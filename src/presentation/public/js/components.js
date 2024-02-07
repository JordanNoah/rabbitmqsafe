Vue.component(
    'navigation-drawer',
    {
        data: function () {
            return {
                items: [
                    { title: 'Dashboard', icon: 'mdi-table-arrow-down', link:'dashboard' },
                    { title: 'Rabbit', icon: 'mdi-rabbit', link: 'rabbit' },
                ]
            }
        },
        template: `
            <v-navigation-drawer mini-variant permanent app>
                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                  <v-list dense>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-sync</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </template>
            </v-navigation-drawer>
        `
    }
)

Vue.component(
    'allowed-signature',
    {
        data: function () {
            return {
                allowedSignatures:[],
                nameSignature:null
            }
        },
        mounted:function (){
            this.getAllowed()
        },
        methods:{
            getAllowed(){
                axios.get(`./api/signature/`)
                    .then((res) => {
                        this.allowedSignatures = res.data
                    })
            },
            removeSignature(signature){
                axios.delete(`./api/signature/uuid/${signature.uuid}`).then((res)=>{
                    if (res.status === 200) this.getAllowed()
                })
            },
            saveAllowedSignature(){
                const saveObj = {
                    uuid: crypto.randomUUID(),
                    name: this.nameSignature
                }
                axios.post(`./api/signature/save`,saveObj).then((res) => {
                    if (res.status === 200) this.getAllowed()
                })
            },
            setOn(uuid){
                axios.put(`./api/signature/on/uuid/${uuid}`).then((res)=> {
                    const index = this.allowedSignatures.findIndex(element => element.uuid === res.data.uuid)
                    if (index !== -1){
                        this.$set(this.allowedSignatures,index,res.data)
                    }
                })
            },
            setOff(uuid){
                axios.put(`./api/signature/off/uuid/${uuid}`).then((res) => {
                    const index = this.allowedSignatures.findIndex(element => element.uuid === res.data.uuid)
                    if (index !== -1){
                        this.$set(this.allowedSignatures,index,res.data)
                    }
                })
            }
        },
        template:`
          <v-card outlined>
            <v-card-title>
              Firmas permitidas
            </v-card-title>
            <v-card-text>
              <div v-if="allowedSignatures.length > 0">
                <v-chip close v-for="signature in allowedSignatures" :key="signature.uuid" @click:close="removeSignature(signature)" class="mr-2" :color="signature.active ? 'primary':''">
                  <v-icon left v-if="signature.active" @click="setOff(signature.uuid)">
                    mdi-eye-outline
                  </v-icon>
                  <v-icon left v-else @click="setOn(signature.uuid)">
                    mdi-eye-off-outline
                  </v-icon>
                  {{signature.name}}
                </v-chip>
              </div>
              <div v-else>
                Not signature find
              </div>
              <div class="mt-2">
                <v-text-field v-model="nameSignature" outlined dense clearable append-icon="mdi-content-save-move-outline" @click:append="saveAllowedSignature()"></v-text-field>
              </div>
            </v-card-text>
          </v-card>
        `
    }
)

Vue.component(
    'searcher',
    {
        data: function () {
            return {

            }
        },
        template:`
          <v-card outlined>
            <v-card-title>
              Buscador

            </v-card-title>
          </v-card>
        `
    }
)