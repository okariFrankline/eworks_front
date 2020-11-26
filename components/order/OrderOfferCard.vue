<template> 
    <!-- Row for the practioner -->
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="525" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small left color="teal">mdi-account-group</v-icon>
                        <span class="text-caption font-weight-bold teal--text">
                            Offers & Assignees
                        </span>

                        <v-spacer></v-spacer>
                        <!-- Pedning offers button -->
                        <v-btn 
                            text 
                            x-small 
                            color="warning" 
                            outlined 
                            class="mr-3"
                            @click="getPendingOffers"
                        >
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                Pending
                            </span>
                            <v-icon x-small right v-if="showing == 'pending'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of offers button -->

                        <!-- Accepted button -->
                        <v-btn 
                            text 
                            x-small 
                            color="success" 
                            outlined
                            @click="getAcceptedOffers"
                        >
                            <span class="text-caption font-weight-bold success--text text-capitalize">
                                Accepted
                            </span>
                            <v-icon x-small right v-if="showing == 'accepted'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of accepted button -->

                        <!-- Pedning offers button -->
                        <v-btn 
                            text 
                            x-small 
                            color="warning" 
                            outlined 
                            class="ml-3"
                            @click="getOrderAssignees"
                        >
                            <span class="text-caption font-weight-bold pink--text text-capitalize">
                                Assignees
                            </span>
                            <v-icon x-small right v-if="showing == 'assignees'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of offers button -->
                    </v-row>
                </v-card-title>
                <v-divider class="mt-1"></v-divider>

                <template v-if="!showAssignee">
                    <template>
                        <NotFound
                            v-if="!offers.length"
                            :message="order.is_assigned ? 'Order has been assigned. Check assignees section' : notFoundMessage"
                            :color="order.is_assigned ? 'warning' : 'error'"
                            :icon="order.is_assigned ? 'mdi-checkbox-marked-circle-outline' : 'mdi-eye-off'"
                        />
                        <!-- Row for showing the offers -->
                        <v-row class="mt-n2" v-for="offer in offers" :key="offer.id">
                            <v-col md=12>
                                <!-- cARD Title -->
                                <v-card-title>
                                    <v-row class="mt-n2 ml-n4">
                                        <!-- Menu containing the profile picture of the person who has placed the bid -->
                                        <v-menu open-on-hover offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn dark v-bind="attrs" v-on="on" text>
                                                    <v-avatar size="30" class="mr-3 ml-2">
                                                        <img :src="offer.owner.profile_pic || '/images/unknown1.png'">
                                                    </v-avatar>
                                                    <span class="text-capitalize font-weight-bold text-caption teal--text mb-n2">
                                                        {{ offer.owner.full_name }}
                                                    </span>
                                                </v-btn>
                                            </template>

                                            <v-list dense shaped v-if="offer.owner.profile_pic">
                                            <v-list-item color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                <v-avatar class="profile ml-3" color="grey" size="124">
                                                        <v-img :src="offer.owner.profile_pic"></v-img>
                                                    </v-avatar>
                                                </v-list-item-title>
                                            </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <!-- End of menu -->
                                                        
                                        <v-spacer></v-spacer>

                                        <div class="mr-5 mt-n2" v-if="offer.is_pending">
                                            <v-row class="mt-n1">
                                                <v-col class="mr-5">
                                                    <span class="text-caption font-weight-bold teal--text">Rated:</span>
                                                </v-col>
                                                <v-col class="">
                                                    <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull"
                                                        half-increments
                                                        dense
                                                        small
                                                        :value="offer.owner.rating"
                                                        class="ml-n10"
                                                        readonly
                                                    ></v-rating>
                                                </v-col>
                                            </v-row>
                                        </div>

                                        <div class="mr-7 mb-n1" v-if="offer.is_accepted">
                                           <span class="text-caption font-weight-bold error--text">
                                               Accept Status: <span class="ml-1 warning--text">
                                                   {{ showOfferStatus(offer) }}
                                               </span>
                                           </span>
                                        </div>
                                    </v-row>
                                </v-card-title>
                                <!-- End of card title -->
                            
                                <!-- Cover letter of the professional -->
                                <v-card-text>
                                    <v-row class="mt-n6">
                                        <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                        {{ show_first_fifty(offer.owner.cover_letter )}}
                                        <span id="dots-1" :style="offer.owner.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="offer.owner.show_more ? 'display: inline;' : 'display: none;'">
                                            {{ show_hidden_description(offer.owner.cover_letter )}}
                                        </span>
                                        <!-- Button for showing more description -->
                                        <v-btn icon @click="() => $store.commit('order/TOGGLE_OFFER_SHOW_MORE', offer.id)" x-small>
                                            <v-icon x-small color="info"> 
                                                {{offer.owner.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                            </v-icon>
                                        </v-btn>
                                        <!-- End of button for wshoing the description -->
                                        </p>
                                    </v-row>
                                </v-card-text>
                                <!-- End of the professional cover letter -->

                                <v-card-actions class="mt-n10 mb-1">
                                    <!-- Displays the asking amount -->
                                    <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text"> 
                                        <span class="mr-2 teal--text">Asking Amount:</span> Kes {{ offer.asking_amount }}
                                    </span>
                                    <!-- End of displaying the asingn amount -->
                                    <v-spacer></v-spacer>

                                    <!-- Buttons for viewing the profile -->
                                    <v-btn  
                                        dark 
                                        x-small 
                                        color="teal" 
                                        depressed 
                                        text 
                                        class="mr-4"
                                        @click="viewOwnerProfile(offer.owner.id)"
                                    >
                                        <span class="text-capitalize font-weight-bold">view profile</span>
                                    </v-btn>
                                    <!-- End of button for viewing the profile -->
                                    
                                    <!-- Buttng for accepting the offer -->
                                    <v-btn 
                                        v-if="offer.is_pending"
                                        x-small     
                                        color="cyan" 
                                        depressed 
                                        dark 
                                        @click="acceptOffer(offer.id)"
                                    >
                                        <span class="text-capitalize font-weight-bold" :id="`accept-text-${offer.id}`">Accept</span>
                                    </v-btn>
                                    <!-- End of button for accepting the offer -->

                                    <v-btn  
                                        v-if="offer.is_pending"
                                        dark 
                                        x-small 
                                        color="error lighten-1" 
                                        depressed 
                                        class="mr-3" 
                                        @click="rejectOffer(offer.id)"
                                    >
                                        <span class="text-capitalize font-weight-bold" :id="`reject-text-${offer.id}`">reject</span>
                                    </v-btn>

                                    <!-- Button for assigning the job -->
                                    <v-btn  
                                        v-if="offer.has_accepted_order && !order.assignees.includes(offer.owner.id)"
                                        dark 
                                        x-small 
                                        color="info lighten-1" 
                                        depressed 
                                        class="mr-7" 
                                        @click="assignOrder(offer.order_id, offer.owner.id, offer.id)"
                                    >
                                        <span class="text-capitalize font-weight-bold" :id="`assign-text-${offer.id}`">assign </span>
                                    </v-btn>
                                    <!-- End of button for assigning the job -->

                                    <!-- Button for assigning the job -->
                                    <v-btn  
                                        v-if="offer.has_accepted_order && order.assignees.includes(offer.owner.id)"
                                        dark 
                                        x-small 
                                        color="error darken-2" 
                                        depressed 
                                        class="mr-7" 
                                        text
                                    >
                                        <span class="text-capitalize font-weight-bold">assigned </span>
                                        <v-icon x-small right color="error darken-2">mdi-account-check</v-icon>
                                    </v-btn>
                                    <!-- End of button for assigning the job -->

                                    
                                </v-card-actions>
                                <v-divider class="mx-5 cyan mb-n3 mt-n1"></v-divider>
                            </v-col>
                        </v-row>
                        <!-- End of row for showing the offers -->
                    </template>
                </template>
                
                <template v-if="showAssignee">
                    <template>
                        <NotFound
                            v-if="!assignees.length"
                            :message="notFoundMessage"
                        />
                        <!-- Row for showing the assignees -->
                        <v-row class="mt-n2" v-for="user in assignees" :key="user.id">
                            <v-col md=12>
                                <!-- cARD Title -->
                                <v-card-title>
                                    <v-row class="mt-n2 ml-n4">
                                        <!-- Menu containing the profile picture of the person who has placed the bid -->
                                        <v-menu open-on-hover offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn dark v-bind="attrs" v-on="on" text>
                                                    <v-avatar size="30" class="mr-3 ml-3">
                                                        <img :src="user.profile_pic || '/images/unknown1.png'">
                                                    </v-avatar>
                                                    <span class="text-capitalize font-weight-bold text-caption teal--text mb-n1">
                                                        {{ user.full_name }}
                                                    </span>
                                                </v-btn>
                                            </template>

                                            <v-list dense shaped v-if="user.profile_pic">
                                            <v-list-item color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                <v-avatar class="profile ml-3" color="grey" size="124">
                                                        <v-img :src="user.profile_pic"></v-img>
                                                    </v-avatar>
                                                </v-list-item-title>
                                            </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <!-- End of menu -->
                                                        
                                        <v-spacer></v-spacer>

                                        <div class="mr-5 mt-n1">
                                            <v-row class="mt-n2">
                                                <v-col class="mr-5">
                                                    <span class="text-caption font-weight-bold teal--text">Rated:</span>
                                                </v-col>
                                                <v-col class="">
                                                    <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull"
                                                        half-increments
                                                        dense
                                                        small
                                                        :value="user.rating"
                                                        class="ml-n10"
                                                        readonly
                                                    ></v-rating>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-row>
                                </v-card-title>
                                <!-- End of card title -->
                            
                                <!-- Cover letter of the professional -->
                                <v-card-text>
                                    <v-row class="mt-n7">
                                        <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                            {{ show_first_fifty(user.about) }}
                                        <span id="dots-1" :style="user.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="user.show_more ? 'display: inline;' : 'display: none;'">
                                            {{ show_hidden_description(user.about) }}
                                        </span>
                                        <!-- Button for showing more description -->
                                        <v-btn icon @click="() => $store.commit('order/TOGGLE_USER_SHOW_MORE', user.id)" x-small>
                                            <v-icon color="info" x-small> 
                                                {{ user.show_more ? 'mdi-eye-off' : 'mdi-eye' }} 
                                            </v-icon>
                                        </v-btn>
                                        <!-- End of button for wshoing the description -->
                                        </p>
                                    </v-row>
                                </v-card-text>
                                <!-- End of the professional cover letter -->

                                <v-card-actions class="mt-n10 mb-1">
                                    <!-- Displays the asking amount -->
                                    <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text"> 
                                        <span class="mr-2 teal--text">Asking Amount:</span> Kes {{ user.asking_amount }}
                                    </span>
                                    <!-- End of displaying the asingn amount -->
                                    <v-spacer></v-spacer>

                                    <!-- Buttons for viewing the profile -->
                                    <v-btn  
                                        dark 
                                        x-small 
                                        color="teal" 
                                        depressed 
                                        text 
                                        class="mr-4"
                                        @click="viewOwnerProfile(user.id)"
                                    >
                                        <span class="text-capitalize font-weight-bold">view profile</span>
                                    </v-btn>
                                    <!-- End of button for viewing the profile -->
                                    
                                    <!-- Button for approving the payment -->
                                    <v-btn  
                                        v-if="showAssignee"
                                        dark 
                                        x-small 
                                        color="success lighten-1" 
                                        depressed 
                                        class="mr-3" 
                                    >
                                        <span class="text-capitalize font-weight-bold" >appr payment </span>
                                    </v-btn>
                                    <!-- End of button for approving the payment -->

                                    <!-- <v-btn  dark x-small color="error lighten-1" depressed class="mr-3" @click="reject_offer(offer.id)">
                                        <span class="text-capitalize font-weight-bold">reject</span>
                                    </v-btn> -->
                                </v-card-actions>
                                <v-divider class="mx-5 cyan mb-n3 mt-n1"></v-divider>
                            </v-col>
                        </v-row>
                        <!-- End of rows for showing assignees -->
                    </template>
                </template>
            </v-card>
        </v-col>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2" timeout="5000">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
    <!-- End of the practitioner card -->
    
</template>

<script>
// import map state
import { mapState } from 'vuex'
// import not found
import NotFound from "~/components/NotFound"
// component definition
export default {
    // name
    name: "OrderOfferCard",
    // components
    components: {
        NotFound
    },
    // props
    props: {
        offers: Array,
        assignees: Array
    },
    // computed
    computed: {
        ...mapState('order', [
            'order',
            'showing'
        ])
    },
    //data
    data: () => ({
        // not found message
        notFoundMessage: 'You have no pending offers for your order yet.',
        // show assignee
        showAssignee: false,
        // error
        snackbar: false,
        // message
        message: '',
        // snackbar color
        color: 'success lighten-1',
        // loading
        loading: false,
        // reject loading
        rejectLoading: false,
        // loader
        loader: null,
        // reject loader
        rejectLoader: null
    }),
    // methods
    methods: {
        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for viewing profile
        viewOwnerProfile(owner_id) {
            // direct user to owner of the profile
            this.$emit('view-profile', owner_id)
        },

        // function for showing offer status
        showOfferStatus(offer) {
            if (offer.has_accepted_order) {
                return "Accepted" 
            } else if (offer.order_accepting_pending) {
                return "Pending"
            } else if (offer.has_rejected_order){
                return "Declined"
            }
        },

        // function for handling errors
        handleGetError(err) {
            // check if the error has a response
            if (err.response) {
                // set the message
                this.message = err.response.data.errors.details
            } else {
                this.message = 'Sorry. There was a problem completing your request. Try again later.'
            }
            // set the color
            this.color = "error lighten-1"
            // set the snackbar to true
            this.snackbar = true
        },

        // handle normal error
        handleError(err, element, action) {
            console.log(err)
            // check if the error has a response
            if (err.response) {
                // set the message
                this.message = err.response.data.errors.details
            } else {
                this.message = 'Sorry. There was a problem completing your request. Try again later.'
            }
            // set the color
            this.color = "error lighten-1"
            // set the text to the original text
            if (action == "accepting") {
                element.innerHTML = 'accept'
            } else if (action == "rejeting") {
                element.innerHTML = 'reject'
            } else {
                element.innerHTML = 'assign'
            }
            // set the snackbar to true
            this.snackbar = true
        },

        // function for accepting the offer
        async acceptOffer(offerId) {
            // get the accepte text
            let text = document.getElementById(`accept-text-${offerId}`)
            // set the text to accepting
            text.innerHTML = 'accepting...'
            // cancel the offer
            this.$axios.post(`/order/${this.order.id}/offer/${offerId}/accept`)
                .then(( { data }) => {
                    // remove the offer from the list of offers
                    this.$store.commit('order/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // set the text to accepte
                    text.innerHTML = 'accept'
                })
                .catch(err => this.handleError(err, text, "accepting"))
        },

        // function for rejecting an offer
        async rejectOffer(offerId) {
           // get the accepte text
            let text = document.getElementById(`reject-text-${offerId}`)
            // set the text to accepting
            text.innerHTML = 'rejecting...'
            // reject the offer
            await this.$axios.post(`/order/${this.order.id}/offer/${offerId}/reject`)
                .then(( { data }) => {
                    // remove the offer from the list of offers
                    this.$store.commit('order/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.message
                    // set the snackbar
                    this.snackbar = true
                    // return the text to reject
                    text.innerHTML = 'rejected'
                })
                // handle the error
                .catch(err => this.handleError(err, text, "rejecting"))
        },

        // function for getting penidng offers
        async getPendingOffers() {
            await this.$store.dispatch('order/getOrderOffers',{filter: "pending"})
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('order/SET_SHOWING', "pending")
                    this.notFoundMessage = 'You have no pending offers for your order yet.'
                    // set the show assignees to false
                    this.showAssignee = false
                })
                // handle the error
                .catch(err => this.handleGetError(err))
        },

        // functioin for getting accepted offers
        async getAcceptedOffers() {
            await this.$store.dispatch('order/getOrderOffers',{filter: "accepted"})
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('order/SET_SHOWING', "accepted")
                    this.notFoundMessage = 'You have no accepted offers for your order yet.'
                    // set the show assignees to false
                    this.showAssignee = false
                })
                // handle the error
                .catch(err => this.handleGetError(err))
        },

        // function for getting the assignees
        async getOrderAssignees() {
            await this.$store.dispatch('order/getOrderAssignees')
                .then(() => {
                    // set the showing to pending
                    this.$store.commit('order/SET_SHOWING', "assignees")
                    this.notFoundMessage = 'Your order does not have any assignees yet.'
                    // set the show assignees to true
                    this.showAssignee = true
                })
                // handle the error
                .catch(err => this.handleGetError(err))
        },

        // function for assigning the order
        async assignOrder(orderId, offerOwnerId, offerId) {
            // get tthe assign text
            let text = document.getElementById(`assign-text-${offerId}`)
            // set the text to assigning
            text.innerHTML = 'assigning...'
            // assign the orde
            await this.$axios.post(`/order/${orderId}/assign/${offerOwnerId}`)
                .then(({ data}) => {
                    // remove the offer from the list of offers
                    this.$store.commit('order/SET_ASSIGNED', {offerId: offerId, userId: offerOwnerId})
                    // set the message
                    this.message = data.data.message
                    // set the snackbar to true
                    this.snackbar = true
                    // set the text to assigned
                    text.innerHTML = 'assigned'
                })
                .catch(err => this.handleError(err, text, "assigning"))
        }
    }
}
</script>