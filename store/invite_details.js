import { filter } from "lodash"

/**
 * Manages a single invite details
 */
export const state = () => ({
    // invite
    invite: {},
    // offers
    offers: [],
    // nextCursor
    pendingNextCursor: '',
    // accepted next cursor
    acceptedNextCursor: '',
    // showing pending
    showingPending: true
})

// mutations
export const mutations = {
    // mutation for setting the invite
    SET_INVITE: (state, payload) => {
        // set the invite
        state.invite = payload.invite
        //console.log('State: ', state.invite)
    },

    // toggle invite read more
    TOGGLE_INVITE_SHOW_MORE: (state) => {
        state.invite.show_more = !state.invite.show_more
    },

    // toggle offer read more
    TOGGLE_OFFER_SHOW_MORE: (state, offerId) => {
        // find offer with the the given id
        let offer = state.offers.find(offer => offer.id === offerId)
        // toggle the show more
        offer.owner.show_more = !offer.owner.show_more
    },

    // set offers
    SET_OFFERS: (state, { offers, filter, nextCursor}) => {
        // set the state
        state.offers = offers
        // set the showing
        //filter == "pending" ? state.showingPending = true : state.showingPending = false
        // set the next cursor
        filter == "pending" ? state.pendingNextCursor = nextCursor : state.acceptedNextCursor = nextCursor
    },

    // ADD OFFERS
    ADD_OFFERS: (state, payload) => {
        state.offers.concat(...payload.offers)
        // set the next cursor
        payload.filter == "pending" ? state.pendingNextCursor = payload.nextCursor : state.acceptedNextCursor = payload.nextCursor
    },

    // function for removing an offer
    REMOVE_OFFER: (state, offerId) => {
        // filter the results
        state.offers = state.offers.filter(offer => offer.id != offerId)
    }, 

    // function for checking if required contractors has being met
    REQUIRED_CONTRACTORS_REACHED: (state) => {
        // check if the required contractors is reached after adding one
        if (state.invite.required_collaborators + 1 == state.invite.required_collaborators) {
            // set the is assigned to true
            state.invite.is_assigned = true
        }
        // return 
        return
    },
    // SET SHOWING PENDING
    SET_SHOWING_PENDING: (state) => state.showingPending = true,
    // set not showing pending
    SET_NOT_SHOWING_PENDING: (state) => state.showingPending = false

}

export const getters = {
    invite: (state) => state.invite
}

// actions
export const actions = {
    // action for getting the invite
    async getInvite({ commit, dispatch }, inviteId) {
        // get the invite
        await this.$axios.get(`/invites/${inviteId}`)
            .then(({ data }) => {
                let invite = data.data
                // commit the data
                commit('SET_INVITE', {invite: invite})
                // fetch the offers for the invite depending on whether the invite is assigned or nor
                dispatch('getOffers', { filter: "pending"})
                
            })
    },

    // get offers
    async getOffers({ commit, state }, { filter }) {
        // check if the invites is assigned
        if (state.invite.is_assigned && filter == "pending") {
            // set the offers to an empty list
            commit('SET_OFFERS', {offers: [], pendingNextCursor: ''})
        } else {
            // get the offers
            await this.$axios.get(`/invites/${state.invite.id}/offers`, {
                params: {
                    filter: filter,
                    next_cursor: "false"
                }
            })
            .then(({ data }) => {
                // set the data
                commit('SET_OFFERS', {offers: data.data.offers, nextCursor: data.data.next_cursor, filter: filter})
            })
        }
        
    }
}