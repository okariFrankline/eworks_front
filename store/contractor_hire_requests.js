/**
 * Manages the direct hires for a contractor
 */
export const state = () => ({
    // orders
    requests: [],
    // is client message
    isClientMessage: '',
    // is client message
    showClientDialog: false
})

// mutations
export const mutations = {
    // set orders
    SET_REQUESTS: (state, payload) => {
        // set the orders
        state.requests = payload.requests
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

    // toggle how mroe
    TOGGLE_SHOW_MORE: (state, requestId) => {
        // find the order
        let request = state.requests.find(request => request.id == requestId)
        // toggle the show more
        request.order.show_more = !request.order.show_more
    },

    // remove the request id
    REMOVE_REQUEST: (state, requestId) => {
        // reove the request
        state.requests = state.requests.filter(request => request.id !== requestId)
    },

    // function for accepting request
    SET_ACCEPTED: (state, requestId) => {
        // get the request
        let request = state.requests.find(request => request.id == requestId)
        // set accepted
        request.is_accepted = true
        //set the pending to false
        request.is_pending = false
    }
}

// actions
export const actions = {
    // function for getting the orders
    async getRequests({ commit, state}, workerId) {
        // get the data
        await this.$axios.get('/direct/hire/requests')
            .then(( { data }) => {
                // commit the requests
                commit('SET_REQUESTS', {requests: data.data.requests})
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