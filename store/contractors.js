/**
 * Manges the contractors page.
 */
export const state = () => ({
    // contractors
    contractors: [],
    // next_cursor
    nextCursor: null,
    // search contractors
    searchContractors: [],
    // seach next cursor
    searchNextCursor: null,
    // saved contractors
    savedContractors: []
})

// mutations
export const mutations = {
    // set the contractors
    SET_CONTRACTORS: (state, payload) => {
        // add the contractors in the payload as to the contractors
        state.contractors.push(...payload.contractors)
        // set the next cursor
        state.nextCursor = payload.nextCursor
    },

    // set the search contractors
    SET_SEARCH_CONTRACTORS: (state, payload) => {
        // add the contractors in the payload as to the contractors
        state.searchContractors.concat(payload.searchContractors)
        // set the next cursor
        state.searchNextCursor = payload.searchNextCursor
    },

    // toggle show more
    TOGGLE_SHOW_MORE: (state, payload) => {
         // get the contractor with the given id
         let contractor = state.contractors.find(contractor => contractor.id == payload.contractorId)
         // set the show more to false
         contractor.show_more = !contractor.show_more
    }
}

// getters
export const getters = {
    // return the contractors
    contractors: (state) => state.contractors,
    // return the search contractors
    searchContractors: (state) => state.searchContractors
}

// actions
export const actions = {
    // get the contractors
    async listContractors({ commit, state }) {
        // get the contractors
        await this.$axios.get('/contractors', {
            // set the params
            params: {
                metadata: state.nextCursor ? state.nextCursor : 'false'
            }
        })
        .then(({ data }) => {
            // set the contractors
            commit('SET_CONTRACTORS', {nextCursor: data.data.cursor_after, contractors: data.data.workers})
        })
    },

    // function for searching for contractors
    async searchContractors({ commit, state}, skill) {
        // get the contractors
        await this.$axios.get('/contractors', {
            metadata: state.searchNextCursor ? state.searchNextCursor : 'false',
            // set the skill
            skill: skill
        })
        .then(({ data }) => {
            // add the search results
            commit('SET_SEARCH_CONTRACTORS', {searchNextCursor: data.data.cursor_after, searchContractors: data.data.workers})
        })
    },

    // function for unsaving a worker
    async saveContractor({ commit, state }, contractorId) {
        // save the contractor
        await this.$axios.post(`contractors/${contractorId}/unsave`)
    },

    // function of listing the saved contractors
    async listSavedContractors({ commit }) {
        // get the contractors
        await this.$axios.get('contractors/saved')
            .then(({ data }) => {
                // set the saved contractors
                commit('SET_SAVED_CONTRACTORS', {savedContractors: data.data.workers})
            })
    }
}