import "./directory-item.styles.scss";

// the arguments in the function are the props that are passed in from the parent component. all the props are stored in an object called props
// so here we are destructuring the props object to get the category key of the object
const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
