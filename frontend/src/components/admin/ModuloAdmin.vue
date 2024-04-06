<template>
    <div class="modulo-admin">
        <b-form>
            <input id="modulo-id" type="hidden" v-model="modulo.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome" label-for="modulo-name">
                        <b-form-input id="modulo-name" type="text"
                            v-model="modulo.name" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe o Nome do Modulo" />
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
        <b-table hover striped :items="modulos" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadModulo(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadModulo(data.item, 'remove')">
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
    name: 'ModuloAdmin',
    data: function() {
        return {
            mode: 'save',
            modulo: {},
            modulos: [],
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
        loadModulos() {
            const url = `${baseApiUrl}/modulo?page=${this.page}`
            axios.get(url).then(res => {
                this.modulos = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.modulo = {}
            this.loadModulos()

        },
        save() {

            const method = this.modulo.id ? 'put' : 'post'
            const id = this.modulo.id ? `/${this.modulo.id}` : ''
            axios[method](`${baseApiUrl}/modulo${id}` , this.modulo)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.modulo.id
            axios.delete(`${baseApiUrl}/modulo/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        loadModulo(modulo, mode = 'save') {
            this.mode = mode
            this.modulo = { ...modulo }

        }
    },
    watch: {
        page() {
            this.loadModulos()
        }
    },
    mounted() {
        this.loadModulos()
    }
}
</script>

<style>

</style>