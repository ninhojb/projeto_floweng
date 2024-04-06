<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-la"></i>
            <input type="text" placeholder="Digite para filtrar ..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree"/>

    </aside>
</template>

<script>
import Tree from 'liquor-tree'
import axios from 'axios'
import { mapState } from 'vuex'
import { baseApiUrl } from '../../global'
export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),

    data: function() {
        return {
            treeFilter: '',
            treeData: this.loadModulos(),
            mod: '',
            treeOptions: { 
                propertyNames: { 'text': 'name' },
                filter: { emptyText: "Modulo não encontrado" }
            }
        }
    },
    methods: {
        loadModulos() {
            const url = `${baseApiUrl}/modulo`
            return axios.get(url).then(res => res.data.data)
        },
        onModeSelect(node){
            const modulo = node.data.text
            switch(modulo) {
                case "Suporte":
                    this.mod = "support"
                    break
                case "RH":
                    this.mod = "rh"
                    break
                case "Compras":
                    this.mod = "compras"
                    break
            }

            this.$router.push({
                name: `${this.mod}Pages`,
                params: { id: node.id}
            })
            if(this.$mq === 'xs' || this.mp === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onModeSelect)
    }

}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }

</style>