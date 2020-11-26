<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- Order -->
        <Order
            :order="order"

        />
        <!-- End of order -->
    </v-col>
    
</template>

<script>
// import order
import Order from "~/components/collaboration/Order"
// component description
export default {
    // layout
    layout: 'main',
    // components
    components: {
        Order
    },
    // fetch
    async asyncData ({ $axios, error, params }) {
        // get the data from the component
        let { data } = await $axios.get(`/order/${params.id}`)
        // return the data
        return {order: data.data}
            
    }
}
</script>