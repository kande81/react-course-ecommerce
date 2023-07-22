// import './categories.styles.scss';
// import CategoryItem from './components/category-item/category-item.component';
import CategoriesMenu from '../../components/categories/categories-item.component';


const Home = () => {
  // categories represent the state or data that our component needs
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]

  

  return (
    <CategoriesMenu categories = {categories} />

   
  );
}

export default Home;