<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- Order -->
        <OrderDetails
            :order="order"

        />
        <!-- End of order -->
    </v-col>
    
</template>

<script>
// import order
import OrderDetails from "~/components/order/OrderDetails"
// component description
export default {
    // layout
    layout: 'main',
    // components
    components: {
        OrderDetails
    },
    // fetch
    async asyncData ({ $axios, error, params }) {
        // get the data from the component
        let { data } = await $axios.get(`/order/${params.orderId}`)
        // return the data
        return {order: data.data}
            
    }
}
</script>