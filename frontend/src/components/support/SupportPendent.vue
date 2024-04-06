<template>
    <div class="support-pendent">
        <b-table hover striped :items="pendents"></b-table>

    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
    name: 'SupportPendent',
    data: function() {
        return { 
            pendents: [],
            pendent: {}

        }
    },
    methods: {
        loadPendents() {
            const url = `${baseApiUrl}/query`
            axios.get(url).then(res => {
                this.pendents = res.data.data.rows
            })
        }
    },
    watch: {
        page() {
            this.loadCalls()
        }
    }, 
    mounted() {
        this.loadPendents()
    }

}
</script>

<style>

</style>