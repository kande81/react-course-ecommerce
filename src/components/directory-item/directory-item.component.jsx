import "./directory-item.styles";
import { useNavigate } from "react-router-dom"; //The 'useNavigate' function is a hook provided by 'react-router-dom' that returns a function that you can use to navigate around your application. This hook can be used in any component that needs to programmatically navigate to different routes, such as a button that redirects the user to a different page when clicked.

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

// the arguments in the function are the props that are passed in from the parent component. all the props are stored in an object called props
// so here we are destructuring the props object to get the category key of the object

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
