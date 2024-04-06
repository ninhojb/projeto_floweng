<template>
    <div class="support-view">
        <b-table hover striped :items="calls" :fields="fields">

        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"/>

    </div>
  
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
    name: 'SupportViews',
    data: function() {
        return {
            calls: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: 'Código', sortable: true },
                { key: "user_name", label: 'Usuário', sortable: true },
                { key: "depart_name", label: 'Departamento', sortable: true },
                { key: "service", label: 'Serviço', sortable: true },
                { key: "description", label: 'Descrição', sortable: true },
                { key: "priority", label: 'Prioridade', sortable: true },
                { key: "action", label: 'Execução', sortable: true },
                { key: "status", label: 'Status', sortable: true },
                { key: "created_at", label: 'Criado em', sortable: true },
                { key: "expected_date", label: 'Prazo', sortable: true },
                { key: "update_at", label: 'Atualizado em', sortable: true },
                { key: "completion_date", label: 'Data Conclusão', sortable: true }
            ]

        }
    },
    methods: {
        loadCalls() {
            const url = `${baseApiUrl}/query?page=${this.page}`
            axios.get(url).then(res => {
                this.calls = res.data.data.rows
                this.count = res.data.count
                this.limit = res.data.limit
            })
        }

    },
    watch: {
        page() {
            this.loadCalls()
        }
    },
    mounted() {
        this.loadCalls()
    }

}
</script>

<style>

</style>