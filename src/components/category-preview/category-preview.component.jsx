import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => (
  <div className="category-preview-container">
    <h2>
      {/*// The 'to' prop in the <Link> component from 'react-router-dom' sets the destination URL for the link.
// In this case, 'to={title}' will set the destination URL to the current URL path plus the value of 'title'.
// For example, if the current URL is '/shop' and 'title' is 'jackets', the link will go to '/shop/jackets'.
// If you want the link to always go to '/<title>', regardless of the current URL, you can change 'to={title}' to 'to={`/${title}`}'. */}
      <Link className="title" to={title}>
        {title.toUpperCase()}
      </Link>
    </h2>
    {/*// This line of code filters the 'products' array to only include the first four items.
// The filter method is being used with a callback function that takes two arguments: the current item and its index.
// The callback function returns true if the index is less than 4, meaning that it only includes the first four items in the new array.*/}
    <div className="preview">
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;
