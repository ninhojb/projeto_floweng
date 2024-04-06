const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/notdel')
        .get(app.api.user.getNotDelete)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/flowengstats')
        .all(app.config.passport.authenticate())
        .get(app.api.statFloweng.get)

    app.route('/department')
        .all(app.config.passport.authenticate())
        .post(app.api.department.save)
        .get(app.api.department.get)
    
    app.route('/department/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.department.remove))
        .get(app.api.department.getById)
        .put(app.api.department.save)
    
    app.route('/support')
        .all(app.config.passport.authenticate())
        .post(app.api.support.save)
        .get(app.api.support.get)
    
    app.route('/support/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.support.remove))
        .get(app.api.support.getById)
        .put(app.api.support.save)

    app.route('/query')
        .get(app.api.support.query)

    app.route('/modulo')
        .all(app.config.passport.authenticate())
        .post(app.api.modulo.save)
        .get(app.api.modulo.get)
    
    app.route('/modulo/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.support.remove))
        .get(app.api.modulo.getById)
        .put(app.api.modulo.save)
    
    app.route('/service')
        .all(app.config.passport.authenticate())
        .post(app.api.service.save)
        .get(app.api.service.get)
    
    app.route('/service/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.support.remove))
        .get(app.api.service.getById)
        .put(app.api.service.save)

}