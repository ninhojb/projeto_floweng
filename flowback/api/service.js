module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const service = {  ...req.body }
        const serviceUpdate = {
            id: req.body.id,
            name: req.body.name,
            update_at: new Date()
        }

        if(req.params.id) service.id = req.params.id

        try {
            existsOrError(service.name, 'Nome não informado')

            const serviceFromDB = await app.db('service')
                .where({ name: service.name }).first()
            if(!service.id) {
                notExistsOrError(serviceFromDB, 'Service já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(service.id) {
            app.db('service')
                .update(serviceUpdate)
                .where({ id: service.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('service')
                .insert(service)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('service').count('id').first()
        const count = parseInt(result.count)

        app.db('service')
            .select('id', 'name', 'created_at', 'update_at')
            .limit(limit).offset(page * limit - limit)
            .then(services => res.json({ data: services, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('service')
                .where({ id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Service não foi encontrado')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('service')
            .where({ id: req.params.id})
            .first()
            .then(service => res.json(service))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById }
}