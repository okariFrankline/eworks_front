<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2" :loading="cardLoading ? 'teal lighten-1' : null" loader-height="4px">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <span class="text-caption font-weight-bold teal--text text-capitalize ml-2 mb-n2">
                            My Posted Orders
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn 
                            text 
                            x-small 
                            color="info" 
                            outlined 
                            class="mr-2"
                            @click="getUnassignedOrders"
                        >
                            <span class="text-caption font-weight-bold error--text text-capitalize">
                                Not Assigned
                            </span>
                            <v-icon x-small right color= "error" v-if="showing == 'unassigned'">mdi-check-bold</v-icon>
                        </v-btn>

                        <!-- Accepted offer sbutton -->
                        <v-btn 
                            text 
                            x-small 
                            color="warning" 
                            outlined 
                            class="mr-2"
                            @click="getAssignedOrders"
                        >
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                In Progress
                            </span>
                            <v-icon x-small right v-if="showing == 'in progress'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of the accepted offers -->

                        <!-- Buttong for the rejecte offer -->
                        <v-btn 
                            text
                             x-small 
                             color="success" 
                             outlined
                             @click="getCompletedOrders"
                        >
                            <span class="text-caption font-weight-bold success--text text-capitalize">
                                Completed
                            </span>
                            <v-icon x-small right v-if="showing == 'completed'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of rejected offers button -->
                        </v-row>
                </v-card-title>
                <v-divider class="mx-4 cyan mt-2"></v-divider>
                
                <template>
                    <!-- No orders found -->
                    <NotFound 
                        :message="notFoundMessage"
                        v-if="!orders.length"
                        :icon="'mdi-database-off'"
                        :color="'teal'"
                    />
                    <!-- End of orders not found -->

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="order in orders" :key="order.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-1">
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ order.category}} <span class="red--text">::</span> {{ order.specialty}}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Owner of the job -->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                    <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
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

                                            <!-- Offer submission date-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title> 
                                                    <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Submit offer before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ showDeadline(order.deadline) }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of offer submission date -->
                                        </v-list>
                                    </v-menu>

                                    <v-spacer></v-spacer>
                                    <div class="mr-5">
                                        <span class="text-caption font-weight-bold" :class="status_color(order)">
                                            <span class="mr-1 error--text">Status:</span> {{ render_order_status(order) }}
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text> 
                                <v-row class="mt-n4 ml-1"> 
                                    <v-chip small outlined color="cyan" class="mt-1">
                                    <span class="text-caption font-weight-normal ml-3 blue--text" style="font-size: .8em;"> 
                                        Kes {{ order.payable_amount }} /
                                        <span class="blue--text font-weight-normal text-caption">
                                            {{ order.payment_schedule }}
                                        </span>
                                    </span>
                                    </v-chip>
                                </v-row>                           
                                <!-- End of row for skills -->
                                <v-row class="mt-n2">
                                    <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty(order.description )}}
                                    <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(order.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(order)" x-small>
                                        <v-icon x-small color="info"> 
                                            {{order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n9 mb-2">
                                <span class="text-caption font-weight-bold ml-4 text-capitalize warning--text"> 
                                    Active Offers:
                                    <span class="warning--text font-weight-bold text-caption ml-1">
                                    {{ order.active_offers }}
                                    </span>
                                </span>

                                <v-spacer></v-spacer>
                                <!-- Button for cancelling a bid -->
                                <v-btn
                                    v-if="order.request"
                                    dark 
                                    x-small 
                                    color="info" 
                                    depressed 
                                    text 
                                    @click="() => $router.push({path: `/direct/hire/${order.request.id}`})"
                                >
                                    <span class="text-capitalize font-weight-bold">view direct hire</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    v-if="!order.is_assigned"
                                    dark 
                                    x-small 
                                    color="info" 
                                    depressed 
                                    text 
                                    @click="() => $router.push({path: `/orders/${order.id}/review`})"
                                >
                                    <span class="text-capitalize font-weight-bold">edit order</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    text
                                    color="teal" 
                                    depressed 
                                    class="mr-3"
                                    @click="() => $router.push({path: `/orders/${order.id}`})"
                                >
                                    <span class="text-capitalize font-weight-bold">
                                        {{ order.is_complete ? 'approve payment' : 'view offers'}}
                                    </span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small
                                    color="error lighten-1" 
                                    depressed class="mr-4"  
                                    v-if="!order.is_assigned"
                                    @click="cancelOrder(order.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`cancel-text-${order.id}`">Cancel</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->
                            </v-card-actions>
                            <v-divider class="mx-4 mb-n3 cyan"></v-divider>
                        </v-col>
                    </v-row>
                    <!-- End of row for a previous hire -->
                </template>
            </v-card>
        </v-col>

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
// import map state
import { mapState } from "vuex"
// component definiton
export default {
    // name
    name: "MyPostedOrder",
    // props
    props: {
        // pending offers
        orders: {
            type: Array
        }
    },
    // components
    components: {
        NotFound
    },
    // computed
    computed: {
        ...mapState('my_posted_orders', [
            'showing'
        ])
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'You do not have an created orders at the moment',
        // set card loading
        cardLoading: false,
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
    }),
    // methods
    methods: {
        // function for rendering the offer status
        render_order_status(order) {
            // check the status
            if (!order.is_assigned) {
                return "Unassigned"
            } else if(order.is_assigned && !order.is_complete) {
                return "In Progress"
            } else {
                return "Completed"
            }
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // status color
        status_color(order) {
            // check the status
            if (!order.is_assigned) {
                return "info--text"
            } else if(order.is_assigned && !order.is_complete) {
                return "warning--text"
            } else {
                return "sucess--text"
            }
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 75).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show more
        showMore(order) {
            this.$store.commit('my_posted_orders/TOGGLE_SHOW_MORE', order.id)
        },

        // function for showing error
        handleError() {
            // check if there was an error
            // set the message
            this.message = 'Failed. There was a problem completing your request. Please try again later.'
            // set the color
            this.color =  'error'
            // set the snackbar to true
            this.snackbar = true
            // set the loading to false
            this.cardLoading = false
        },

        // function for showing success
        showSuccess(data, type) {
            // remove the offer from the list of accepted offers
            type == 'cancel' ? this.$store.commit('offers/REMOVE_PENDING_OFFER', offerId) : this.$store.commit('offers/REMOVE_ACCEPTED_OFFER', offerId)
            // set the message
            this.message = data.data.details
            // set the snackbar to true
            this.snackbar = true
            // set the loading to false
            type == "reject" ? this.rejecting = false : this.loading = false
            // set loader to null
            type == "reject" ? this.rejectLoader = null : this.loader = fase
        },

        // function of cancelling an offer
        async cancelOrder(orderId) {
            // get the text for deleting an order
            let text = document.getElementById(`cancel-text-${orderId}`)
            // set teh text to deleting
            text.innerHTML = "cacelling..."
            // set the card loading to true
            this.cardLoading = true
            // cancel the order
            await this.$axios.post(`/order/${orderId}/cancel`)
                .then(response => {
                    // remove the order from the list of orders
                    this.$store.commit('my_posted_orders/REMOVE_ORDER', {orderId: orderId})
                    // set message
                    this.message = response.data.data.message
                    // set teh text to deleting
                    text.innerHTML = "cancel"
                    // show the snackbar
                    this.snackbar = true
                    // set the card loading to true
                    this.cardLoading = false
                })
                // handle the error
                .catch(err => {
                    // set the message depending on the err.response
                    if (err.response) {
                        // set the message
                        this.message = err.response.errors.details
                    } else {
                        // set the mesage
                        this.message = "Failed. There was a problem cancelling the order. Please try again later"
                    }
                    //set the color of the snackbar
                    this.color = 'error lighten-1'
                    // set teh text to deleting
                    text.innerHTML = "cancel"
                    // show the snackbar
                    this.snackbar = true
                    // set the card loading to true
                    this.cardLoading = false
                })
        },

        // function for getting the unassigned orders
        async getUnassignedOrders() {
            // set the not found message
            this.notFoundMessage = 'Sorry. You do not have an created orders at the moment.'
            // set the card loading to true
            this.cardLoading = true
            // get the data
            await this.$store.dispatch('my_posted_orders/getMyPostedOrders', {filter: "unassigned"})
                .then((response) => {
                    // se the showing to unassigned
                    this.$store.commit('my_posted_orders/SET_SHOWING', "unassigned")
                    // set the card loading to false
                    this.cardLoading = false
                })
                // handle error
                .catch(err => this.handleError())
        },

        // function for getting the assigned order
        async getAssignedOrders() {
            // set the not found message
            this.notFoundMessage = 'Sorry. You do not have any orders in progress at the moment.'
            // set the card loading to true
            this.cardLoading = true
            // gt orders that are not in progress
            await this.$store.dispatch('my_posted_orders/getMyPostedOrders', {filter: "in_progress"})
                .then((response) => {
                    // se the showing to unassigned
                    this.$store.commit('my_posted_orders/SET_SHOWING', "in progress")
                    // set the cardloding to false
                    this.cardLoading = false
                })
                // handle error
                .catch(err => this.handleError())
        },

        // function for getting completed orders
        async getCompletedOrders() {
            // set the not found message
            this.notFoundMessage = 'Sorry. You do not have any completed orders at the moment.'
            // set the card loading to true
            this.cardLoading = true
            // get the completed order
            await this.$store.dispatch('my_posted_orders/getMyPostedOrders', {filter: "complete"})
                .then((response) => {
                    // se the showing to unassigned
                    this.$store.commit('my_posted_orders/SET_SHOWING', "completed")
                    // set the card loading to true
                    this.cardLoading = false
                })
                // handle error
                .catch(err => this.handleError())
        },


    },
}
</script>