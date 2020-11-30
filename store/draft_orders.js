/**
 * Manages draft orders
 */
export const state = () => ({
    // orders
    orders: [],
    // next cursor
    nextCursor: null
})

// mutations
export const mutations = {
    // mutation for setting the order
    SET_ORDERS: (state, { orders, nextCursor }) => {
        state.orders = orders
        // set the next cursor
        state.nextCursor = nextCursor
    },

    // mutations for removing an order
    REMOVE_ORDER: (state, orderId) => {
        // get the order
        state.orders = state.orders.filter(order => order.id !== orderId)
    },

    // mutation for reading more for the order
    TOGGLE_READ_MORE: (state, orderId) => {
        // get the order
        let order = state.orders.find(order => order.id == orderId)
        // toggle the show more
        order.show_more = !order.show_more
    }
}

// actions
export const actions = {
    // action for getting the orders that are drafts
    async getDraftOrders({ commit, state }) {
        console.log(state)
        // get the orders
        await this.$axios.get('/user/orders/created', {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : "false",
                filter: "draft"
            }
        })
        .then(({ data }) => {
            // commit the orders
            commit('SET_ORDERS', {orders: data.data.orders, nextCursor: data.data.next_cursor})
        })
    }
}