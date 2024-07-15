import { chain } from 'ramda';

/**
 * Recursive function to flatten an array until there is no depth (children) left.
 * @example ['path 1', ['path 1.a', 'path 1.b', ['path 1.1.a']]] => ['path 1', 'path 1.a', 'path 1.b', 'path 1.1.a']
 * @param {T[]} [trees=[]] An array containing a tree structure
 * @return {*}  {T[]}
 */
export const flattenTrees = <T extends { children?: T[] }>(trees: T[] = []): T[] => {
  return chain((node) => {
    const children = node.children || [];
    return [node, ...flattenTrees(children)];
  }, trees);
};
