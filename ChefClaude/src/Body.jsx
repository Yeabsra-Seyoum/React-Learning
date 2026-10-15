import React from "react";
import IngredientList from "./IngredientList";
import ClaudeRecipe from "./ClaudeRecipe";

function Body() {
  // pass callback fun instead of setCount(count + 1);  the second option just updates the count value to the current
  // value i.e., count+1. But the call back function option is used when we want to update the state based on the
  // previous state value. Ex. flipping between true and false. to do "!prevTruthValue".

  function handleSubmit(formData) {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      formData.get("ingredient"),
    ]);
  }

  function toggleRecipeShown() {
    setRecipeShown((prevRecipeShown) => !prevRecipeShown);
  }
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);

  const recipeSectionRef = React.useRef(null);
  React.useEffect(() => {
    if (recipeShown && recipeSectionRef.current) {
      recipeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeShown]);

  return (
    <>
      <main>
        <form action={handleSubmit} className="add-ingredient-form">
          <input type="text" placeholder="Ex. Flour" name="ingredient" />
          <button type="submit">Add Ingredients</button>
        </form>
        {ingredients.length > 0 && (
          <IngredientList
            ingredients={ingredients}
            toggleRecipeShown={toggleRecipeShown}
            recipeShown={recipeShown}
            scrollRef={recipeSectionRef}
          />
        )}
        {recipeShown && <ClaudeRecipe />}
      </main>
    </>
  );
}

export default Body;
