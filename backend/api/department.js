module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const department = {
            id: req.body.id,
            name: req.body.name,
            updated_at: new Date()
        }
        if(req.params.id) department.id = req.params.id

        try {
            existsOrError(department.name, 'Nome não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if(department.id) {
            app.db('department')
                .update(department)
                .where({ id: department.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('department')
                .insert(department)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('department').count('id').first()
        const count = parseInt(result.count)

        app.db('department')
            .select('id', 'name', 'created_at', 'update_at')
            .limit(limit).offset(page * limit - limit)
            .then(departments => res.json({ data: departments, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('department')
                .where({ id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Departamento não foi encontrado')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('department')
            .where({ id: req.params.id})
            .first()
            .then(department => res.json(department))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById }
}