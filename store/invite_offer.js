/**
 *  Manages a collaborations invite's offers
 */
export const state = () => ({
    // invite
    invite: null,
    // offers
    offers: [],
    // next cursor
    nextCursor: ''
})

// mutations
export const mutations = {
    // set mutations
    SET_INVITE: (state, payload) => state.invite = payload.invite,
    // set offers
    SET_OFFERS: (state, payload) => {
        // set the offers
        state.offers = payload.offers
        // set the next cursor
        state.nextCursor = payload.nextCursor
    },
    // toggle more
    TOGGLE_SHOW_MORE: (state, offerId) => {
        // get the offer
        let offer = state.offers.find(offer => offer.id == offerId)
        // toggle the show more
        offer.show_more = !offer.show_more
    }
}

// actions
export const actions = {
    // function fore getting the invite with all the offers
    async getInvite({ commit }, inviteId) {
        // get invite
        await this.$axios.get(`/invites/${inviteId}`)
        .then(({ data }) => {
            console.log(data)
            // set the invite
            commit('SET_INVITE', {invite: data.data})
            // get the pending offers
            // this.$axios.get(`/invites/${inviteId}/offers/`, {
            //     params: {
            //         next_cursor: state.nextCursor ? state.nextCursor : "false",
            //         filter: "pending"
            //     }
            // })
            // .then(({ data }) => {
            //     console.log(data.data.offers)

            //     // set the invite
            //     //commit('SET_INVITE', {invite: inviteResult.data.data})
            //     // set the offers
            //     commit('SET_OFFERS', {offers: data.data.offers, nextCursor: data.data.next_cursor})
            // })

        })
    },

    // function for getting the accepted offers
    async getAcceptedInvites({ commit }, filter) {
        // get the pending offers
        this.axios.get(`/invites/${inviteId}/offers/`, {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : "false",
                filter: filter
            }
        })
        .then(result => {
            console.log(result.data.data.offers)
            // set the offers
            commit('SET_OFFERS', {offers: result.data.data.offers, nextCursor: result.data.data.next_cursor})
        })
    }
}