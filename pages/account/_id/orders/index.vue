<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <MyPostedOrder 
            :orders="orders"
        />
        <!-- End of offer card -->
    </v-col>
    
</template>

<script>
// import OfferCard
import MyPostedOrder from "~/components/order/MyPostedOrder"
// import mapGetters
import { mapState } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        MyPostedOrder
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('my_posted_orders/getMyPostedOrders', {filter: "unassigned"})
            .catch(err => {
                console.log(err)
                // check if the error is a 404
                if (err.response) {
                    // display error page
                    error({ message: err.response.data.errors.details})
                } else {
                    // display error page
                    error({ message: 'An Error Occurred. Please try again later'})
                }
            })
    },
    // computed
    computed: {
        // offers
        ...mapState('my_posted_orders', [
            'orders'
        ])
    },
    // before leave
    beforeRouteLeave (to, from, next) {
        // set the showing to unassinged
        this.$store.commit('my_posted_orders/SET_SHOWING', "unassigned")
        // call next
        next()
    },
    // data
    data: () => ({
        showLess: true,
    }),
    // methods
    methods: {
    }
}
</script>