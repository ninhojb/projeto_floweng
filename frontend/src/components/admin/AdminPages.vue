<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Serviços" active>
                        <ServiceAdmin />
                    </b-tab>
                    <b-tab title="Modulos" active>
                        <ModuloAdmin />
                    </b-tab>
                    <b-tab title="Departamentos" active>
                        <DepartmentAdmin />
                    </b-tab>
                    <b-tab title="Usuários" active>
                        <Useradmin />
                    </b-tab>
                </b-tabs>

            </b-card>
        </div>
    </div>
  
</template>

<script>
import PageTitle from '../template/PageTitle'
import DepartmentAdmin from './DepartmentAdmin'
import ModuloAdmin from './ModuloAdmin'
import Useradmin from './UserAdmin'
import ServiceAdmin from './ServiceAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, 
        DepartmentAdmin, 
        ModuloAdmin, 
        Useradmin,
        ServiceAdmin }

}
</script>

<style>

</style>