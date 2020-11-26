export const state = () => ({
    // orders
    orders: [],
    // next cursor
    nextCursor: null,
})

// export mutations
export const mutations = {
    // action for setting the unassigned Orders
    SET_ORDERS: (state, payload) => {
        // set the next cursor
        state.nextCursor = payload.nextCursor
        // set the orders
        state.orders = payload.orders
    },
    // add to the added orders
    ADD_ORDERS: (state, payload) => {
        // set the new next cursor
        state.nextCursor = payload.nextCursor
        // add to the orders
        state.orders.push(...payload.orders)
    },
    // toggle show more of an order
    TOGGLE_SHOW_MORE: (state, payload) => {
        // get the order with the given id
        let order = state.orders.find(order => order.id == payload.orderId)
        // set the show more to false
        order.show_more = !order.show_more
    },

    // ADD offer owner
    ADD_OFFER_OWNER: (state, { orderId, userId }) => {
        // find the offer
        let order = state.orders.find(order => order.id == orderId)
        // add the user id to the list of offer owners
        order.offer_owners.push(userId)
    },
}

// actions
export const actions = {
    // action for adding a new unassigned order
    async getUnAssignedOrders ({commit, state}) {
        // get the orders
        await this.$axios.get('/orders/unassigned', {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : "false"
            }
        })
        // handle the success
        .then(( { data }) => {
            // set the orders
            commit('SET_ORDERS', {orders: data.data.orders, nextCursor: data.data.next_cursor})
        })
    },

    // action for getting more orders
    async getMoreUnassignedOrders ({ commit, state}) {
        // check if the next cursor is null
        if (!state.nextCursor) return
        // get the orders
        await this.$axios.get('/orders/unassigned', {
            params: {
                next_cursor: state.nextCursor
            }
        })
        // handle the success
        .then(( { data }) => {
                // set the orders
               commit('ADD_ORDERS', {orders: data.data.orders, nextCursor: data.data.next_cursor})
        })
    }
}