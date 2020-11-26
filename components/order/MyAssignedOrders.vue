<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <span class="text-caption font-weight-bold pink--text text-capitalize">
                            My Assigned Orders
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn text x-small color="warning" outlined class="mr-2" @click="getInProgressOrders">
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                In Progress
                            </span>
                            <v-icon x-small right v-if="showing == 'in progress'">mdi-check-bold</v-icon>
                        </v-btn>

                        <!-- Accepted offer sbutton -->
                        <v-btn text x-small color="warning" outlined class="mr-2" @click="getUnpaidOrders">
                            <span class="text-caption font-weight-bold error--text text-capitalize">
                                Not Paid
                            </span>
                            <v-icon x-small right color="error" v-if="showing == 'unpaid'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of the accepted offers -->

                        <!-- Buttong for the rejecte offer -->
                        <v-btn text x-small color="success" outlined @click="getRecentlyPaidOrders">
                            <span class="text-caption font-weight-bold success--text text-capitalize">
                                Recently Paid
                            </span>
                            <v-icon x-small right v-if="showing == 'paid'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of rejected offers button -->
                        </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <template>
                    <NotFound
                        v-if="!orders.length"
                        :message="isClientMessage ? isClientMessage : notFoundMessage"
                    />
                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="order in orders" :key="order.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-n1">
                                            <v-icon left color="teal">mdi-briefcase-check</v-icon>
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ order.specialty }}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Owner of the job -->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order owner:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ order.owner_name }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of owner of the job -->

                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ showDeadline(order.posted_on) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ order.category }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ order.specialty }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->
                                        </v-list>
                                    </v-menu>

                                    <v-spacer></v-spacer>
                                    <div class="mr-3">
                                        <span class="text-caption font-weight-bold mr-2" :class="status_color(order)">
                                            <span class="mr-1 error--text">Status:</span> {{ render_order_status(order) }}
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text>                            
                                <!-- End of row for skills -->
                                <v-row class="mt-n8">
                                    <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty(order.description )}}
                                    <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(order.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(order.id)" x-small>
                                        <v-icon color="info" x-small> 
                                            {{order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n9 mb-2">
                                <!-- Button for downloading the order attachments -->
                                <v-btn 
                                    v-if="order.attachments"
                                    x-small 
                                    color="teal" 
                                    dark 
                                    class="ml-2"
                                    depressed 
                                    text
                                    @click="downloadAttachments(order.attachments)"
                                >         
                                    <span class="text-capitalize font-weight-bold">downld attachments</span>
                                </v-btn>
                                <!-- End of button for downloading an order's attachment -->

                                <!-- Button for downloading the order attachments -->
                                <v-btn 
                                    v-if="!order.attachments"
                                    x-small 
                                    color="error" 
                                    dark 
                                    class="ml-2"
                                    depressed 
                                    text
                                >         
                                    <span class="text-capitalize font-weight-bold">no attachments</span>
                                </v-btn>
                                <!-- End of button for downloading an order's attachment -->
                                <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text" v-if="order.is_complete && !order.is_paid_for"> 
                                    <span class="mr-2 teal--text">Expected Payment:</span> Kes {{ amount }}
                                </span>

                                <v-spacer></v-spacer>
                                <!-- Button for cancelling a bid -->
                                <v-btn
                                    v-if="!order.is_complete"  
                                    dark 
                                    x-small 
                                    color="info lighten-1" 
                                    depressed 
                                    class="mr-2"
                                    @click="newInvite(order.id)"
                                >
                                    <span class="text-capitalize font-weight-bold">new collabo</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn
                                    v-if="!order.is_complete"
                                    dark 
                                    x-small 
                                    class="mr-5"
                                    color="success lighten-1" 
                                    depressed 
                                    @click="markComplete(order.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`complete-text-${order.id}`">mark complete</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    v-if="order.is_complete && order.is_paid_for"
                                    dark 
                                    x-small
                                    color="error lighten-1" 
                                    depressed class="mr-4"  
                                    
                                    @click="cancelOrder(order.id)"
                                >
                                    <span class="text-capitalize font-weight-bold">rate client</span>
                                    
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->
                            </v-card-actions>
                            <v-divider class="mx-5 cyan mb-n3 mt-n1"></v-divider>
                        </v-col>
                    </v-row>
                    <!-- End of row for a previous hire -->

                </template>
            </v-card>
        </v-col>

        <IsClient
            :showIsClient="showClientDialog"
            :message="'No assigned orders to be seen.'"
            :icon="'mdi-database-off'"
            @hide-dialog="() => $store.commit('assigned_orders/HIDE_DIALOG')"
        />

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2" timeout="2000">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
// import moment
import moment from 'moment'
// import not found
import NotFound from "~/components/NotFound"
// import the isClient
import IsClient from "~/components/dialogs/IsClient"
// import map state
import { mapState } from "vuex"
// compoent definition
export default {
    // name
    name: "MyAssignedOrders",
    // props
    props: [
        'orders',
        'paidCount',
        'inProgressCount',
        'unPaidCount',
        'isClientMessage',
        'showClientDialog'
    ],
    // components
    components: {
        NotFound,
        IsClient
    },
    // computed
    computed: {
        ...mapState('assigned_orders', [
            'showing'
        ])
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'Sorry. You do not have any assigned orders at the moment.',
        // LOADING
        loading: false,
        // loader
        loader: null,
        // LOADING
        rejecting: false,
        // loader
        rejectLoader: null,
        // message
        message: '',
        // color
        color: 'success lighten-1',
        // snackbar
        snackbar: false,
        amount: 4000
    }),
    // methods
    methods: {
        // function for rendering the offer status
        render_order_status(order) {
            // check the status
            if (order.is_complete && !order.is_paid_for) {
                return "Not Paid"
            } else if(!order.is_complete) {
                return "In Progress"
            } else {
                return "Paid"
            }
        },
        // function for showing the payable amount
        showPayableAmount (offers) {
            offer = offers.pop()
            // return the asking amount
            return offer.asking_amount
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // status color
        status_color(order) {
            // check the status
            if (order.is_complete && !order.is_paid_for) {
                return "error--text"
            } else if(!order.is_complete) {
                return "warning--text"
            } else {
                return "success--text"
            }
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show more
        showMore(orderId) {
            this.$store.commit('assigned_orders/TOGGLE_SHOW_MORE', orderId)
        },

        // new collab
        newInvite(orderId) {
          // emit
          this.$emit('new-invite', orderId)
        },

        // function for showing error
        handleError(err, element) {
            // set the message depending on the err.response
            if (err.response) {
                // set the message
                this.message = err.response.data.errors.details
            } else {
                // set the mesage
                element ? this.message = "Failed. There was a problem cancelling the order. Please try again later" : this.message = "Failed. There was a problem retrieiving your orders. Please try again laater."
            }
            //set the color of the snackbar
            this.color = 'error lighten-1'
            // check if the element was given
            if (element) {
                // set the element text to mark complete
                element.innerHTML = 'mark Complete'
            }
            // show the snackbar
            this.snackbar = true
        },

        // function of cancelling an offer
        async markComplete(orderId) {
            // get the text for marking complete
            let text = document.getElementById(`complete-text-${orderId}`)
            // set the text to completing
            text.innerHTML = 'completing...'
            // cancel the order
            await this.$axios.post(`/order/${orderId}/complete`)
                .then(response => {
                    // remove the order from the list of orders
                    this.$store.commit('assigned_orders/REMOVE_IN_PROGRESS_ORDER', {orderId: orderId})
                    // set the text to mark complete
                    text.innerHTML = 'mark complete'
                    // set message
                    this.message = response.data.data.message
                    // show the snackbar
                    this.snackbar = true
                })
                // handle the error
                .catch(err => this.handleError(err, text))
        },

        // function for getting unpaid orders
        async getUnpaidOrders() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any unpaid orders at the moment.'
            // get orders
            await this.$store.dispatch('assigned_orders/getMyAssignedOrders', {filter: "unpaid"})
                .then((response) => {
                    // set the showing
                    this.$store.commit('assigned_orders/SET_SHOWING', "unpaid")
                })
                // handle any errors
                .catch(err => this.handleError(err, null))
        },

        // function for getting the in progress orders
        async getInProgressOrders() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any assigned orders at the moment.'
            // get the orders
            await this.$store.dispatch('assigned_orders/getMyAssignedOrders', {filter: "in_progress"})
                .then((response) => {
                    // set the showing
                    this.$store.commit('assigned_orders/SET_SHOWING', "in progress")
                })
                // handle any errors
                .catch(err => this.handleError(err, null))
        },

        // function for getting unpaid orders
        async getRecentlyPaidOrders() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any recently paid orders at the moment.'
            // get the data
            await this.$store.dispatch('assigned_orders/getMyAssignedOrders', {filter: "recently_paid"})
                .then((response) => {
                    // set the showing
                    this.$store.commit('assigned_orders/SET_SHOWING', "paid")
                })
                // handle any errors
                .catch(err => this.handleError(err))
        },

    }
}
</script>