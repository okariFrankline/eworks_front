<template>
    <v-dialog v-model="jobDialog" max-width="520" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-2">Select Service Required</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <v-form ref="jobDialog">
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                    Q1. What category is the job you have in mind?
                    </span>
                    <!--Order type -->
                    <v-select 
                        :items="categories" 
                        prepend-icon="mdi-playlist-edit" 
                        placeholder="Choose Job Category" 
                        dense 
                        class="mt-3 mb-2" 
                        item-text="name" 
                        item-value="value" 
                        style="font-size: .9em;" 
                        :rules="selectRules"
                        v-model="formData.category"
                    ></v-select>
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q2. What specialty does your job fall into?
                    </span>
                    <!-- Options for the category -->
                    <v-select 
                        :items="showServices()" 
                        prepend-icon="mdi-playlist-edit" 
                        placeholder="Choose Job Specialty" 
                        dense 
                        class="mt-3" 
                        item-text="name" 
                        item-value="name" 
                        style="font-size: .9em;"
                        :rules="selectRules"
                        v-model="formData.specialty"
                        :disabled="formData.category ? false : true"
                    ></v-select>
                    <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3 mb-n2" 
                    color="error" 
                    small 
                    text
                    @click="cancelJobDialog"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text">cancel</span>
                </v-btn>
                <!-- End of cacnel button -->

                <!-- Next button -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5" 
                    color="teal lighten1-" 
                    small 
                    :loading="loading"
                    @click.stop="addOrderCategory"
                >
                    <span class="text-caption font-weight-bold">continue</span>
                    <template v-slot:loader>
                        <span class="custom-loader">
                            <v-icon light color="white">mdi-cached</v-icon>
                        </span>
                    </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
        </v-card>
    </v-dialog>
        <!-- End of dialog for creating a new job -->
</template>

<script>
// import map state
import { mapState } from 'vuex'
// component definiton
export default {
    // name
    name: 'JobDialog',
    // computed
    computed: {
        // get the select options
      ...mapState('select', {
            categories: state => state.categories,
            currencies: state => state.currencies,
            web: state => state.web,
            writing: state => state.writing,
            construction: state => state.construction,
            accounting: state => state.accounting,
            cleaning: state => state.cleaning,
            food: state => state.food,
            legal: state => state.legal,
            design: state => state.design,
            transport: state => state.transport,
            sales: state => state.sales
      }),
      // get the dialog state
      ...mapState('dialogs', [
          'jobDialog'
      ]),
    },
    // data
    data: () => ({
        // form data
        formData: {
            category: '',
            specialty: ''
        },
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
        // loading
        loading: false,
        // loader
        loader: null
    }),
    // methods
    methods: {
        // function for canceling job dialog
        cancelJobDialog() {
            // reset the form
            this.$refs.jobDialog.reset()
            // hide the dialog
            return this.$store.commit('dialogs/toggleJobDialog')
        },
        // function for showing the type dialog
        async addOrderCategory() {
            // validate the dialog form
            if (!this.$refs.jobDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set loader to this.loading
            this.loader = this.loading
            // create the new
            await this.$store.dispatch('created_order/createNewOrder', {data: this.formData, action: 'New'})
                .then(() => {
                    // set the loading to true
                    this.loading = false
                    // set loader to this.loading
                    this.loader = null
                    // reset the form
                    this.$refs.jobDialog.reset()
                    // hide the job dialog
                    this.$store.commit('dialogs/toggleJobDialog')
                    // show the type dialog
                    this.$store.commit('dialogs/toggleTypeDialog')
                })
                .catch(err => this.handleError(err))
            
        },
        // functioin for handling the error
        handleError(error) {
          // initilaize the error message
          let message  
          // check if the error has a response
          if (error.response) {
              // get the message from the eresponse
              message = error.response.data.errors.details
          } else {
              message = 'Failed. An error occurred when creating your order. Please try again.'
          }
          // set the loading to true
          this.loading = false
          // set loader to this.loading
          this.loader = null
          // emeit a message
          this.$emit('error', message)
      },
        // funciton for showing the services
        showServices() {
            switch(this.formData.category) {
                case 'Accounting and Finance': 
                    return this.accounting;
                    break;
                case 'Web, Mobile and Software':
                    return this.web;
                    break;
                case 'Construction and Repairs':
                    return this.construction;
                    break;
                case 'Cleaning Services':
                    return this.cleaning;
                    break;
                case 'Food, Catering and Nutrition':
                    return this.food;
                    break;
                case 'IT and Networking':
                    return this.it;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Transport and Delivery':
                    return this.transport;
                    break;
                case 'Writing Services':
                    return this.writing;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Branding and Design':
                    return this.design;
                    break;
                case 'Tansport and Delivery':
                    return this.transport;
                    break;
                default:
                    return this.sales;
            }
        }
    }

}
</script>