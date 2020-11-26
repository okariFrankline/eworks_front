<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <ContractorDirectHires
            :requests="requests"
            :isClientMessage="isClientMessage"
        />
        <!-- End of offer card -->

        <IsClient
            :showIsClient="showClientDialog"
            :message="'No direct hire requests at the moment.'"
            :icon="'mdi-database-off'"
            @hide-dialog="() => $store.commit('contractor_hire_requests/HIDE_DIALOG')"
        />
    </v-col>
    
</template>

<script>
// import OfferCard
import ContractorDirectHires from "~/components/direct/ContractorDirectHires"
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
        ContractorDirectHires,
        IsClient
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('contractor_hire_requests/getRequests')
    },
    // computed
    computed: {
        // offers
        ...mapState('contractor_hire_requests', [
            'requests',
            'showClientDialog',
            'isClientMessage'
        ])
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