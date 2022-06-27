export const make = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);

  if (typeof classNames === "string") {
    element.classList.add(classNames);
  } else {
    element.classList.add(...classNames);
  }

  for (let attributeName in attributes) {
    element[attributeName] = attributes[attributeName];
  }

  return element;
};

export function makeRandomColor() {
  return (
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  );
}
