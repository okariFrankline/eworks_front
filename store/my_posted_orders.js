/**
 * Manages the orders posted by cirrently logged in user
 * 
 */
export const state = () => ({
    // ORDERS
    orders: [],
    // next cursor
    unassignedNextCursor: null,
    // cursor for the accepted
    inProgressNextCursor: null,
    // rejected next cursor
    completedNextCursor: null,
    // showing
    showing: 'unassigned'
})

// mutations
export const mutations = {
    // set orders
    SET_ORDERS: (state, payload) => {
        // set the next cursor
        setNextCursor(state, payload.nextCursor, payload.filter)
        // set the orders
        state.orders = payload.orders
    },

    // ADD ORDERS
    ADD_ORDERS: (state, payload) => {
        // set the next cursor
        state.nextCursor = payload.nextCursor
        // set the orders
        state.orders.concat(...payload.orders)
        // for each of the orders check the status
    },

    // remove the order
    REMOVE_ORDER: (state, payload) => {
        // filter to remove the order
        state.orders = state.orders.filter(order => order.id !== payload.orderId)
    },

    // function for toggling show
    TOGGLE_SHOW_MORE(state, orderId) {
        // find the order
        let order = state.orders.find(order => order.id == orderId)
        // set the order show more to false
        order.show_more = !order.show_more
    },

    // set showing
    SET_SHOWING: (state, value) => state.showing = value

}

// actions
export const actions = {
    // action for getting the orders
    async getMyPostedOrders({ state, commit }, payload) {
        // get the next cursor
        let nextCursor = getNextCursor(state, payload.filter)
        // get the orders
        await this.$axios.get('/user/orders/created', {
            params: {
                next_cursor: nextCursor,
                filter: payload.filter
            }
        })
        .then(( { data }) => {
            // set the orders
            nextCursor != "false" 
                // add the orders to the arders already presetn
                ? commit('ADD_ORDERS', {orders: data.data.orders, nextCursor: data.data.nextCursor, filter: payload.filter})
                // set the orders afresh
                : commit('SET_ORDERS', {orders: data.data.orders, nextCursor: data.data.nextCursor, filter: payload.filter})
        })
        .catch(err => {
            console.log(err)
        })
    },
}

// get next cursor
const getNextCursor = (state, filter) => {
    // get the cursor
    let cursor
    // check the filter
    if (filter == "unassigned") {
        cursor = state.unassignedNextCursor
    } else if (filter == "in_progress") {
        cursor = state.inProgressNextCursor
    } else {
        cursor = state.completedNextCursor
    }
    // check if the cursor is avaiilable and return the value
    return cursor ? cursor : "false"
}

// function for setting the next cursor
const setNextCursor = (state, filter, cursor) => {
    // check the filter
    if (filter == "unassigned") {
        return state.unassignedNextCursor = cursor
    } else if (filter == "in_progress") {
        return state.in_progressNextCursor = cursor
    } else {
        return state.completedNextCursor = cursor
    }
}