<template>
    <div>
        <AppHeader />
        <v-text-field
          v-model="searchValue" class="mr-6 ml-15"
          label="Search" placeholder="Enter Keyword for Search" append-icon="mdi-magnify" variant="outlined"
        ></v-text-field>
        <v-data-table :headers="headers" :items="productData" :items-per-page="5" class="justify--text elevation-1" :search="searchValue">
            <template v-slot:[`item.image`]="{ item }">
                <div class="p-2">
                    <v-img width="150" :src="item.image" :alt="item.title"></v-img>
                </div>
            </template>
            <template v-slot:[`item.description`]="{ item }">
                <div class="d-flex justify-left">{{item.description}}</div>
            </template>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Cart
                                <p class="pa-100 pb-100">{{ valid_count }}</p>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ "Cart" }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="searchCart" class="mr-6 ml-15"
                                        label="Search" placeholder="Enter Keyword for Search" append-icon="mdi-magnify" variant="outlined"
                                        ></v-text-field>
                                    <v-data-table :headers="cartHeader" :items="cartItems" :items-per-page="5" class="justify--text elevation-1" :search="searchCart"></v-data-table>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="clear">
                                        Clear
                                    </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="success mr-2" @click="addCart(item,item.title,item.price)">
                    Add to Cart
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </div>
  </template>

  <script>
  import axios from "axios";
  import AppHeader from "@/components/AppHeader.vue";

  export default {
    name: "CustomerView",
    components: {
        AppHeader,
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
          {text: 'Title', align: 'start', sortable: false, value: 'title'},
          { text: 'Image', value: 'image', width: "200px"},
          { text: 'Price', value: 'price', width: "200px" },
          { text: 'Description', value: 'description' },
          { text: 'Category', value: 'category', width: "100px"},
          { text: 'Rating', value: 'rating.rate' , width: "100px" },
          { text: 'Actions', value:'actions' , width: "100px"}
        ],
        cartHeader: [
          { text: 'Title', align: 'start', sortable: false, value: 'title'},
          { text: 'Price', value: 'price', width: "200px" },
        ],
      api_url: 'https://fakestoreapi.com/products',
      productData: [],
      searchValue: '',
      searchCart: '',
      editedIndex: -1,
      editedItem: {
        id: '',
        title: '',
        image: '',
        price: '',
        description: '',
        category: '',
      },
      defaultItem: {
        id: '',
        title: '',
        image: '',
        price: '',
        description: '',
        category: '',
        rating: {
            rate: '',
            count: ''
        }
      },
      cartItems: [],
      valid_count: 0
    }),

    created () {
      this.initialize()
    },

    methods: {
        initialize () {
            axios.get(this.api_url, {
            headers: {
            'Access-Control-Allow-Origin': '*',
            }})
            .then((response) => {
                this.productData = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
            console.log(this.productData.data)
        },

        addCart (item, title, price) {
            this.editedIndex = this.productData.indexOf(item)
            console.log(this.editedIndex)
            this.cartItems.push({"title":title,"price":price})
            this.valid_count = this.cartItems.length
            //this.dialog = true
        },

        close () {
            this.dialog = false
        },

        clear () {
            this.$nextTick(() => {
            this.cartItems = []
            this.valid_count = 0
            this.editedIndex = -1
            })
        },

    },
  }
</script>
<style scoped>
    p {color: white;
    background-color: red;}
</style>