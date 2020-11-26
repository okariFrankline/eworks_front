<template>
    <v-col md=6 class="ml-n3 mt-n1">
    <!-- Ruest -->
    <Request 
      :order="order"
    />
    <!-- End of Request -->

    <!-- Assignee -->
    <Assignee
      :worker="contractor"
      @view-profile="viewProfile"
    />
    <!-- End of previous hire card -->

  </v-col>
</template>

<script>
// import assignee
import Assignee from "~/components/direct/Assignee"
// import the request
import Request from "~/components/direct/Request"
// import map state
import { mapState } from "vuex"
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        Request,
        Assignee
    },
    // fetch function
    async fetch({ store, params}) {
        // get the invite
        await store.dispatch('direct_hire_request/getRequest', params.id)
            .catch(err => {
                // log the error
                console.log(err)
            })
    },
    // computed
    computed: {
        ...mapState('direct_hire_request', [
            'order',
            'contractor'
        ])
    },
    // data
    data: () => ({

    }),
    // methods
    methods: {
        // function for viewing the profiler
        viewProfile(workerId) {
            // redirect the user to the user's profile
            this.$router.push({
                path: `/contractors/${workerId}`
            })
        }
    }
}
</script>