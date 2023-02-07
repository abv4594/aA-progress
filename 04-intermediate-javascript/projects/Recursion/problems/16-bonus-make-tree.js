/***********************************************************************
Write a recursive function `makeTree(categories, parent)` that takes an array of
categories objects, each of which have an id property, and a parent property and
returns a nested tree of those objects using the parent properties to construct
the tree.

A parent value of null means you are at the bottom of the tree and the category
has no parent, so the default value parent is be null if no parent is
provided.

Example 1:

Given an array of objects with id properties to create our tree:

const categories1 = [
    { id: 'animals', 'parent': null },
    { id: 'mammals', 'parent': 'animals' }
];

const tree1 = makeTree(categories1, null);

We should return a tree like this:

{
  animals: {
    mammals: {}
  }
}

Example 2:
Now imagine we have a database that returns a bunch of rows of data:

const categories2 = [
    { id: 'animals', 'parent': null },
    { id: 'mammals', 'parent': 'animals' },
    { id: 'cats', 'parent': 'mammals' },
    { id: 'dogs', 'parent': 'mammals' },
    { id: 'chihuahua', 'parent': 'dogs' },
    { id: 'labrador', 'parent': 'dogs' },
    { id: 'persian', 'parent': 'cats' },
    { id: 'siamese', 'parent': 'cats' }
];

Then we call the function with the categories:
const tree2 = makeTree(categories2, null);

The call above should return the tree below:

{
    animals: {
        mammals: {
            dogs: {
                chihuahua: {},
                labrador: {}
            },
            cats: {
                persian: {},
                siamese: {}
            }
        }
    }
}

***********************************************************************/
const makeTree = (categories, parent) => {
  // your code here 

  if (categories.length === 0) {
    return parent;
  }

  // Head
  if (!parent) {
     
      const nextCategory = categories.shift();
      const nextKey = nextCategory.id;
      const obj = {};
      obj[nextKey] = {};
      return makeTree(categories,obj);
    } 

    // parent: {animals: {}}

    for (const head in parent) {
      const usefulCategories = categories.filter(category => category.parent === head);
      const nextCategories = categories.filter(category => (category.parent !== head))
      usefulCategories.forEach(category => {

        if (isEmpty(parent[head])) {
          const obj = {}
          obj[category.id] = {}
          parent[head] = makeTree(nextCategories, obj);
        } else {
          const obj = {};
          parent[head][category.id] = {};
          makeTree(nextCategories, parent[head]);
        }
      })
    }

    return parent

}

function isEmpty (obj) {
  return Object.keys(obj).length === 0;
}

  
/*
  while (categories[0].parent === nextParent) {
    const obj = {};
    obj[categories[0].key] = {};
    parent[nextParent] = makeTree(categories, obj);
    categories.shift();
    nextParent = categories[0].parent;
  }
  return parent;
} 
*/
const categories1 = [
  { id: 'animals', 'parent': null },
  { id: 'mammals', 'parent': 'animals' },
  { id: 'cats', 'parent': 'mammals' },
  { id: 'dogs', 'parent': 'mammals' },
  { id: 'chihuahua', 'parent': 'dogs' }
  
];

/*console.log(makeTree (categories1));*/

const categories2 = [
  { id: 'animals', 'parent': null },
  { id: 'mammals', 'parent': 'animals' },
  { id: 'cats', 'parent': 'mammals' },
  { id: 'dogs', 'parent': 'mammals' },
  { id: 'chihuahua', 'parent': 'dogs' },
  { id: 'labrador', 'parent': 'dogs' },
  { id: 'persian', 'parent': 'cats' },
  { id: 'siamese', 'parent': 'cats' }
]
console.log(makeTree (categories2));


/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeTree;
} catch (e) {
  module.exports = null;
}

// This problem was inspired by a Fun Fun Function video:
// https://www.youtube.com/watch?v=k7-N8R0-KY4
