import db from '../../src/models';

class BrandService{

	static async createBrand(body){
		try {
			if (!body.name)
				return ({type: false, message: 'name is required'});

			const result = await db.Brands.create({
				name: body.name
			});

			if (!result)
				return ({ type: false, message: 'brand not created.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * @route GET /private/brand/list
	 * @group Brand
	 * @summary Get all brands
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getBrands(){
		try {
			const result = await db.Brands.findAll({
				attributes: [ 'id', 'name' ]
			});

			if (!result)
				return ({ type: false, message: 'not found.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	static async deleteBrand(id){
		try {
			const result = await db.Brands.destroy({
				where: {
					id
				}
			});

			if (!result)
				return ({ type: false, message: 'not deleted.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	static async updateBrand(id, body){
		try {
			if (!body.name)
				return ({type: false, message: 'name is required'});
        
			const result = await db.Brands.update({
				name: body.name
			}, {
				where: {
					id: id
				}
			}
			);

			if (!result)
				return ({ type: false, message: 'not updated.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

}

export default BrandService;