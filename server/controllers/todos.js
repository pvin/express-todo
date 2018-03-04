const Todo =  require('../models').Todo;
const TodoItem =  require('../models').TodoItem;

module.exports = {
    create(req, res){
        return  Todo.create({
            title: req.body.title,
        }).then(todo => res.status(201).send(todo)).catch(error => res.status(400).send(error))
    },

    list(req, res){
        return  Todo.findAll({
                attributes : ['id', 'title'],
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }]
            })
                .then(todos => res.status(200)
                .send(todos)).catch(error => res.status(400).send(error));
    },

    retrieve(req, res){
        return Todo
        .findById(req.params.todoId,{
        attributes : ['id', 'title'],
            include: [{
            model: TodoItem,
            as: 'todoItems'
        }]
    })
            .then(todo => {
            if (!todo){
        return res.status(404).send({
            message: 'Todo Not Found',
        });
    }return res.status(200).send(todo);

    }).catch(error => res.status(400).send(error));

},

    update(req, res){
    return Todo.findById(req.params.todoId,{
        attributes : ['id', 'title'],
        include: [{
            model: TodoItem,
            as: 'todoItems'
        }]
    })
            .then(todo => {
            if (!todo) {
        return res.status(404).send({
            message: 'Todo Not Found',
        });
    }
    return todo
            .update({
                title: req.body.title
            })
            .then(() => res.status(200).send(todo))  // Send back the updated todo.
            .catch((error) => res.status(400).send(error));
     })
            .catch((error) => res.status(400).send(error));
    },

    destroyy(req, res){
      return Todo
            .findById(req.params.todoId,{attributes : ['id', 'title']})
            .then(todo => {
            if (!todo) {
        return res.status(400).send({
            message: 'Todo Not Found',
        });
    }
    return todo
            .destroy({ force: true })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
       .catch(error => res.status(401).send(error));
}



};