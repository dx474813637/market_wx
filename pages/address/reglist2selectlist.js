export default function(list) {
	return list.items11.map(ele => {
		let obj = {
			value: ele.code,
			label: ele.name,
		}
		let children = list[`items${ele.code}`]
		if (children && children.length > 0) {
			obj.children = children.map(item => {
				let obj2 = {
					value: item.code,
					label: item.name
				}
				let children2 = list[`items${item.code}`]
				if (children2 && children2.length > 0) {
					obj2.children = children2.map(item2 => {
						return {
							value: item2.code,
							label: item2.name
						}
					})
				} else {
					obj2.children = [{
						value: item.code,
						label: item.name,
					}]
				}
				return obj2
			})
		}
		return obj
	})
}
