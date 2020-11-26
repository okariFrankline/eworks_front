/**
 * Manages a new order being created
 */
export const state = () => ({
    // current order
    order: null,
    // error message
    errorMessage: '',
    // errorSnackbar
    showErrorSnackbar: false,
    // token
    token: '',
})

// mutations
export const mutations = {
    // reset 
    RESET: (state) => {
        // current order
        state.order = null,
        // error message
        state.errorMessage =  '',
        // errorSnackbar
        state.showErrorSnackbar = false

    },
    // set order
    SET_ORDER: (state, payload) => state.order = payload.order,
    // set order
    //SET_REVIEW_ORDER: (state, payload) => state.reviewOrder = payload.order,
    // show Erro
    SHOW_ERROR: (state, payload) => {
        // set the error message
        state.errorMessage = payload.errorMessage
        // set the showErrorSnackbar
        state.showErrorSnackbar = true
    },
    // token
    SET_TOKEN: (state, payload) => {
        // set the token
        state.token = payload.token
    },
    // toggle show more
    TOGGLE_SHOW_MORE: (state) => {
        return state.order.show_more = !state.order.show_more
    }
}

// getters
export const getters = {
    // current order
    currentOrder: (state) => state.order,
    // error message
    errorMessage: (state) => state.errorMessage,
    // show snackbar error
    showSnackbarError: (state) => state.showErrorSnackbar,
    // return dropzone options
    dropzoneOptions: (state) => {
        // return 
        return {
            url: state.order? `http://localhost:4000/api/order/${state.order.id}/attachments` : '',
            paramName: (n) => {
                return "attachments[]"
            },
            uploadMultiple: true,
            addRemoveLinks: true,
            headers: {
                "Authorization": `${state.token}`
            },
            dictDefaultMessage: "<i class='fa fa-cloud-upload'> <span class='text-caption primary--text font-weight-bold ml-3'>Upload Description files</span>"
        }
    },

    // options
    profileOptions: (state) => {
        // url to where the image will be send
        return {
            url: `http://localhost:4000/api/user/profile/picture`,
            // param name
            paramName: (n) => {
                return "profile_pic"
            },
            uploadMultiple: true,
            addRemoveLinks: true,
            headers: {
                "Authorization": `${state.token}`
            },
            dictDefaultMessage: "<i class='fa fa-cloud-upload'> <span class='text-caption primary--text font-weight-bold ml-3'>Choose Account Profile Picture</span>"
        }
    }
}

// actions
export const actions = {
    // new order
    async createNewOrder({ commit }, { data, type}) {
        // post the data
        await this.$axios.post('/order/new', {order: data})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // updates the order category
    async updateOrderCategory({ commit, state }, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/category`, {new_order: {order_category: payload.data}})
            .then(response => {
                // commit the response
                commit('SET_ORDER', {order: response.data.data})
            })

    },

    // function for adding the type to the order
    async addOrderType({ commit, state }, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/type`, {new_order: {order_type: payload.data}})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },
    
    // function for adding order payment
    async addOrderPayment({ commit, state }, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/payment`, {new_order: {order_payment: payload.data}})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // function for adding the order descritpion
    async addOrderDescription({ commit, state }, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/description`, {new_order: {order_description: payload.data.description}})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // functionf ro updating the order durations
    async addOrderDuration({ commit, state}, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/duration`, {new_order: {order_duration: payload.data}})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // functiion for verifying the order
    async verifyOrder({ commit, state}, payload) {
        // post the data
        await this.$axios.post(`/order/${state.order.id}/verify`, {new_order: {verification_code: payload.code}})
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // function for getting the order
    async getOrder({ commit }, orderId) {
        // get the data
        await this.$axios.get(`/order/${orderId}`)
            .then(response => {
                // commit the changes
                commit('SET_ORDER', {order: response.data.data})
            })
    },

    // cancel order
    async deleteOrder({ commit }) {
        // function for deleting an order
        await this.$axios.post(`/order/${state.order.id}/delete`)
            .then(() => {
                // reset the order
                commit('RESET')
            })
    }
}