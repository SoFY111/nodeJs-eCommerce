import db from '../../src/models';

class CheckPermission{

	static checkPermission (permName){
		return async (req, res, next) => {
			try {
				const result = await db.Users.findOne({
					where: {id: req.userData.id},
					attributes: [ 'username' ],
					include: {
						model: db.Roles,
						attributes: [ 'id', 'name' ],
						through: { attributes: [] },
						include: {
							model: db.Permissions,
							where: {name: permName},
							through: { attributes: [] }
						}
					}
				});
				if (result.Roles.length === 0) res.status(401).json({type: false, message: 'access denied'});
				else next();
			}
			catch (error) {
				res.json({type: false, message: error.message});
			}
		};
	}

}

export default CheckPermission;