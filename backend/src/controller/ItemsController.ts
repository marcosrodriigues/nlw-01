import { Request, Response } from 'express';
import knex from '../database/connection'

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serlaizedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                image_url: `http://192.168.2.14:3333/uploads/${item.image}`
            }
        })
        
        return response.json(serlaizedItems);
    }
}

export default ItemsController;