<template v-slot:activator="{ on }">
    <div>
        <v-app-bar flat color="primary" dark>
            <div class="headline ml-0">
                {{ "INHABITR" }}
            </div>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-container>
                </v-container>
                <v-menu bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary"
                            v-bind="attrs"
                            v-on="on" >
                            <v-icon>mdi-account-circle</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title >
                                   {{username}}
                                 </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-switch
                                v-model="$vuetify.theme.dark"
                                flat
                                persistent-hint
                                label="Dark Mode"
                                color="white"
                        ></v-switch>
                        </v-list-item>
                        <v-list-item>
                            <v-btn
                                text color="primary"
                                @click="userLogout"
                                class="hidden-sm-and-down btnLogout mt-1">
                            <v-icon left>mdi-exit-to-app</v-icon>Logout
                        </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name: 'AppHeader',
    data() {
            return {
                username:localStorage.getItem('username')
            }
        },
        computed: {
        },
        methods: {
            userLogout() {
                this.$router.replace({name:'login'})
            },
        }
}
</script>