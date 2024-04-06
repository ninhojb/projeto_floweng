<template>
    <div class="suporte-call">
        <b-form>
            <input id="suporte-id" type="hidden" v-model="call.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Usuário:" label-for="suporte-id_user"
                            v-if="mode === 'save'">
                        <b-form-select id="suporte-id_user" 
                            :options="users" v-model="call.id_user" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Departamento:" label-for="suporte-id_depart"
                            v-if="mode === 'save'">
                        <b-form-select id="suporte-id_depart" 
                            :options="departments" v-model="call.id_depart" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Serviço:" label-for="suporte-service"
                            v-if="mode === 'save'">
                        <b-form-select id="suporte-service" 
                            :options="services" v-model="call.service" />
                    </b-form-group>
                </b-col>
            
            
                <b-col md="6" sm="12">
                    <b-form-group label="Prioridade:" label-for="suporte-priority"
                            v-if="mode === 'save'">
                        <b-form-select id="suporte-priority" 
                            :options="priority" v-model="call.priority" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-form-group v-if="mode === 'save'"
                    label="Descrição:" label-for="suporte-description">
                    <VueEditor v-model="call.description"
                        placeholder="Informe o problema ocorrido..." />
                </b-form-group>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        

    </div>
  
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { VueEditor } from "vue2-editor"


export default {
    name: 'SopportCall',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            call: {},
            users: [],
            departments: [],
            services: [],
               priority: [
                { value: 'Baixa', text: 'Baixa' },
                { value: 'Media', text: 'Media' },
                { value: 'Alta', text: 'Alta' },
            
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users/notdel`
            axios.get(url).then(res => {
                this.users = res.data.data.map(user => {
                    return { value: user.id, text: `${user.name}`}
                })
            })
        },
        loadDepartments() {
            const url = `${baseApiUrl}/department`
            axios.get(url).then(res => {
                this.departments = res.data.data.map(department => {
                    return { value: department.id, text: `${department.name}`}
                })
            })
        },
        loadServices() {
            const url = `${baseApiUrl}/service`
            axios.get(url).then(res => {
                this.services = res.data.data.map(service => {
                    return { value: service.name, text: `${service.name}`}
                })
            })
        },
        reset() {
            this.mode = 'save'
            this.call = {}
        },
        save() {
            axios.post(`${baseApiUrl}/support`, this.call)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadUsers()
        this.loadDepartments()
        this.loadServices()
    }

}
</script>

<style>

</style>