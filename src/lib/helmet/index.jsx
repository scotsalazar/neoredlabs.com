import React, { useEffect } from 'react';

const applyElementProps = (element, props) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children' || value === undefined || value === null) {
      return;
    }

    if (key === 'className') {
      element.setAttribute('class', value);
      return;
    }

    element.setAttribute(key, value);
  });
};

const renderHeadElement = (child) => {
  const element = document.createElement(child.type);
  applyElementProps(element, child.props);

  if (child.props.children) {
    element.textContent = React.Children.toArray(child.props.children).join('');
  }

  document.head.appendChild(element);
  return element;
};

const Helmet = ({ children }) => {
  const childArray = React.Children.toArray(children);
  const titleElement = childArray.find((child) => React.isValidElement(child) && child.type === 'title');

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const appendedElements = [];

    if (titleElement && React.isValidElement(titleElement)) {
      const text = React.Children.toArray(titleElement.props.children).join('');
      if (text) {
        document.title = text;
      }
    }

    childArray.forEach((child) => {
      if (!React.isValidElement(child) || child.type === 'title') {
        return;
      }

      const appended = renderHeadElement(child);
      appendedElements.push(appended);
    });

    return () => {
      appendedElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [childArray, titleElement]);

  return null;
};

export default Helmet;
export { Helmet };
