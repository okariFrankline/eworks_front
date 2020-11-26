/**
 * Manages the current user's direct hire request
 */
export const state = () => ({
    // orders o assign
    orders: [],
    // next cursor
    nextCursor: ''
})

// mutations
export const mutations = {
    // toggle show more
    TOGGLE_SHOW_MORE: (state, orderId) => {
        // find the order with the given id
        let order = state.orders.find(order => order.id == orderId)
        // set the order's show more to the opposite of what it was
        order.show_more = !order.show_more
    },

    // mutation for setting orders
    SET_ORDERS: (state, payload) => {
        //set the orders
        state.orders = payload.orders
        //set teh next cursor
        state.nextCursor = payload.nextCursor ? payload.nextCursor : ''
    },

    // function for adding the orders
    ADD_ORDERS: (state, payload) => {
        //set teh next cursor
        state.nextCursor = payload.nextCursor
        // add the orders to the list of already available orders
        state.orders.push(...payload.orders)
    },

    // function for resetting the store
    RESET_STORE: (state) => {
        // set the order to an empty list
        state.order = {}
        //set the next cursor to null
        state.nextCursor = null
    }
}

// actions
export const actions = {
    // action for getting the orders
    async getMyPostedOrders({ state, commit }) {
        // get the orders
        await this.$axios.get('/user/orders/direct/hires', {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : 'false'
            }
        })
        .then(( { data }) => {
            // set the orders
            state.nextCursor == ''
                // add the orders to the arders already presetn
                ? commit('SET_ORDERS', {orders: data.data.orders, nextCursor: data.data.next_Cursor})
                // set the orders afresh
                : commit('ADD_ORDERS', {orders: data.data.orders, nextCursor: data.data.next_Cursor})
        })
    }
}