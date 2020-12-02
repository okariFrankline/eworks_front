<template>
    <v-dialog v-model="typeDialog" max-width="520" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-2">Set Order Type</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="typeDialog" @submit.prevent>
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q3. What kind of job type do you need?
                    </span>
                    <!-- Options for the category -->
                    <v-select 
                        :items="projectTypes" 
                        prepend-icon="mdi-briefcase-plus-outline" 
                        placeholder="Choose Job Specialty" 
                        dense 
                        class="mt-3" 
                        item-text="name" 
                        item-value="name" 
                        :rules="selectRules"
                        style="font-size: .9em;"
                        v-model="typeForm.order_type"
                        @keyup.enter.prevent="addOrderType"
                    ></v-select>
                    <!-- End of the options for the category -->
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q4. How many contractors does your job need?
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-account-group" 
                        placeholder="Number of required contractors" 
                        dense 
                        class="mt-3 mb-2" 
                        style="font-size: .9em;"
                        type="number"
                        :rules="contractorsRules"
                        v-model="typeForm.required_contractors"
                        @keyup.enter.prevent="addOrderType"
                    ></v-text-field>
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
                    @click="cancelTypeDialog"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-type">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click.stop="addOrderType"
                >
                    <span class="text-caption font-weight-bold">continue</span>
                    <template v-slot:loader>
                        <span class="custom-loader">
                            <v-icon small light color="white">mdi-cached</v-icon>
                        </span>
                    </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import map state
import { mapState } from 'vuex'
// component definiton
export default {
    // name
    name: 'TypeDialog',
    // computed
    computed: {
      // get the dialog state
      ...mapState('dialogs', [
          'typeDialog'
      ]),
      // map created order
      ...mapState('created_order', [
        'order'
      ]),
      // project types
      ...mapState('select', [
            'projectTypes'      
        ]),
    },
    // data
    data: () => ({
        // type form
        typeForm: {
            order_type: '',
            required_contractors: 0
        },
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
        // contractor rules
        contractorsRules: [
            v => !!v || 'Number of contractors must be at least be 1.'
        ],
        // loading
        loading: false,
        // loader
        loader: null
    }),
    // methods
    methods: {
        // cancel the type dialog
        async cancelTypeDialog() {
            // get cancel text
            let text = document.getElementById('cancel-text-type')
            // set the text to cancelling
            text.innerHTML = 'cancelling...'
            // delete the order
            await this.$axios.post(`/order/${this.order.id}/delete`)
                .then(() => {
                    // reset the form
                    this.$refs.typeDialog.reset()
                    // dismiss the dialog
                    this.$store.commit('dialogs/toggleTypeDialog')
                    // set text to cancel
                    text.innerHTML = 'cancel'
                })
                .catch(error => {
                    // set the error message
                    let message = "Cancel Failed. Order could not be cancelled. Please try again later"
                    // set text to cancel
                    text.innerHTML = 'cancel'
                    // emeit a message
                    this.$emit('error', message)
            })
        },
        // function for showing the duration dialog
        async addOrderType(){
            // validate the dialog form
            if (!this.$refs.typeDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set loader to this.loading
            this.loader = this.loading
            // post the data
            await this.$store.dispatch('created_order/addOrderType', {data: this.typeForm, action: 'New'})
                .then(() => {
                    // set the loading to true
                    this.loading = false
                    // set loader to this.loading
                    this.loader = null
                    // reset the form
                    this.$refs.typeDialog.reset()
                    // hide the dialog
                    this.$store.commit('dialogs/toggleTypeDialog')
                    // show the duration dialog
                    this.$store.commit('dialogs/toggleDurationDialog')
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

    }

}
</script>