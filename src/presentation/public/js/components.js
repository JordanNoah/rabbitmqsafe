Vue.component(
    'navigation-drawer',
    {
        data: function () {
            return {
                items: [
                    { title: 'My Account', icon: 'mdi-table-arrow-down' },
                    { title: 'Users', icon: 'mdi-rabbit' },
                ]
            }
        },
        template: `
            <v-navigation-drawer mini-variant permanent app>
                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link>
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