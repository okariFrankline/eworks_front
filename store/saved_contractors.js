/**
 * Manages the saved workers
 */
export const state = () => ({
    // workers
    workers: []
})

// mutations
export const mutations = {
    // mutations for setting the workers
    SET_WORKERS: (state, payload) => {
        // set the workers
        state.workers = payload.workers
    },

    // mutation for removing a worker
    REMOVE_WORKER: (state, workerId) => {
        // filter out the worker
        state.workers = state.workers.filter(worker => worker.id !== workerId)
    },

    // read more
    READ_MORE: (state, workerId) => {
        // find the worker with the id
        let worker = state.workers.find(worker => worker.id == workerId)
        // toggle the show more
        worker.show_more = !worker.show_more
    }
}

// actions
export const actions = {
    // action for getting the user's saved workers
    async getMySavedWorkers({ commit }) {
        // get the workers
        await this.$axios.get('/user/saved/contractors')
            .then(({ data }) => {
                console.log(data.data.workers)
                // add the workers to the 
                commit('SET_WORKERS', {workers: data.data.workers})
            })
    }
}