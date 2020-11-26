/**
 * Manages the single order being viewed
 */
export const state = () => ({
    // order
    order: null,
    // pending next cursor
    pendingNextCursor: null,
    // accepted next cursor
    acceptedNextCursor: null,
    // offers
    offers: [],
    // assigness
    assignees: [],
    // showing
    showing: 'pending'
})

// mutations
export const mutations = {
    // set the order the first time the page is visited
    SET_ORDER: (state, payload) => {
        // get all the order offers
        state.order = payload.order
    },

    // function for setting the offers
    SET_OFFERS: (state, { offers, nextCursor, filter }) => {
        // set the offers
        state.offers = offers
        // set the next cursor
        filter == "pending" ? state.pendingNextCursor = nextCursor : state.acceptedNextCursor = nextCursor
    },

    // function for setting the assignees
    SET_ASSIGNEES: (state, payload) => {
        // set the offers
        state.assignees = payload.assignees
    },

    // function for adding to offers
    ADD_OFFERS: (state, { filter, offers, nextCursor}) =>  {
        // add the new offers to the current list of offers
        state.offers.push(...offers)
        // set the next cursor
        filter == "pending" ? state.pendingNextCursor = nextCursor : state.acceptedNextCursor = nextCursor
    }, 

    // function for removing an offer
    REMOVE_OFFER: (state, offerId) => {
        // return the list of offers for which the if is not equal to the offerId
        state.offers = state.offers.filter(offer => offer.id !== offerId)
    },

    // Ccancel order
    CANCEL_ORDER: (state) => {
        state.order.is_cancelled = true
    },

    // toggle show more
    TOGGLE_SHOW_MORE: (state) => {
        return state.order.show_more = !state.order.show_more
    },

    // toggle show more
    TOGGLE_USER_SHOW_MORE: (state, userId) => {
        // get the assignee
        let assignee = state.assignees.find(assignee => assignee.id == userId)
        // set the assignee show more
        assignee.show_more = !assignee.show_more
    },

    // toggle show more
    TOGGLE_OFFER_SHOW_MORE: (state, offerId) => {
        // get the assignee
        let offer = state.offers.find(offer => offer.id == offerId)
        // set the assignee show more
        offer.owner.show_more = !offer.owner.show_more
    },

    // set an offer as assigned
    SET_ASSGINED: (state, {offerId, userId }) =>  {
        // get the offer
        let offer = state.offers.find(offer => offer.id == offerId)
        // set the offer is assigned to true
        offer.is_assigned = true
        // add the user id to the list of assignees
        order.assignees.push(userId)
    },

    // set showing
    SET_SHOWING: (state, value) => {
        state.showing = value
    }
}


// actions
export const actions = {
    // action for getting the order
    async getOrder({ commit, dispatch }, orderId) {
        // get the order
        await this.$axios.get(`/order/${orderId}`)
            .then(({ data }) => {
                // get the order
                let order  = data.data
                // the order
                commit('SET_ORDER', {order: order})
                // dispatch get prder offers
                dispatch('getOrderOffers', { filter: "pending"})
            })
            
    },

    // action for getting the offers
    async getOrderOffers ({ commit, state }, { filter }) {
        // get the cursor
        let nextCursor = getNextCursor(state, filter)
        // get the offers that are pending
        await this.$axios.get(`/order/${state.order.id}/offers`, {
            params: {
                filter: filter,
                next_cursor: nextCursor
            }
        })
        // handle the results
        .then(({ data }) => {
            // set the offers
            commit('SET_OFFERS',{offers: data.data.offers, nextCursor: data.data.next_cursor, filter: filter})
        })
    },

    // function for getting more order offers
    async getMoreOrderOffers ({ commit, state}, { filter}) {
        // get the next cursor
        let nextCursor = getNextCursor(state, filter)
        // check the filter
        if (filter == "false") return
        // get the offers
        await this.$axios.get(`/order/${state.order.id}/offers`, {
            params: {
                filter: payload.filter,
                next_cursor: nextCursor
            }
        })
        // handle the results
        .then(({ data }) => {
                // add to the offers
                commit('ADD_OFFERS', {offers: data.data.offers, filter: payload.filter, nextCursor: data.data.next_cursor})
        })
    },

    // action for getting the assignees of the given order
    async getOrderAssignees ({ commit, state }) {
        // get the data
        await this.$axios.get(`/order/${state.order.id}/assignees`)
            .then(( { data }) => {
                // add the data to the state
                commit('SET_ASSIGNEES', {assignees: data.data.assignees})
            })
    }
}

// function for getting next cursor
const getNextCursor = (state, filter) => {
    // get the cursor
    let cursor = filter == "pending" ? state.pendingNextCursor : state.acceptedCursor
    // return the cursor
    return cursor ? cursor : "false"

}