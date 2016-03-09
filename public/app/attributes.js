/* Preconfigured */

angular.module('vamotors.category.attributes',[])
	.constant('va.attributes', 	[
		{
			type: 'number',
			name: 'attribute.price',
			unique_name: 'attribute.price.unique',
			code: '001',
			id: 'price'
		}, {
			type: 'number',
			name: 'attribute.width',
			unique_name: 'attribute.width.unique',
			id: 'width',
			code: '002'
		}, {
			type: 'string',
			name: 'attribute.tire.size',
			unique_name: 'attribute.tire.size.unique',
			id: 'tire_size',
			code: '003'
		}, {
			type: 'select',
			name: 'attribute.tire.class',
			id: 'tire_class',
			unique_name: 'attribute.tire.class.unique',
			code: '004',
			options: [
				{
					code: '0041',
					name: 'attribute.tire.class.option.economy'
				}, {
					code: '0042',
					name: 'attribute.tire.class.option.comfort'
				}, {
					code: '0043',
					name: 'attribute.tire.class.option.premium'
				}
			]
		}, {
			type: 'select',
			name: 'attribute.tire.season',
			unique_name: 'attribute.tire.season.unique',
			id: 'tire_season',
			code: '005',
			options: [
				{
					code: '0051',
					name: 'attribute.tire.season.option.summer'
				}, {
					code: '0052',
					name: 'attribute.tire.season.option.winter'
				}
			]
		}
	]);