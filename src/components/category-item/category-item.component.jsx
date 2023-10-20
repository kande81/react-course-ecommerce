import "./category-item.styles.scss";

// the arguments in the function are the props that are passed in from the parent component. all the props are stored in an object called props
// so here we are destructuring the props object to get the category key of the object
const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
