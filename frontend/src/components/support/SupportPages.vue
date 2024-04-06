<template>
    <div class="support-pages">
        <PageTitle icon="fa fa-ticket" main="Suporte TI"
            sub="Abertura de Chamados" />
        <div class="support-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Abertura" active>
                        <SupportCalls />
                    </b-tab>
                    <b-tab title="Pendentes" active>
                        <SupportPendent />
                    </b-tab>
                    <b-tab title="Chamados" active>
                        <SupportViews />
                    </b-tab>
                </b-tabs>

            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import SupportCalls from './SupportCalls'
import SupportPendent from './SupportPendent'
import SupportViews from './SupportViews'

export default {
    name: 'SupportPages',
    components: { PageTitle, 
                    SupportCalls, 
                    SupportPendent, 
                    SupportViews 
                }
    
}
</script>

<style>

</style>