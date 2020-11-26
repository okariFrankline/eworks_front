/**
 * Manages a single direct hire request
 */
export const state = () => ({
    // order
    order: null,
    // contractor
    contractor: null,
    // request
    request: null
})

// mutations
export const mutations = {
    // set the state
    SET_STATE: (state, payload) =>  {
        // set the order
        state.order = payload.order
        // set the contractor
        state.contractor = payload.contractor
        //set the request
        state.request = payload.request
    },

    // toggel contractor more
    TOGGLE_CONTRACTOR_SHOW_MORE: (state) => {
        // toggle the show more
        state.contractor.show_more = !state.contractor.show_more
    },

    // toggel order more
    TOGGLE_ORDER_SHOW_MORE: (state) => {
        // toggle the show more
        state.order.show_more = !state.order.show_more
    },

    // function for cancelling the request
    CANCEL_REQUEST: (state) => {
        // se the reque's is_cancelled to true
        state.request.is_cancelled = true
        // set the is pending to false
        state.request.is_pending = false
    }
}

// actions
export const actions = {
    // action for getting the request
    async getRequest({ commit }, inviteId) {
        // get the invite
        await this.$axios.get(`/direct/hire/${inviteId}`)
            .then(({ data }) => {
                // set the order and contractor
                commit('SET_STATE', {order: data.data.order, contractor: data.data.contractor, request: data.data.request})
            })
    }
}