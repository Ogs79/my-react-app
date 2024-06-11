const uuid = require('uuid')
const path = require('path')
const {Group} = require('../models/models')
const ApiError = require('../error/ApiError')
class GroupController {
    async create(req, res, next){
        try{
            let {name, brandId, typeId} = req.body

            const group = await Group.create({name, brandId,typeId})

            return res.json(group)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let groups;
        if (!brandId && !typeId) {
            groups = await Group.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            groups = await Group.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            groups = await Group.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            groups = await Group.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(groups)
    }

    async getOne(req, res){
        const {id} = req.params
        const group = await Group.findOne(
            {
                where: {id}
            },

        )
        return res.json(group)
    }
    
}


module.exports = new GroupController()