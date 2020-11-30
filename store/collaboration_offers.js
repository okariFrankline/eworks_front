/**
 * Manges the current user's collaboration invite offers
 */
export const state = () => ({
    // invites
    inviteOffers: [],
    // is client message
    isClientMessage: '',
    // is client message
    showClientDialog: false,
    // showing
    showing: 'pending'
})

// mutations
export const mutations = {
    // sets the invites
    SET_INVITE_OFFERS: (state, payload) => {
        // set the offers
        state.inviteOffers = payload.inviteOffers
        // check the status of the offers
    },

    // mutation for setting client
    SET_IS_CLIENT: (state, payload) => {
        // set the is client message
        state.isClientMessage = payload.message
        // set the show is client
        state.showClientDialog = true
    },

    // hide dialog
    HIDE_DIALOG: (state) => {
        // set the state to false
        state.showClientDialog = false
    },

    // function for reading more
    TOGGLE_SHOW_MORE: (state, offerId) => {
        // find the invite
        let offer = state.inviteOffers.find(offer => offer.id == offerId)
        // toggle the show mroe
        offer.invite.show_more = !offer.invite.show_more
    },

    // remove the offer
    REMOVE_OFFER: (state, offerId) => {
        // filter the offers
        state.inviteOffers = state.inviteOffers.filter(offer => offer.id !== offerId)
        //Vue.set(state, 'offers', offers)
    },

    // set the shwoing
    SET_SHOWING: (state, value) => state.showing = value
}

//actions
export const actions = {
    // gets the offers
    async getInviteOffers ({ commit }, payload) {
        // get the offers made by the user
        await this.$axios.get('/invites/offers', {
            params: {
                filter: payload.filter
            }
        })
        .then(({ data}) => {
                console.log(data.data.offers)
                // ste the invites
                commit('SET_INVITE_OFFERS', {inviteOffers: data.data.offers})
        })
        .catch(error => {
            // check if the error has a response
            if (error.response && error.response.status == 403) {
                // set messamge
                commit('SET_IS_CLIENT', {message: error.response.data.errors.details})
            }
        })
    }
}