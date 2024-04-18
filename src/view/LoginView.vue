<template>
    <v-app >
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>INHABITR - Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <form ref="form" @submit.prevent="login()">
                                    <v-text-field
                                            label="Username"
                                            prepend-icon="mdi-account-circle"
                                            v-model="username"
                                            required
                                    ></v-text-field>

                                    <v-text-field
                                            :type="showPassword ? 'text' : 'password'"
                                            label="Password"
                                            prepend-icon="mdi-lock"
                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="showPassword = !showPassword"
                                            v-model="password"
                                            required
                                    ></v-text-field>
                                    <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                                </form>
                            </v-card-text>
                        </v-card>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "LoginView",
        data() {
            return {
                valid: true,
                showPassword: false,
                password: "",
                username: "",
            };
        },
        methods: {
            async login() {
                // const { username } = this;
                let navigate = this.$router;
                let username = this.username;
                let password = this.password;

                if(username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin'){

                    navigate.push('AdminView');
                }
                else{
                        // eslint-disable-next-line no-unused-vars
                        const response = await axios({
                            method: "post",
                            url: "https://fakestoreapi.com/users",
                            headers: { 
                                'username': username, 
                                'password': password
                            },
                        }).then(function (response) {
                                if (response.data.id === 1){
                                    navigate.push('CustomerView');
                                }else{
                                    alert("Invalid User Access")
                                }
                                
                            })
                            .catch(function (response) {
                                console.log(response);
                                alert("User does not have access")
                            });

                    localStorage.setItem('username',username)
                }
            },
        },
    };
</script>
