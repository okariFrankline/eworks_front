<template>
    <v-dialog v-model="paymentDialog" max-width="520" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-2">Set payment paln for the order</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="paymentDialog" @submit.prevent>
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q5. How will your payments be made?
                    </span>
                    <!-- Options for the category -->
                    <v-select 
                        :items="paymentPlans" 
                        prepend-icon="mdi-credit-card-clock-outline" 
                        placeholder="Choose Payment Schedule" 
                        dense class="mt-3" 
                        item-text="name" 
                        item-value="name" 
                        style="font-size: .9em;" 
                        :rules="selectRules"
                        v-model="payForm.payment_schedule"
                        @keyup.enter.prevent="addOrderPayment"
                    ></v-select>
                    <!-- End of the options for the category -->
                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Q6. Set acceptable offer range you will pay  <span class="pink--text text-lowercase">{{payForm.payment_schedule}}</span>
                    </span>
                    <v-row>
                        <v-col md=5 class="mt-n3">
                            <v-text-field 
                            placeholder="Minimum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="payForm.min_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
                            @keyup.enter.prevent="addOrderPayment"
                            ></v-text-field>
                        </v-col>
                        <v-col md=2 class="mt-3 ml-n5 mr-2">
                            <span class="text-body-2 font-weight-bold ml-10 primary--text">
                                To
                            </span>
                        </v-col>
                        <v-col md=5 class="mt-n3">
                            <v-text-field 
                            placeholder="Maximum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="payForm.max_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
                            @keyup.enter.prevent="addOrderPayment"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Payment dialog -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3 mb-n2" 
                    color="error" 
                    small 
                    text
                    @click="cancelPaymentDialog"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-payment">cancel</span>
                </v-btn>
                <!-- End of cancle button -->

                <!-- Next button -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click="addOrderPayment"
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
import { mapState } from "vuex"
// component definition
export default {
    // name
    name: "PaymentDialog",
    // computed
    computed: {
      // get the dialog state
      ...mapState('dialogs', [
          'paymentDialog'
      ]),
      // map created order
      ...mapState('created_order', [
        'order'
      ]),
      // payment plans
      ...mapState('select', [
            'paymentPlans'
      ]),
    },
    // data
    data: () => ({
        // loading
        loading: false,
        // loader
        loader: null,
        // payForms
        payForm: {
            payment_schedule: '',
            min_payment: '',
            max_payment: ''
        },
        // amount rules
        amountRules: [
            v => !!v || 'Amount cannot be less than 0.'
        ],
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
    }),
    // methods
    methods: {
        // function for canceling the payment dialog
        async cancelPaymentDialog() {
            // get cancel text
            let text = document.getElementById('cancel-text-payment')
            // set the text to cancelling
            text.innerHTML = 'cancelling...'
            // delete the order
            await this.$axios.post(`/order/${this.order.id}/delete`)
            .then(() => {
                // reset the form
                this.$refs.paymentDialog.reset()
                // hide the dialog
                this.$store.commit('dialogs/togglePaymentDialog')
                // set text to cancel
                text.innerHTML = 'cancel'
            })
            .catch(error => {
                // set the error message
                let message = "Cancel Failed. Order could not be cancelled. Please try again later"
                // set text to cancel
                text.innerHTML = 'cancel'
                // emit an error
                this.$emit('error', message)
            })
        },
        // show description dialog
        async addOrderPayment() {
            // validate the dialog form
            if (!this.$refs.paymentDialog.validate()) return
            // get the min and max amount
            let { min_payment, max_payment } = this.payForm
            // ensure the max amount is more than min amount
            if (parseInt(max_payment) < parseInt(min_payment)) {
                // set error
                let message = "Invalid. Max amount must be more than Min Amount"
                // return error
                return this.$emit('error', message)
            }
            // set the loading to true
            this.loading = true
            // set loader to this.loading
            this.loader = this.loading
            // post the data
            await this.$store.dispatch('created_order/addOrderPayment', {data: this.payForm, action: 'New'})
            .then(() => {
                // set the loading to true
                this.loading = false
                // set loader to this.loading
                this.loader = null
                // reset the form
                this.$refs.paymentDialog.reset()
                // hide the payment dialog
                this.$store.commit('dialogs/togglePaymentDialog')
                // show the description dialog
                this.$store.commit('dialogs/toggleDescriptionDialog')
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