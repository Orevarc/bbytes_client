export function removeRecipe(shoppingList, url) {
	
}


export function bulkChangeRecipeIngredientAmounts(shoppingList, recipes, recipeMultipliers) {
	for (let recipeMultiplier of recipeMultipliers) {
		const url = recipeMultiplier.url;
		const newMultiplier = recipeMultiplier.multiplier;
		const currentMultiplier = _.find(recipes, {'url': url}).multiplier;
		if (newMultiplier != currentMultiplier) {
			shoppingList = changeRecipeIngredientAmounts(shoppingList, url, currentMultiplier, newMultiplier);
		}
	}
	return _.cloneDeep(shoppingList);
}

export function changeRecipeIngredientAmounts(shoppingList, recipeUrl, currentMultiplier, newMultiplier) {
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
		const recipeAmount = changeItem.recipeAmount;
		const oldAmount = recipeAmount * currentMultiplier;
		const newAmount = recipeAmount * newMultiplier;
		const changedAmount = newAmount - oldAmount;
		let shoppingListIndex = shoppingList.findIndex(item => item.name === changeItem.name && item.unit === changeItem.unit);
		shoppingList[shoppingListIndex].amount += changedAmount
	}
	return shoppingList;
}