Vue.component(
    'navigation-drawer',
    {
        data: function () {
            return {
                items: [
                    { title: 'Dashboard', icon: 'mdi-table-arrow-down', link:'/dashboard' },
                    { title: 'Rabbit', icon: 'mdi-rabbit', link: '/dashboard/rabbit' },
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
                defaultFilters:[
                    {
                        name: 'Id',
                        key: 'id'
                    },
                    {
                        name: 'Signature',
                        key: 'signature'
                    },
                    {
                        name: 'Content',
                        key: 'content'
                    },
                    {
                        name: 'Timestamp',
                        key: 'timestamp'
                    }
                ],
                filters:[],
                selectedFilter:null,
                appliedFilters:[],
                textFilter:null,
                disableAddFilter:false
            }
        },
        methods:{
          setFilter(){
              const objectFilter = {
                  uuid: crypto.randomUUID(),
                  filter: this.selectedFilter,
                  text: this.textFilter
              }
              this.appliedFilters.push(objectFilter)
              const index = this.filters.findIndex(e => e.key === this.selectedFilter.key)
              this.filters.splice(index,1)
              this.textFilter = null
              this.defaultSelectFilter()
          },
            defaultSelectFilter() {
              if (this.filters.length === 0){
                  this.disableAddFilter = true
              } else {
                  this.disableAddFilter = false
                  this.selectedFilter = this.filters[0]
              }
            },
            deleteFilter(filter) {
              let index = this.appliedFilters.findIndex(e => e.uuid === filter.uuid)
                this.appliedFilters.splice(index,1)
                let indexDefaultFilter = this.defaultFilters.findIndex(e => e.key === filter.filter.key)
                this.filters.splice(indexDefaultFilter,0,filter.filter)
                this.defaultSelectFilter()
                this.reorderFilterArray()
            },
            compareFiltersArrays(objA,objB){
              let indexA = this.defaultFilters.findIndex(e => e.key === objA.key);
              let indexB = this.defaultFilters.findIndex(e => e.key === objB.key);

              return indexA - indexB
            },
            reorderFilterArray(){
              this.filters.sort(this.compareFiltersArrays)
            },
            findByFilter(){

            }
        },
        watch:{
            appliedFilters:{
                handler(value){
                    console.log(value)
                },
                deep:true
            }
        },
        mounted: function (){
            this.filters = [...this.defaultFilters]
            this.defaultSelectFilter()
        },
        template:`
          <v-card outlined>
            <v-card-title>
              Buscador
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-if="appliedFilters.length > 0">
                  <div v-for="i in appliedFilters" :key="i.uuid" class="d-flex justify-space-between">
                    <span>
                        {{i.filter.name}}: {{i.text}}
                    </span>
                    <v-btn icon x-small @click="deleteFilter(i)">
                      <v-icon x-small>
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </div>
                </v-col>
                <v-col v-else>
                  Filtros no seleccionados
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-select v-model="selectedFilter" dense outlined dense hide-details :disabled="disableAddFilter" :items="filters" item-text="name" item-value="key" label="Filtro" return-object></v-select>
                </v-col>
                <v-col>
                  <v-text-field label="Texto a buscar" dense outlined v-model="textFilter" :disabled="disableAddFilter" hide-details append-icon="mdi-filter-check-outline" @click:append="setFilter()"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        `
    }
)

Vue.component(
    'config-rabbit',
    {
        data: function (){
            return {
                dialogConfigRabbit:true,
                switchSendType:false,
                validRabbit:false,
                validFanoutRabbit:false,
                rabbitMqConfigRules:{
                    username:[v => !!v || 'El usuario es necesario'],
                    password:[v => !!v || 'La contraseña es necesario'],
                    protocol:[v => !!v || 'El protocolo es necesaria'],
                    hostname:[v => !!v || 'El hostname es necesario'],
                    port:[v => !!v || 'El puerto es necesario'],
                    vhost:[v => !!v || 'El vhost es necesario'],
                    queue:[v => !!v || 'El queue es necesario'],
                    exchange:[v => !!v || 'El exchange es necesario'],
                    routingKey: [v => !!v || 'El routing key es necesario']
                },
                rabbitMqConfig:{
                    username: null,
                    password: null,
                    protocol: null,
                    hostname: null,
                    port: null,
                    vhost: null,
                    queue: null,
                    exchange: null,
                    routingKey: null
                }
            }
        },
        mounted:function (){
            this.loadRabbitConfig()
            this.desEncryptValues()
        },
        methods:{
            saveRabbitMqConfig(){
                let validatedConfigRabbit = this.$refs.form.validate()
                let validatedConfigFanout = (!this.switchSendType && this.$refs.fanoutForm.validate()) || this.switchSendType

                if(validatedConfigRabbit && validatedConfigFanout){
                    this.encryptValues()
                }
            },
            encryptValues() {
                const objectRabbit = {
                    "rabbit_username":this.rabbitMqConfig.username,
                    "rabbit_password":this.rabbitMqConfig.password,
                    "rabbit_protocol":this.rabbitMqConfig.protocol,
                    "rabbit_hostname":this.rabbitMqConfig.hostname,
                    "rabbit_port":this.rabbitMqConfig.port,
                    "rabbit_vhost":this.rabbitMqConfig.vhost,
                    "rabbit_queue":this.rabbitMqConfig.queue,
                    "rabbit_exchange":this.rabbitMqConfig.exchange,
                    "rabbit_routingKey":this.rabbitMqConfig.routingKey,
                    "rabbit_sendType":this.switchSendType ? 'exclusive' : 'fanout'
                }

                axios.post('./api/secret/encrypt',objectRabbit).then((res) => {
                    localStorage.setItem('rabbit_username',res.data.rabbit_username)
                    localStorage.setItem('rabbit_password',res.data.rabbit_password)
                    localStorage.setItem('rabbit_protocol',res.data.rabbit_protocol)
                    localStorage.setItem('rabbit_hostname',res.data.rabbit_hostname)
                    localStorage.setItem('rabbit_port',res.data.rabbit_port)
                    localStorage.setItem('rabbit_vhost',res.data.rabbit_vhost)
                    localStorage.setItem('rabbit_queue',res.data.rabbit_queue)
                    localStorage.setItem('rabbit_exchange',res.data.rabbit_exchange)
                    localStorage.setItem('rabbit_routingKey',res.data.rabbit_routingKey)
                    localStorage.setItem('rabbit_sendType',res.data.rabbit_sendType)
                })
            },
            desEncryptValues(){
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
                    "rabbit_sendType":localStorage.getItem('rabbit_sendType')
                }

                const filteredObjectRabbit = {};

                for (const key in objectRabbit) {
                    if (objectRabbit[key] !== null && objectRabbit[key] !== undefined) {
                        filteredObjectRabbit[key] = objectRabbit[key];
                    }
                }

                if (Object.keys(filteredObjectRabbit).length > 0) {
                    axios.post('./api/secret/desEncrypt',objectRabbit).then((res) => {
                        this.rabbitMqConfig.username = res.data.rabbit_username
                        this.rabbitMqConfig.password = res.data.rabbit_password
                        this.rabbitMqConfig.protocol = res.data.rabbit_protocol
                        this.rabbitMqConfig.hostname = res.data.rabbit_hostname
                        this.rabbitMqConfig.port = res.data.rabbit_port
                        this.rabbitMqConfig.vhost = res.data.rabbit_vhost
                        this.rabbitMqConfig.queue = res.data.rabbit_queue
                        this.rabbitMqConfig.exchange = res.data.rabbit_exchange
                        this.rabbitMqConfig.routingKey = res.data.rabbit_routingKey
                        this.switchSendType = res.data.rabbit_sendType === 'exclusive'
                    })
                }
            },
            loadRabbitConfig(){

            }
        },
        template: `
          <v-dialog v-model="dialogConfigRabbit" max-width="700px">
            <v-card>    
              <v-card-title>
                Rabbit configuration
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-form ref="form" v-model="validRabbit">
                        <v-row>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Hostname" hide-details="auto" v-model="rabbitMqConfig.hostname" :rules="rabbitMqConfigRules.hostname"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Port" hide-details="auto" v-model="rabbitMqConfig.port" :rules="rabbitMqConfigRules.port"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Protocolo" hide-details="auto" v-model="rabbitMqConfig.protocol" :rules="rabbitMqConfigRules.protocol"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Contraseña" hide-details="auto" v-model="rabbitMqConfig.password" :rules="rabbitMqConfigRules.password"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Usuario" hide-details="auto" v-model="rabbitMqConfig.username" :rules="rabbitMqConfigRules.username"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Vhost" hide-details="auto" v-model="rabbitMqConfig.vhost" :rules="rabbitMqConfigRules.vhost"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field outlined dense label="Queue" hide-details="auto" v-model="rabbitMqConfig.queue" :rules="rabbitMqConfigRules.queue"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-switch v-model="switchSendType" :label="switchSendType ? 'Exclusive' : 'Fanout'" dense hide-details class="mt-0"></v-switch>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-form v-if="!switchSendType" ref="fanoutForm" v-model="validFanoutRabbit">
                        <v-text-field outlined dense label="Exchange" v-model="rabbitMqConfig.exchange" :rules="rabbitMqConfigRules.exchange"></v-text-field>
                        <v-text-field outlined dense label="Routing key" v-model="rabbitMqConfig.routingKey" :rules="rabbitMqConfigRules.routingKey"></v-text-field>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn depressed color="error">Cancel</v-btn>
                <v-btn depressed color="primary" @click="saveRabbitMqConfig()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        `
    }
)