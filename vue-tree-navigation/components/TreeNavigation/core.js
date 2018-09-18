/**
 * First character should be #.
 */
export const sanitizeElement = element => {
  if (element === undefined || element === '') {
    return element;
  }

  if (element[0] !== '#') {
    element = '#' + element;
  }

  return element;
};

/**
 * First character should be backslash.
 * Last character shouldn't be backslash.
 */
export const sanitizeRoute = route => {
  if (route === undefined) {
    return;
  }

  if (route[0] !== '/') {
    route = '/' + route;
  }

  if (route[route.length - 1] === '/') {
    route = route.slice(0, -1);
  }

  return route;
};

/**
 * Recursive function.
 * Insert metadata containing the navigation path and its type to each item.
 **/
export const insertMetadataToItems = (items, parent) => {
  items.forEach(item => {
    item.meta = getItemMetadata(item, parent);

    if (item.hasOwnProperty('children')) {
      item.children = insertMetadataToItems(item.children, item);
    }
  });

  return items;
};

export const generateId = (item, parent) => {

};

/**
 * Return item metadata object: { path: ..., target: ... }
 */
export const getItemMetadata = (item, parent) => {
  const element = sanitizeElement(item.element);
  const route = sanitizeRoute(item.route);
  const external = item.external;

  // item is its own parent
  if (parent === undefined) {
    if (
      element === undefined &&
      route === undefined &&
      external === undefined
    ) {
      return {
        path: '',
        target: '',
      };
    }

    if (external !== undefined) {
      return {
        path: '',
        target: external,
      };
    }

    if (route !== undefined) {
      return {
        path: route,
        target: route,
      };
    }

    if (element !== undefined) {
      return {
        path: '',
        target: '/' + element,
      };
    }
  }

  const parentPath = sanitizeRoute(parent.meta.path);

  if (external !== undefined) {
    return {
      path: parentPath,
      target: external,
    };
  }

  if (route !== undefined) {
    return {
      path: parentPath + route,
      target: parentPath + route,
    };
  }

  if (element !== undefined) {
    return {
      path: parentPath,
      target: sanitizeRoute(parentPath + element),
    };
  }

  return {
    path: parentPath,
    target: '',
  };
};
