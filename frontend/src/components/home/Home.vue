<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Floweng"
            sub="SGF - Sistema de Gestão" />
        <div class="stats">
            <Stat title="Modulo" :value="stat.modulo"
                icon="fa fa-university" color="#FAEDED" />
            <Stat title="Departamento" :value="stat.department"
                icon="fa fa-folder" color="#d54d50" />
            <Stat title="Suporte" :value="stat.support"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/flowengstats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>