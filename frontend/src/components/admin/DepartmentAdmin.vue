<template>
    <div class="deparmtment-admin">
        <b-form>
            <input id="department-id" type="hidden" v-model="department.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome" label-for="department-name">
                        <b-form-input id="department-name" type="text"
                        v-model="department.name" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome do Departamento" />
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
        <b-table hover striped :items="departments" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadDepartment(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadDepartment(data.item, 'remove')">
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
    name: 'ArticleAdmin',
    data: function() {
        return {
            mode: 'save',
            department: {},
            departments: [],
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
        loadDepartments() {
            const url = `${baseApiUrl}/department?page=${this.page}`
            axios.get(url).then(res => {
                this.departments = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.department = {}
            this.loadDepartments()

        },
        save() {

            const method = this.department.id ? 'put' : 'post'
            const id = this.department.id ? `/${this.department.id}` : ''
            axios[method](`${baseApiUrl}/department${id}` , this.department)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.department.id
            axios.delete(`${baseApiUrl}/department/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        loadDepartment(department, mode = 'save') {
            this.mode = mode
            this.department = { ...department }

        }
    },
    watch: {
        page() {
            this.loadDepartments()
        }
    },
    mounted() {
        this.loadDepartments()
    }
}

</script>

<style>

</style>