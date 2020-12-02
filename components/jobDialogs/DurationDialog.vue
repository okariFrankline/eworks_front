<template>
    <v-dialog v-model="durationDialog" max-width="520" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-2">Set Order Duration and Deadline</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="durationDialog" @submit.prevent>
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q3. How long will your order last?
                    </span>
                    <!-- Options for the category -->
                    <v-select 
                        :items="durations" 
                        prepend-icon="mdi-briefcase-plus-outline" 
                        placeholder="Choose Job Specialty" 
                        dense 
                        class="mt-3" 
                        item-text="name" 
                        item-value="name" 
                        :rules="selectRules"
                        style="font-size: .9em;"
                        v-model="durationForm.duration"
                        @keyup.enter.prevent="addOrderDuration"
                    ></v-select>
                    <!-- End of the options for the category -->
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q4. When is the deadline for offer submission for your order?
                    </span>
                    <!-- Bidding deadline -->
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="durationForm.deadline_string_date"
                        placeholder="Not accepting deadline beyond"
                        prepend-icon="mdi-calendar-outline"
                        readonly
                        style="font-size: .9em;"
                        v-bind="attrs"
                        v-on="on"
                        @keyup.enter.prevent="addOrderDuration"
                    ></v-text-field>
                    </template>
                    <v-date-picker 
                        no-title 
                        v-model="durationForm.deadline_string_date" 
                        @input="menu = false"
                    ></v-date-picker>
                </v-menu>
                <!--End of bidding deadline -->
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
                    @click="cancelDurationDialog"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-duration">cancel</span>
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
                    @click.stop="addOrderDuration"
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
// import mastate
import { mapState } from "vuex"
// component definition
export default {
    // name
    name: 'DurationDialog',
    // computed
    computed: {
      // get the dialog state
      ...mapState('dialogs', [
          'durationDialog'
      ]),
      // map created order
      ...mapState('created_order', [
        'order'
      ]),
      ...mapState('select', [
            'durations'
      ]),
    },
    // data
    data: () => ({
        // duration form
        durationForm: {
            duration: '',
            deadline_string_date: ''
        },
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
        // loading
        loading: false,
        // loader
        loader: null,
        // menu
        menu: false
    }),
    // methods
    methods: {
        // cancel for the durationDialog
        async cancelDurationDialog() {
            // get cancel text
            let text = document.getElementById('cancel-text-duration')
            // set the text to cancelling
            text.innerHTML = 'cancelling...'
            // delete the order
            await this.$axios.post(`/order/${this.order.id}/delete`)
            .then(() => {
                // reset the form
                this.$refs.durationDialog.reset()
                // dismiss the dialog
                this.$store.commit('dialogs/toggleDurationDialog')
                // set text to cancel
                text.innerHTML = 'cancel'
            })
            .catch(error => {
                // set the error message
                let message = "Cancel Failed. Order could not be cancelled. Please try again later"
                // set text to cancel
                text.innerHTML = 'cancel'
                // emit an error message
                this.$emit('error', message)
            })
        },
        // show payment dialog
        async addOrderDuration() {
            // validate the dialog form
            if (!this.$refs.durationDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set loader to this.loading
            this.loader = this.loading
            // post the data
            await this.$store.dispatch('created_order/addOrderDuration', {data: this.durationForm, action: 'New'})
            .then(() => {
                // set the loading to true
                this.loading = false
                // set loader to this.loading
                this.loader = null
                // reset the form
                this.$refs.durationDialog.reset()
                // hide the dialog
                this.$store.commit('dialogs/toggleDurationDialog')
                // show the payment dialog
                this.$store.commit('dialogs/togglePaymentDialog')
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