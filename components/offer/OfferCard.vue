<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2" loader-height="4px" :loading="cardLoading ? 'teal lighten-1' : null">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small left color="teal">mdi-offer</v-icon>
                        <span class="ml-1 text-caption font-weight-bold teal--text text-capitalize">
                            Order offers  made
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn 
                            text 
                            x-small 
                            color="warning" 
                            outlined 
                            class="mr-2"
                            @click="getPendingOffers"
                        >   
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                Pending
                            </span>
                            <v-icon x-small right v-if="showing == 'pending'">mdi-check-bold</v-icon>
                        </v-btn>

                        <!-- Accepted offer sbutton -->
                        <v-btn 
                            text 
                            x-small 
                            color="success" 
                            outlined 
                            class="mr-2"
                            @click="getAcceptedOffers"
                        >
                            <span class="text-caption font-weight-bold success--text text-capitalize">
                                Accepted
                            </span>
                            <v-icon x-small right v-if="showing == 'accepted'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of the accepted offers -->

                        <!-- Buttong for the rejecte offer -->
                        <v-btn 
                            text
                             x-small 
                             color="error" 
                             outlined
                             @click="getRejectedOffers"
                        >
                            <span class="text-caption font-weight-bold error--text text-capitalize">
                                Rejected
                            </span>
                            <v-icon x-small right v-if="showing == 'rejected'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of rejected offers button -->
                        </v-row>
                </v-card-title>

                <v-divider class="mx-4 cyan mt-1"></v-divider>

                <template>
                    <NotFound
                        v-if="!offers.length"
                        :message="isClientMessage ? isClientMessage : notFoundMessage"
                        :color="'teal'"
                        :icon="'mdi-database-off'"
                    />

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="offer in offers" :key="offer.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text class="">
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ offer.order.category}} <span class="red--text">::</span> {{ offer.order.specialty}}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Owner of the job -->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ offer.order.owner_name }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of owner of the job -->

                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title> 
                                                    <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Order posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ showDeadline(offer.order.posted_on) }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ offer.order.category }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ offer.order.specialty }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title> 
                                                    <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Offer submitted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ showDeadline(offer.submitted_on) }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->
                                        </v-list>
                                    </v-menu>


                                    <v-spacer></v-spacer>
                                    <div class="mr-5">
                                        <span class="text-caption font-weight-bold mr-3 teal--text">
                                            Status: <span :class="status_color(offer)" class="ml-1">{{ render_offer_status(offer) }}</span>
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text>
                                <v-row class="mt-n8">
                                    <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty( offer.order.description )}}
                                    <span id="dots-1" :style="offer.order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="offer.order.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description( offer.order.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(offer)" x-small>
                                        <v-icon x-small color="info"> 
                                            {{offer.order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n10">
                                <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text"> 
                                    <span class="mr-2 teal--text">My Asking Amount:</span> kes {{ offer.asking_amount }}
                                </span>

                                <v-spacer></v-spacer>
                                <!-- Button for downloading the invite attachments -->
                                <v-btn 
                                    x-small 
                                    color="teal" 
                                    dark 
                                    text
                                    depressed 
                                    @click="viewOrder(offer.order.id)"
                                    class="mr-3"
                                >         
                                    <span class="text-capitalize font-weight-bold">view order</span>
                                </v-btn>
                                <!-- End of button for downloading an invite's attachment -->
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="cyan" 
                                    depressed 
                                    class="mr-2" 
                                    v-if="offer.is_accepted && !offer.has_accepted_order"
                                    @click="acceptOrder(offer.order.id, offer.id)" 
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`accept-text-${offer.id}`">Accept</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <v-btn  
                                    dark 
                                    x-small 
                                    color="success" 
                                    depressed 
                                    text
                                    class="mr-2" 
                                    v-if="offer.has_accepted_order"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`accept-text-${offer.id}`">Accepted</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="error lighten-1" 
                                    depressed class="mr-4" 
                                    v-if="offer.is_accepted" 
                                    @click="rejectOrder(offer.order.id, offer.id)" 
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`reject-text-${offer.id}`">decline</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="error" 
                                    text
                                    class="mr-5 ml-n2" 
                                    v-if="offer.is_pending" 
                                    @click="cancelOffer(offer.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`cancel-text-${offer.id}`">Cancel</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="error lighten-1" 
                                    depressed 
                                    class="mr-5" 
                                    v-if="offer.is_rejected" 
                                    @click="deleteOffer(offer.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`delete-text-${offer.id}`">delete</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->
                            </v-card-actions>
                            <v-divider class="ml-4 mr-4 mb-n3 mt-1 cyan"></v-divider>
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
// import mapstate
import { mapState } from "vuex"
export default {
    // name
    name: "OfferCard",
    // props
    props: {
        // pending offers
        offers: {
            type: Array
        },
        isClientMessage: String
    },
    // components
    components: {
        NotFound
    },
    // computed
    computed: {
        ...mapState('offers', [
            'showing'
        ])
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'Your pending offers will show up here.',
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
        // cardloading
        cardLoading: false
    }),
    // methods
    methods: {
        // function for rendering the offer status
        render_offer_status(offer) {
            // check the status
            if (offer.is_accepted) {
                return "Accepted"
            } else if(offer.is_pending) {
                return "Pending"
            } else {
                return "Rejected"
            }
        },

        // status color
        status_color(offer) {
            // check the status
            if (offer.is_accepted) {
                return "success--text"
            } else if(offer.is_pending) {
                return "warning--text"
            } else {
                return "error--text"
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

        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show more
        showMore(offer) {
            this.$store.commit('offers/TOGGLE_SHOW_MORE', offer.id)
        },

        // view order
        viewOrder(orderId) {
            // emit the event
            this.$emit('view-order', orderId)
        },

        // function for accepting an order
        async acceptOrder(orderId, offerId) {
            // get the text
            let text = document.getElementById(`accept-text-${offerId}`)
            // set the text to cancelling
            text.innerHTML = 'accepting...'
            // accept the order
            await this.$axios.post(`/order/${orderId}/accept/${offerId}`)
                .then(({data}) => {
                    // set the has accepted order to true
                    this.$store.commit('offers/ACCEPT_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // set the text to cancelled
                    text.innerHTML = 'accepted'
                })
                // handle the error
                .catch(err => {
                    // check if the err has a response
                    if (err.response) {
                        // set the message
                        this.message = err.response.data.errors.details
                    } else {
                        // set the error
                        this.message = 'There was a problem processing the request. Check your connection and try again later.'
                    }
                    // set the color
                    this.color =  'error lighten-1'
                    // set text to cancel
                    text.innerHTML = "accept"
                    // set the snackbar to true
                    this.snackbar = true
                })
        },

        // function of cancelling an offer
        async cancelOffer(offerId) {
            // get the text
            let text = document.getElementById(`cancel-text-${offerId}`)
            // set the text to cancelling
            text.innerHTML = 'cancelling...'
            // cancel the offer
            await this.$axios.post(`/order/offer/${offerId}/cancel`)
                // resolve success
                .then(({data}) => {
                    // remove the offer from the offers                    
                    this.$store.commit('offers/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // set the text to cancelled
                    text.innerHTML = 'cancelled'
                })
                // handle the error
                .catch(err => {
                    console.log(err)
                    // check if the err has a response
                    if (err.response) {
                        // set the message
                        this.message = err.response.data.errors.details
                    } else {
                        // set the error
                        this.message = 'There was a problem processing the request. Check your connection and try again later.'
                    }
                    // set the color
                    this.color =  'error lighten-1'
                    // set text to cancel
                    text.innerHTML = "cancel"
                    // set the snackbar to true
                    this.snackbar = true
                })
        },

        // function for rejecting an offer
        async rejectOrder(orderId, offerId) {
            // get the text
            let text = document.getElementById(`reject-text-${offerId}`)
            // set the text to cancelling
            text.innerHTML = 'rejecting...'
            // accept the order
            await this.$axios.post(`/order/${orderId}/reject/${offerId}`)
                .then(({data}) => {
                    // remove the offer from the offers
                    this.$store.commit('offers/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // set the text to cancelled
                    text.innerHTML = 'rejected'
                })
                // handle the error
                .catch(err => {
                    // check if the err has a response
                    if (err.response) {
                        // set the message
                        this.message = err.response.data.errors.details
                    } else {
                        // set the error
                        this.message = 'There was a problem processing the request. Check your connection and try again later.'
                    }
                    // set the color
                    this.color =  'error lighten-1'
                    // set text to cancel
                    text.innerHTML = "reject"
                    // set the snackbar to true
                    this.snackbar = true
                })
        },

        // function fordeleting an offer
        async deleteOffer(offerId) {
            // get the text
            let text = document.getElementById(`delete-text-${offerId}`)
            // set the text to deleting
            text.innerHTML = 'deleting...'
            // delete the offer
            await this.$axios.post(`/order/offer/${offerId}/delete`)
                // succes 
                .then(({ data }) => {
                    // set the has accepted order to true
                    this.$store.commit('offers/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // set the text to cancelled
                    text.innerHTML = 'deleted'
                })
                // handle the error
                .catch(err => {
                    console.log(err)
                    // check if the err has a response
                    if (err.response) {
                        // set the message
                        this.message = err.response.data.errors.details
                    } else {
                        // set the error
                        this.message = 'There was a problem processing the request. Check your connection and try again later.'
                    }
                    // set the color
                    this.color =  'error lighten-1'
                    // set text to cancel
                    text.innerHTML = "delete"
                    // set the snackbar to true
                    this.snackbar = true
                })
        },

        // function for getting pending offers
        async getPendingOffers() {
            // set the card loading to true
            this.cardLoading = true
            // not found message
            this.notFoundMessage = 'Your pending offers will show up here.'
            // get the offers
            await this.$store.dispatch('offers/getOffers', {filter: "pending"})
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('offers/SET_SHOWING', "pending")
                    // set the card loading to true
                    this.cardLoading = false
                })

        },

        // function for getting the accepted offers
        async getAcceptedOffers() {
            // set card loading to true
            this.cardLoading = true
            // not found message
            this.notFoundMessage = 'Offers that have been accepted will show up here.'
            // get the offers
            await this.$store.dispatch('offers/getOffers', {filter: "accepted"})
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('offers/SET_SHOWING', "accepted")
                    // set the loading to false
                    this.cardLoading = false
                })
        },

        async getRejectedOffers() {
            // set card loading to true
            this.cardLoading = true
            // not found message
            this.notFoundMessage = 'Offers that have been rejected will show up here.'
            // get the offers
            await this.$store.dispatch('offers/getOffers', {filter: "rejected"})
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('offers/SET_SHOWING', "rejected")
                    // set card loading to false
                    this.cardLoading = false
                })
        },
    },
}
</script>