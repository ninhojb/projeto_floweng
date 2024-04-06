module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const modulo = {
            id: req.body.id,
            name: req.body.name
        }
        const moduloUpdate = {
            id: req.body.id,
            name: req.body.name,
            update_at: new Date()
        }

        if(req.params.id) modulo.id = req.params.id

        try {
            existsOrError(modulo.name, 'Nome não informado')

            const moduloFromDB = await app.db('modulo')
                .where({ name: modulo.name }).first()
            if(!modulo.id) {
                notExistsOrError(moduloFromDB, 'Modulo já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(modulo.id) {
            app.db('modulo')
                .update(moduloUpdate)
                .where({ id: modulo.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('modulo')
                .insert(modulo)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('modulo').count('id').first()
        const count = parseInt(result.count)

        app.db('modulo')
            .select('id', 'name', 'created_at', 'update_at')
            .limit(limit).offset(page * limit - limit)
            .then(modulos => res.json({ data: modulos, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('modulo')
                .where({ id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Modulo não foi encontrado')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('modulo')
            .where({ id: req.params.id})
            .first()
            .then(modulo => res.json(modulo))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById }
}