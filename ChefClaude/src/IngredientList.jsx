function IngredientList({
  ingredients,
  toggleRecipeShown,
  recipeShown,
  scrollRef,
}) {
  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  return (
    <>
      <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientsList}
        </ul>

        {ingredients.length > 3 && (
          <div className="get-recipe-container">
            <div ref={scrollRef}>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={toggleRecipeShown}>
              {recipeShown ? "Hide Recipe" : "Show Recipe"}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default IngredientList;
