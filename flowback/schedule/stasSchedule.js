const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const supportCount = await app.db('support').count('id').first()
        const departmentCount = await app.db('department').count('id').first()

        const { StatFloweng } = app.api.statFloweng

        const lastStat = await StatFloweng.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const statFloweng = new StatFloweng({
            users: usersCount.count,
            support: supportCount.count,
            department: departmentCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || statFloweng.users !== lastStat.users
        const changeSupport = !lastStat || statFloweng.support !== lastStat.support
        const changeDepartment = !lastStat || statFloweng.department !== lastStat.department

        if(changeUsers || changeSupport || changeDepartment) {
            statFloweng.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}