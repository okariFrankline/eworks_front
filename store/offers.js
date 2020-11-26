/**
 * Manages offers made by a given user
 */
export const state = () => ({
    // orders
    offers: [],
    // next cursor
    pendingNextCursor: null,
    // cursor for the accepted
    acceptedNextCursor: null,
    // rejected next cursor
    rejectedNextCursor: null,
    // is client message
    isClientMessage: '',
    // is client message
    showClientDialog: false,
    //showing
    showing: 'pending'
})

// mutations
export const mutations = {
    // function for setting the offers
    SET_OFFERS: (state, payload) => {
        // set the cursor
        setNextCursor(state, payload.nextCursor, payload.filter)
        // set the offers
        state.offers = payload.offers
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

    // add to offers
    ADD_OFFERS: (state, payload) => {
        // set the offers
        state.offers.push(...payload.offers)
        // set the cursor
        setNextCursor(state, payload.nextCursor, payload.filter)
    },

    // remove the offer
    REMOVE_OFFER: (state, offerId) => {
        // filter the offers
        state.offers = state.offers.filter(offer => offer.id !== offerId)
        //Vue.set(state, 'offers', offers)
    },

    // toggle show more
    TOGGLE_SHOW_MORE: (state, offerId) => {
        // find the order
        let offer = state.offers.find(offer => offer.id == offerId)
        // set the show more
        offer.order.show_more = !offer.order.show_more
    },

    // accept offer
    ACCEPT_OFFER: (state, offerId) => {
        // get the offer
        let offer = state.offers.find(offer => offer.id == offerId)
        // set the has accepted offer to true
        offer.has_accepted_order = true
    },

    // set showing
    SET_SHOWING: (state, value) => state.showing = value
}


// actions 
export const actions = {
    // action for getting the offers
    async getOffers({ commit, state }, payload) {
        // get the next cursor
        let nextCursor = getNextCursor(state, payload.filter)
        console.log("Next Cursor: ", nextCursor)
        // get the offers made by the user
        await this.$axios.get('/user/offers', {
            params: {
                next_cursor: nextCursor,
                filter: payload.filter
            }
        })
        .then(({ data}) => {
            // add the offers to the already existing offers
            commit('SET_OFFERS', {offers: data.data.offers, nextCursor: data.data.next_cursor, filter: payload.filter})
        })
        .catch(error => {
            // check if the error has a response
            if (error.response && error.response.status == 403) {
                // set messamge
                commit('SET_IS_CLIENT', {message: error.response.data.errors.details})
            }
        })
    },

    // function for getting more offers
    async getMoreOffers ({ commit, state}, { filter }) {
        // get the next cursor
        let nextCursor = getNextCursor(state, filter)
        // check if the next cursor is available
        if (nextCursor == "false") return
        // get the offers made by the user
        await this.$axios.get('/user/offers', {
            params: {
                next_cursor: nextCursor,
                filter: payload.filter
            }
        })
        .then(({ data}) => {
            // set thte offers afreah if the cursor is null
            commit('ADD_OFFERS', {offers: data.data.offers, nextCursor: data.data.next_cursor, filter: payload.filter})

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

// get next cursor
const getNextCursor = (state, filter) => {
    // get the cursor
    let cursor
    // check the filter
    if (filter == "pending") {
        // set the cursor to pending
        cursor = state.pendingNextCursor
    } else if (filter == "accepted") {

        cursor = state.acceptedNextCursor
    } else if (filter == "rejected") {

        cursor = state.rejectedNextCursor
    }
    // check if the cursor is avaiilable and return the value
    return cursor ? cursor : "false"
}

// function for setting the next cursor
const setNextCursor = (state, cursor, filter) => {
    // check the filter
    if (filter == "pending") {
        return state.pendingNextCursor = cursor
    } else if (filter == "accepted") {
        return state.acceptedNextCursor = cursor
    } else if (filter == "rejected") {
        return state.rejectedNextCursor = cursor
    }
}