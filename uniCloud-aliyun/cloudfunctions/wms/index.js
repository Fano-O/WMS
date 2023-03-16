let db = uniCloud.database({
	throwOnNotFound: false,
})
exports.main = async (event, context) => {
	const tablename = event.tablename
	switch (event.api) {
		case 'checkPassword':
			return event.password == "123456"
		case 'queryStock':
			return await db.collection(tablename).where({
				id: event.id
			}).get()
		case 'queryRecord':
			return await db.collection(tablename).where({
				id: event.id,
			}).skip(event.offset).limit(event.limit).get()
		case 'updateStock':
			if (!event.status) {
				event.name = null;
				event.phone = null;
				event.remarks = null;
			}
			return await db.collection(tablename).where({
				id: event.id
			}).update({
				name: event.name,
				phone: event.phone,
				status: event.status,
				remarks: event.remarks
			})
		case 'addRecord':
			return await db.collection(tablename).add({
				id: event.id,
				name: event.name,
				phone: event.phone,
				time: event.time,
				status: event.status,
				remarks: event.remarks
			})
		case 'queryLend':
			return await db.collection(tablename).where({
				status: true
			}).get()
		case 'queryStockLength':
			return await db.collection(tablename).count()
		case 'addStock':
			return await db.collection(tablename).add({
				id: event.id,
				brand: event.brand,
				type: event.type,
				model: event.model,
				serialNo: event.serialNo,
				status: false,
				name: null,
				phone: null,
				remarks: null
			})
		case 'queryAll':
			// 多表联查
			return await db.collection(tablename).aggregate().lookup({
				from: 'stock',
				localField: 'id',
				foreignField: 'id',
				as: 'params'
			}).end()
	}
}
