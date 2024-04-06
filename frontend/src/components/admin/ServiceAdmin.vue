<template>
    <div class="service-admin">
        <b-form>
            <input id="service-id" type="hidden" v-model="service.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome" label-for="service-name">
                        <b-form-input id="service-name" text="text"
                        v-model="service.name" required 
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome do Serviço"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>

                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="services" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadService(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadService(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
    name: 'ServiceAdmin',
    data: function() {
        return {
            mode: 'save',
            service: {},
            services: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: 'Código', sortable: true },
                { key: "name", label: 'Nome', sortable: true },
                { key: "created_at", label: 'Criado em', sortable: true },
                { key: "update_at", label: 'Atualizado em', sortable: true },
                { key: 'actions', label: 'Ações' }
                
            ]
        }
    },
    methods: {
        loadServices() {
            const url = `${baseApiUrl}/service?page=${this.page}`
            axios.get(url).then(res => {
                this.services = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.service = {}
            this.loadServices()

        },
        save() {
            const method = this.service.id ? 'put' : 'post'
            const id = this.service.id ? `/${this.service.id}` : ''
            axios[method](`${baseApiUrl}/service${id}` , this.service)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.service.id
            axios.delete(`${baseApiUrl}/service/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        loadService(service, mode = 'save') {
            this.mode = mode
            this.service = { ...service }

        }
    },
    watch: {
        page() {
            this.loadServices()
        }
    },
    mounted() {
        this.loadServices()
    }
}
</script>

<style>

</style>