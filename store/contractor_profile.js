/**
 * Manages the contractor profile page
 */
export const state = () => ({
    // contractor
    contractor: null,
    // previous hires
    hires: []
})

// mutations
export const mutations = {
    // set contractor
    SET_CONTRACTOR: (state, payload) => {
        // set teh hires
        state.hires = payload.contractor.previous_hires
        // set the contractor
        state.contractor = payload.contractor
    },

    // toggle show for the contractor
    TOGGLE_CONTRACTOR_SHOW_MORE: (state) =>  {
        // toggle the work profil sho more
        state.contractor.work_profile.show_more = !state.contractor.work_profile.show_more
    },

    // toggle show the order
    TOGGLE_ORDER_SHOW_MORE: (state, payload) =>  {
        // get the order
        let order = state.hires.find(order => order.id == payload.orderId)
        // toggle the work profil sho more
        order.show_more = !order.show_more
    }
}

// getters
export const getters = {
    // contractor
    contractor: (state) => state.contractor,
    // hires
    hires: (state) => state.hires
}

// actions
export const actions = {
    // action for getting the contractor
    async getContractor({ commit }, contractorId) {
        // get the contractor
        await this.$axios.get(`/contractors/${contractorId}`)
            .then(({ data }) => {
                console.log(data.data.previous_hires)
                // set the hires and the contracot
                commit('SET_CONTRACTOR', {contractor: data.data})
            })
    }
}