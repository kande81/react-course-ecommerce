import './categories-menu.styles.scss'
import  CategoryItem from '../category-item/category-item.component';

// the arguments in the function are the props that are passed in from the parent component. all the props are stored in an object called props. here we are destructuring the props object to get the categories key of the object
const CategoriesMenu = ({categories}) => {
     // the markup maps over the categories array and extracts the title and id and renders 
    // containere for each object in the array
    // in order to use the inline style attribute in react, we actually
        // pass in an object with the styles we want to apply. The reason for this is because we are writing in javascript and not css
    return (
        <div className='categories-container'>
        {categories.map(( category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    )
}
  
export default CategoriesMenu