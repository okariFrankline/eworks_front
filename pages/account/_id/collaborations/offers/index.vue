<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <MyInviteOfferCard 
            :offers="inviteOffers"
            :isClientMessage="isClientMessage"
        />
        <!-- End of offer card -->

        <IsClient
            :showIsClient="showClientDialog"
            :message="'No collaboration invite offers to see.'"
            :icon="'mdi-database-off'"
            @hide-dialog="() => $store.commit('collaboration_offers/HIDE_DIALOG')"
        />
    </v-col>
    
</template>

<script>
    // import OfferCard
import MyInviteOfferCard from "~/components/offer/MyInviteOfferCard"
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
        MyInviteOfferCard,
        IsClient
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('collaboration_offers/getInviteOffers', {filter: "pending"})
    },
    // computed
    computed: {
        // offers
        ...mapState('collaboration_offers', [
            'inviteOffers',
            'showClientDialog',
            'isClientMessage'
        ])
    },
    // before leave
    beforeRouteLeave (to, from, next) {
        // set the showing to pending
        this.$store.commit('collaboration_offers/SET_SHOWING', "pending")
        // call next
        next()
    },  
    // data
    data: () => ({
    }),
    // methods
    methods: {
    }
}
</script>