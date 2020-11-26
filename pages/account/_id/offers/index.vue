<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <OfferCard 
            :offers="offers"
            :isClientMessage="isClientMessage"
            @view-order="viewOrder"
        />
        <!-- End of offer card -->


        <IsClient
            :showIsClient="showClientDialog"
            :message="'No placed order offers to be seen.'"
            :icon="'mdi-database-off'"
            @hide-dialog="() => $store.commit('offers/HIDE_DIALOG')"
        />
    </v-col>
    
</template>

<script>
    // import OfferCard
import OfferCard from "~/components/offer/OfferCard"
// import is client
import IsClient from "~/components/dialogs/IsClient"
// import mapGetters
import { mapState } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        OfferCard,
        IsClient
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('offers/getOffers', {filter: "pending"})
    },
    // computed
    computed: {
        // offers
        ...mapState('offers', [
            'offers',
            'showClientDialog',
            'isClientMessage'

        ])
    },
    // before route leave
    beforeRouteLeave (to, from, next) {
        // set the showing to pending
        this.$store.commit('offers/SET_SHOWING', "pending")
        // call next
        next()
    },
    // data
    data: () => ({
    }),
    // methods
    methods: {
        // view order
        viewOrder(orderId) {
            // go to the order details
            this.$router.push({
                path: `/account/${this.$route.params.id}/offers/order/${orderId}`
            })
        }
    }
}
</script>