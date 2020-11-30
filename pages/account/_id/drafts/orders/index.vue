<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <DraftOrder 
            :orders="orders"
        />
        <!-- End of offer card -->
    </v-col>
    
</template>

<script>
// import OfferCard
import DraftOrder from "~/components/order/DraftOrder"
// import mapGetters
import { mapState } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        DraftOrder
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('draft_orders/getDraftOrders')
            .catch(error => {
                console.log(error)
                error({
                    messsage: "An error occurred. Check your connection and try again."
                })
            })
    },
    // computed
    computed: {
        // offers
        ...mapState('draft_orders',[
            'orders'
        ]),

    },
    // data
    data: () => ({
    })
}
</script>