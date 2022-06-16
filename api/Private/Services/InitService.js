import db from '../../src/models';
class InitService{
	
	static async getUserRole(userId){
		try {			
			const userData = await db.Users.findOne({
				where: {id: userId},
				attributes: [ 'username', 'email', 'name', 'surname' ],
				include: {
					model: db.Roles,
					attributes: [ 'name' ],
					through: { attributes: [] }
				}
			});

			return  {type: true, message: 'successful', data: userData};
		}
		catch (error) {
			return {type: false, message: error.message};
		}
	}

}

export default InitService;