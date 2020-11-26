/**
 * Manages the orders assigned to cirrently logged in user
 * 
 */
export const state = () => ({
    // ORDERS
    orders: [],
    unPaidCount: 0,
    paidCount: 0,
    inProgressCount: 0,
    isClientMessage: '',
    showClientDialog: false,
    showing: 'in progress'
})

// mutations
export const mutations = {
    // set orders
    SET_ORDERS: (state, payload) => {
        // set the orders
        state.orders = payload.orders
        // set paid count
        state.unPaidCount = payload.unPaidCount
        // set paid count
        state.paidCount = payload.paidCount
        // set in progress count
        state.inProgressCount = payload.inProgressCount
    },

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

    // remove the order
    REMOVE_IN_PROGRESS_ORDER: (state, payload) => {
        // filter to remove the order
        state.orders = state.orders.filter(order => order.id !== payload.orderId)
        // set the count
        state.inProgressCount = state.inProgressCount - 1
        // set the unpadi count
        state.unPaidCount = state.unPaidCount + 1
    },

    // TOGGLE ASSIGNED MORE
    TOGGLE_SHOW_MORE: (state, orderId) => {
        // find the order
        let order = state.orders.find(order => order.id == orderId)
        // set the order show more to false
        order.show_more = !order.show_more
    },

    // set showing
    SET_SHOWING: (state, value) => state.showing = value
}

// getters 
export const getters = {
    // unassigned orders
    orders: (state) => state.orders
}

// actions
export const actions = {
    // action for getting the orders
    async getMyAssignedOrders({ commit }, payload) {
        // get the orders
        await this.$axios.get('/user/orders/assigned', {
            params: {
                filter: payload.filter
            }
        })
        .then(( { data }) => {
            // set the orders
            commit('SET_ORDERS', {
                orders: data.data.orders, 
                // unpaid
                unPaidCount: data.data.un_paid_count, 
                // in progress count
                inProgressCount: data.data.in_progress_count, 
                // paid count
                paidCount: data.data.paid_count
            })
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