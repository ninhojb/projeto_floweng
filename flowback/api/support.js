const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const support = { 
            ...req.body
        }
        const supportUpdate = {
            ...req.body,
            updated_at: new Date()
        }
    

    if(req.params.id) support.id = req.params.id

    try {
        existsOrError(support.id_user, 'Usuário não informado')
        existsOrError(support.id_depart, 'Departamento não informada')
        existsOrError(support.service, 'Serviço não informado')
        existsOrError(support.priority, 'Prioridade não informado')
        existsOrError(support.description, 'Descrição não informada')
    } catch(msg) {
        res.status(400).send(msg)
    }

    if(support.id) {
        app.db('support')
            .update(supportUpdate)
            .where({ id: supportUpdate.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        app.db('support')
            .insert(support)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }

    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('support').count('id').first()
        const count = parseInt(result.count)

        app.db('support')
            .select('id', 'service', 'description', 'priority', 
                'action', 'status', 'expected_date', 'created_at',
                'update_at', 'completion_date', 'id_user', 'id_depart')
            .limit(limit).offset(page * limit - limit)
            .then(support => res.json({ data: support, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('support')
            .where({ id: req.params.id})
            .first()
            .then(support => res.json(support))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('support')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Ticket não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const query = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('support').count('id').first()
        const count = parseInt(result.count)

        app.db.raw(queries.supportWithDepart)
                .then(support => res.json({data: support, count, limit}))
                .catch(err => res.status(500).send(err))
           
    }



    return { save, get, getById, query, remove }
}