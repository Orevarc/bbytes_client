export function changeRecipeIngredientAmounts(shoppingList, recipeUrl, recipeMultiplier) {
	let changedItems = [];
	for (let item of shoppingList) {
		for (let recipe of item.recipes) {
			if (recipe.url === recipeUrl) {
				changedItems.push({
					name: item.name,
					totalAmount: item.amount,
					unit: item.unit,
					recipeAmount: recipe.amount
				});
			}
		}
	}

	for (let changeItem of changedItems) {
		let recipeAmount = changeItem.recipeAmount;
		const changedAmount = (recipeAmount * recipeMultiplier) - recipeAmount;
		let shoppingListIndex = shoppingList.findIndex(item => item.name === changeItem.name && item.unit === changeItem.unit);
		shoppingList[shoppingListIndex].amount += changedAmount
	}
	return _.cloneDeep(shoppingList);
}