<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small color="teal" left>mdi-offer</v-icon>
                        <span class="text-caption font-weight-bold teal--text text-capitalize">
                            collaboration offers  made
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
                <v-divider></v-divider>
                
                <template>
                    <!-- Row for each of the bids -->
                    <NotFound 
                        :message="isClientMessage ? isClientMessage : notFoundMessage"
                        v-if="!offers.length"
                    />
                    <!-- End of row for a previous hire -->

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="offer in offers" :key="offer.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text class="ml-n1">
                                            <v-icon left color="teal">mdi-briefcase-check</v-icon>
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
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Owner:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ offer.order.owner_name }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of owner of the job -->

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

                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Offer Submitted:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    <span class="text-capitalize">{{ postedOn(offer.placed_on) }}</span>
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                        </v-list>
                                        </v-menu>


                                    <v-spacer></v-spacer>
                                    <div class="mr-3">
                                        <span class="text-caption font-weight-bold mr-3 error--text">
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
                                    <span id="dots-1" :style="offer.order.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="offer.order.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description( offer.order.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(offer.id)" x-small>
                                        <v-icon color="info" x-small> 
                                            {{offer.order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n9">
                                <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text"> 
                                    <span class="mr-2 teal--text">My Asking Amount:</span> Kes {{ offer.asking_amount }}
                                </span>

                                <v-spacer></v-spacer>
                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="teal" 
                                    depressed 
                                    class="mr-5" 
                                    text 
                                    @click="() => $router.push({path: `/collaborations/order/${offer.order.id}`})"
                                >
                                    <span class="text-capitalize font-weight-bold">view order</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->


                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    :id="`cancel-offer-${offer.id}`"
                                    x-small 
                                    color="error lighten-1" 
                                    depressed 
                                    class="mr-4" 
                                    v-if="!offer.is_accepted"  
                                    @click="cancelOffer(offer.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`cancel-offer-text-${offer.id}`">Cancel offer</span>
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
// import map state
import { mapState } from "vuex"
// component definiton
export default {
    // name
    name: "MyInviteOfferCard",
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
        ...mapState('collaboration_offers', [
            'showing'
        ])
    },
    // data
    data: () => ({
        // notFoundMesage
        notFoundMessage: 'Sorry. You do not have any pending offers at the moment',
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
        render_offer_status(offer) {
            // check the status
            if (offer.is_accepted) {
                return "Accepted"
            } else if(!offer.is_accepted) {
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
            } else if(!offer.is_accepted) {
                return "warning--text"
            } else {
                return "error--text"
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
        showMore(offerId) {
            this.$store.commit('collaboration_offers/TOGGLE_SHOW_MORE', offerId)
        },

        // function for showing error
        handleError(err) {
            // check if the err has a response
            if (err.response) {
                // set the message
                this.message = err.response.data.errors.details
            } else {
                // set the error
                this.message = 'There was a problem processing the request. Try again later.'
            }
            // set the color
            this.color =  'error lighten-1'
            // set the snackbar to true
            this.snackbar = true
        },

        // function for showing success
        showSuccess(data) {
            // set the message
            this.message = data.data.details
            // set the snackbar to true
            this.snackbar = true
        },

        // function of cancelling an offer
        async cancelOffer(offerId) {
            // get the element with the id
            let text = document.getElementById(`cancel-offer-text-${offerId}`)
            // set the inner text to canceliling
            text.innerHTML = "cancelling..."
            // remove the offer from the offers
            // cancel the offer
            await this.$axios.post(`/invites/offer/${offerId}/cancel`)
                // resolve success
                .then(({data}) => {
                    // remove the offer from the offers                    
                    this.$store.commit('collaboration_offers/REMOVE_OFFER', offerId)
                    // show success
                    this.showSuccess(data)
                })
                // handle the error
                .catch(err => this.handleError(err))
        },


        // function for getting pending offers
        async getPendingOffers() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any pending offers at the moment'
            // get the offers
            await this.$store.dispatch('collaboration_offers/getInviteOffers', {filter: "pending"})
                .then(response => {
                    // set the showing to pending
                    this.$store.commit('collaboration_offers/SET_SHOWING', "pending")
                })
                // handle the error
                .catch(err => this.handleError(err))
        },

        // function for getting the accepted offers
        async getAcceptedOffers() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any accepted offers at the moment'
            // get the offers
            await this.$store.dispatch('collaboration_offers/getInviteOffers', {filter: "accepted"})
                .then(response => {
                    // set the showing to pending
                    this.$store.commit('collaboration_offers/SET_SHOWING', "accepted")
                })
                // handle the error
                .catch(err => this.handleError(err))
        },

        async getRejectedOffers() {
            // not found message
            this.notFoundMessage = 'Sorry. You do not have any rejected offers at the moment.'
            // get the offers
            await this.$store.dispatch('collaboration_offers/getInviteOffers', {filter: "rejected"})
                .then(response => {
                    // set the showing to pending
                    this.$store.commit('collaboration_offers/SET_SHOWING', "rejected")
                })
                // handle the error
                .catch(err => this.handleError(err))
        },
    },
}
</script>