const Todo = require("../models/Todo")

const required_fields = ['title', 'description']

const get_todos = async (req, res,) => {
    const { user_id, body } = req
    
    const find_todos = await Todo.find({user_id})

    res.json({ success: true, data:find_todos })
}



const add_todo = async (req, res,) => {
    const { user_id, body } = req

    const body_fields = Object.keys(body)

    const mission_fields = []

    required_fields.forEach(element => {
        if (!body_fields.includes(element)) {
            mission_fields.push(element)
        }
    });

    if (mission_fields.length) {
        return res.json({ success: false, message: 'Please fill all required fields!', mission_fields })
    }

    const { title, description } = body

    await Todo.create({
        title, description, user_id
    })

    res.json({ success: true, message:'Task added in the todo list successfully!'})
}

const update_todo = async (req, res,) => {
    const { user_id, params, body } = req

    const todo_id = params.id

    const find_todo = await Todo.findOne({id:todo_id,user_id })
    if(!find_todo){
        res.json({success:true, message:'Task not found!'}).status(404)
    }

    await Todo.findByIdAndUpdate(todo_id, {
        ...body
    })
    
    res.json({ success: true, message:'Task updated successfully!'})
}


const delete_todo = async (req, res,) => {
    const { user_id, params, body } = req

    const todo_id = params.id

    const find_todo = await Todo.findOne({id:todo_id,user_id })
    if(!find_todo){
        res.json({success:true, message:'Task not found!'}).status(404)
    }

    await Todo.findByIdAndRemove(todo_id)

    res.json({ success: true, message:'Task updated successfully!'})
}


module.exports = { add_todo,update_todo, delete_todo, get_todos }