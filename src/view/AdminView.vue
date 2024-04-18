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
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Add New Item
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.image" label="Image URL"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                        Save
                                    </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
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
    name: "AdminViews",
    components: {
        AppHeader,
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
          {
            text: 'Title',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { text: 'Image', value: 'image', width: "200px"},
          { text: 'Price', value: 'price', width: "200px" },
          { text: 'Description', value: 'description' },
          { text: 'Category', value: 'category', width: "100px"},
          { text: 'Rating', value: 'rating.rate' , width: "100px" },
          { text: 'Actions', value:'actions' , width: "100px"}
        ],
      api_url: 'https://fakestoreapi.com/products',
      productData: [],
      searchValue: '',
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
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

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

        editItem (item) {
            this.editedIndex = this.productData.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.productData.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.productData.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.productData[this.editedIndex], this.editedItem)
            } else {
            this.productData.push(this.editedItem)
            }
            this.close()
        },
    },
  }
</script>