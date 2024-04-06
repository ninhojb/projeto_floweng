module.exports = app => {
    const StatFloweng = app.mongoose.model('StatFloweng', {
        users: Number,
        support: Number,
        department: Number,
        modulo: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        StatFloweng.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    support: 0,
                    department: 0,
                    modulo: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { StatFloweng, get }
}