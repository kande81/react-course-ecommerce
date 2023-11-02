import styled from "styled-components";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg"; // with styled components we can import regular react components and apply styles to them

// When you use this styled component (ShoppingIcon) in your React code, the SVG will be rendered with these styles applied. So, the line styled(ShoppingSvg) is essentially saying, "Take the ShoppingSvg React component and let me apply styles to it using the styled-components library." The result (ShoppingIcon) is a new styled React component that can be used like any other component in your React app.
export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`;

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
// .cart-icon-container {
//   width: 45px;
//   height: 45px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   .shopping-icon {
//     width: 24px;
//     height: 24px;
//   }

//   .item-count {
//     position: absolute;
//     font-size: 10px;
//     font-weight: bold;
//     bottom: 12px;
//   }
// }
