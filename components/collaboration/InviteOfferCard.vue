<template>
    
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="530" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small left color="teal">mdi-offer</v-icon>
                        <span class="text-caption font-weight-bold teal--text">
                            Submitted Invite Offers
                        </span>

                        <v-spacer></v-spacer>
                        <v-btn text x-small color="warning" outlined class="mr-3" @click="getPendingOffers">
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                Pending
                            </span>
                            <v-icon x-small right v-if="showingPending">mdi-check-bold</v-icon>
                        </v-btn>
                        <v-btn text x-small color="success" outlined @click="getAcceptedOffers">
                            <span class="text-caption font-weight-bold success--text text-capitalize">
                                Accepted
                            </span>
                            <v-icon x-small right v-if="!showingPending">mdi-check-bold</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-title>
                <v-divider class="mt-1"></v-divider>

                <template>
                    <!-- No orders found -->
                        <NotFound 
                            :message="inviteIsAssigned && showingPending ? 'No offers to see as invite is already assigned.' : notFoundMessage"
                            v-if="!offers.length"
                            :color="inviteIsAssigned ? 'success' : 'error'"
                        />
                        <!-- End of orders not found -->

                    <v-row class="mt-n2" v-for="offer in offers" :key="offer.id">
                        <v-col md=12>
                            <!-- cARD Title -->
                            <v-card-title>
                                <v-row class="mt-n2 ml-n4">
                                    <!-- Menu containing the profile picture of the person who has placed the bid -->
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" class="" text>
                                                <v-avatar class="mr-3" size="30">
                                                    <img :src="offer.owner.profile_pic ? offer.owner.profile_pic : '/images/unknown1.png'">
                                                </v-avatar>
                                                <span class="text-capitalize font-weight-bold text-caption teal--text mb-n1">
                                                    {{ offer.owner.full_name }}
                                                </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped v-if="offer.owner.profile_pic">
                                        <v-list-item color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                            <v-avatar class="profile ml-3 mb-2" color="grey" size="124">
                                                    <v-img :src="offer.owner.profile_pic"></v-img>
                                                </v-avatar>
                                            </v-list-item-title>
                                        </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <!-- End of menu -->
                                                    
                                    <v-spacer></v-spacer>

                                    <div class="mr-7 mt-n1">
                                        <v-row class="mt-n2">
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

                                    <!-- <div class="mr-3 mt-n2" v-if="offer.is_accepted">
                                        <span class="text-capitalize font-weight-bold error-text">
                                            
                                        </span>
                                    </div> -->
                                </v-row>
                            </v-card-title>
                            <!-- End of card title -->
                        
                            <!-- Cover letter of the professional -->
                            <v-card-text>
                                <!-- Row for the skills -->
                                <v-row class="mt-n4 ml-1"> 
                                    <v-chip small outlined color="cyan" class="ml-2 mt-1" v-for="(skill, index) in offer.owner.skills" :key="index">
                                        <span class="warning--text">
                                            {{ skill }}
                                        </span>
                                    </v-chip>
                                </v-row>
                                <!-- End of row for skills -->
                                <v-row class="mt-n3">
                                    <p class="text-caption pa-5 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty(offer.owner.about )}}
                                    <span id="dots-1" :style="offer.owner.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="offer.owner.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(offer.owner.about )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="() => $store.commit('invite_details/TOGGLE_OFFER_SHOW_MORE', offer.id)" x-small>
                                        <v-icon color="info" x-small> 
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
                                <v-btn  dark x-small color="teal" depressed text @click="viewOfferOwnerProfile(offer.owner.id)">
                                    <span class="text-capitalize font-weight-bold">view profile</span>
                                </v-btn>
                                <!-- End of button for viewing the profile -->
                                
                                <!-- Buttng for accepting the offer -->
                                <v-btn 
                                    v-if="!offer.is_accepted"
                                    x-small 
                                    color="cyan" 
                                    depressed dark 
                                    @click="acceptOffer(offer.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`accept-text-${offer.id}`">Accept</span>
                                </v-btn>
                                <!-- End of button for accepting the offer -->

                                <v-btn  
                                    v-if="!offer.is_accepted"
                                    dark 
                                    x-small 
                                    color="error lighten-1" 
                                    depressed class="mr-5" 
                                    @click="rejectOffer(offer.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`reject-text-${offer.id}`">reject</span>
                                </v-btn>

                                <!-- Button for approving payment -->
                                <v-btn 
                                    x-small 
                                    color="success lighten-1" 
                                    dark 
                                    depressed 
                                    class="mr-5"
                                    v-if="offer.is_accepted"
                                >         
                                    <span class="text-capitalize font-weight-bold">Appr. Payment</span>
                                </v-btn>
                                <!-- End of button for approving payment -->
                            </v-card-actions>
                            <v-divider class="mx-4 cyan mb-n3"></v-divider>
                        </v-col>
                    </v-row>
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
// import not found
import NotFound from "~/components/NotFound"
// import map state
import { mapState } from 'vuex'
// component defintion
export default {
    // name
    name: "OrderOfferCard",
    // props
    props: {
        offers: Array,
        inviteIsAssigned: Boolean
    },
    // computed
    computed: {
        ...mapState('invite_details', [
            'showingPending'
        ])
    },
    //data
    data: () => ({
        // message
        notFoundMessage: 'Collaboration invite has no pending offers at the moment.',
        // message
        message: '',
        // color
        color: 'success lighten-1',
        // snackbar
        snackbar: false
    }),
    // methods
    methods: {
        // functions for getting the count of offers
        get_offer_count() {
            return this.offers.length
        },

        // function for getting the accepted offers count
        get_accepted_offers_count() {
            return this.accepted_offers.length
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for rejecting an offer
        reject_offer(offer_id) {
            this.$emit('reject-offer', offer_id)
        },

        // function for viewing profile
        viewOfferOwnerProfile(ownerId) {
            // direct user to owner of the profile
            this.$router.push({
                path: `/contractors/${ownerId}`
            })
        },

        // handle error
        handleError(error, element, action) {
            // check if the error has a response
            if (error.response) {
                // set the message
                this.message = error.response.data.errors.details
            } else if (error.request){
                // set the message
                this.message = 'Failed. A network error occured. Please check your connection and try again'
            } else {
                // set the message
                this.message = 'Failed. There was a proble completing your request. Please try again later.'
            }
            // set the color
            this.color = 'error lighten-1'
            // set the snackbar to true
            this.snackbar = true
            // set the text to accept
            action == "accepting" ? element.innerHTML = 'accept' : element.innerHTML = "reject"
        },

        // function for getting the offers
        async getPendingOffers () {
            // dispatch action
            await this.$store.dispatch('invite_details/getOffers', {filter: 'pending'})
                .then(() => {
                    // commit to store to set showing pending
                    this.$store.commit('invite_details/SET_SHOWING_PENDING')
                    // set the not found message
                    this.notFoundMessage = 'Collaboration invite has no pending offers at the moment.'
                })
        },

        // get accepted
        async getAcceptedOffers () {
            
            // dispatch action
            await this.$store.dispatch('invite_details/getOffers', {filter: 'accepted'})
                .then(() => {
                    this.$store.commit('invite_details/SET_NOT_SHOWING_PENDING')
                    // set the not found message
                    this.notFoundMessage = 'Collaboration invite has no assigned collaborators at the moment.'

                })
        },

        // function for accepting an offer
        async acceptOffer(offerId) {
            // get the text for accepting offer
            let text = document.getElementById(`accept-text-${offerId}`)
            // set the text to accepting
            text.innerHTML = 'accepting...'
            // accept the offer
            await this.$axios.post(`/invites/${this.$route.params.id}/offer/${offerId}/accept`)
                .then(({ data }) => {
                    console.log(data)
                    // check of the required collaborators has been reached
                    this.$store.commit('invite_details/REQUIRED_CONTRACTORS_REACHED')
                    // remove the offer from thie list of pending offers
                    this.$store.commit('invite_details/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.details
                    // set the snackbar to true
                    this.snackbar = true
                    //return text to accept
                    text.innerHTML = 'accept'
                })
                // handle error
                .catch(error => this.handleError(error, text, "accepting"))
        },

        // function for rejecting an offer
        async rejectOffer(offerId) {
            // get the text for accepting offer
            let text = document.getElementById(`reject-text-${offerId}`)
            // set the text to accepting
            text.innerHTML = 'rejecting...'
            // reject the offer
            await this.$axios.post(`/invites/${this.$route.params.id}/offer/${offerId}/reject`)
                .then(({ data }) => {
                    // remove the offer from thie list of pending offers
                    this.$store.commit('invite_details/REMOVE_OFFER', offerId)
                    // set the message
                    this.message = data.data.details
                    // set the color
                    this.color = 'success lighten-1'
                    // set the snackbar to true
                    this.snackbar = true
                    //return text to accept
                    text.innerHTML = 'reject'
                })
                // handle error
                .catch(error => this.handleError(error, text, "rejecting"))
        },
    }
}
</script>