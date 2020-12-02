<template>
    <v-dialog v-model="descriptionDialog" max-width="750" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-2">Add Order Descripiton</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="descriptionDialog" @submit.prevent>
                    <span class="text-caption font-weight-bold teal--text">
                        Q5. Add a detailed description for your job and it should include:
                        <ul>
                            <li class="text-caption font-weight-normal pink--text">Detailed description of what the job entails (requirements, special considerations timelines etc)</li>
                            <li class="text-caption font-weight-normal pink--text">Detailed description of and expectations from your practioner of choice</li>
                            <li class="text-caption font-weight-normal pink--text">A detailed description of the location, if required, of where the job should take place</li>
                            <li class="text-caption font-weight-normal pink--text">Any special notes/requirements for the practioner</li>
                        </ul>
                    </span>

                    <v-textarea  
                        auto-grow 
                        placeholder="Order Description" 
                        dense 
                        class="mt-3"  
                        style="font-size: .9em;"
                        v-model="descriptionForm.description"
                        :rules="descriptionRules"
                    ></v-textarea>
                    <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <span class="text-caption font-weight-bold teal--text ml-5"> 
                    Current word count:  {{ wordCount() }} / 100
                </span>
                <!-- Options for the category -->
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3 mb-n2" 
                    color="error" 
                    text
                    small 
                    @click="cancelDescriptionDialog"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-description">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next nutton -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click="addOrderDescription"
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
// import mapState
import { mapState } from "vuex"
// component definiton
export default {
    // name
    name: "DescriptionDialog",
    // computed
    computed: {
      // get the dialog state
      ...mapState('dialogs', [
          'descriptionDialog'
      ]),
      // map created order
      ...mapState('created_order', [
        'order'
      ]),
    },
    // data
    data: () => ({
        // loading
        loading: false,
        // loader
        loader: null,
        // descriptio form
        descriptionForm: {
            description: ''
        },
        // description form
        descriptionRules: [
            v => !!v || 'Description is required.',
            v => (v && v.length >= 500) || 'Description has to have a minimum of 100 words.'
        ]
    }),
    // methods
    methods: {
        // function for returning the current word count
        wordCount() {
            if (this.descriptionForm.description) {
                // return the word count
                return this.descriptionForm.description.split(/\s+/).length - 1
            } else{
                // return 0
                return 0
            }
        },
        // function for cancelling the description
        async cancelDescriptionDialog() {
            // get cancel text
            let text = document.getElementById('cancel-text-description')
            // set the text to cancelling
            text.innerHTML = 'cancelling...'
            // delete the order
            await this.$axios.post(`/order/${this.order.id}/delete`)
            .then(() => {
                // reset the description dialog
                this.$refs.descriptionDialog.reset()
                // hide the dialog
                this.$store.commit('dialogs/toggleDescriptionDialog')
                // set text to cancel
                text.innerHTML = 'cancel'
            })
            .catch(error => {
                // set the error message
                let message = "Cancel Failed. Order could not be cancelled. Please try again later"
                // set text to cancel
                text.innerHTML = 'cancel'
                // emit error event
                this.$emit('error', message)
            })
        },
        // funciton for adding order description
        async addOrderDescription() {
            // validate the form
            if (!this.$refs.descriptionDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set loader to this.loading
            this.loader = this.loading
            // post the data
            await this.$store.dispatch('created_order/addOrderDescription', {data: this.descriptionForm, action: 'New'})
            .then(() => {
                // set the loading to true
                this.loading = false
                // set loader to this.loading
                this.loader = null
                // reset the form
                this.$refs.descriptionDialog.reset()
                // hide the description dialog
                this.$store.commit('dialogs/toggleDescriptionDialog')
                // show the attachmentDialog
                this.$store.commit('dialogs/toggleAttachmentDialog')
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