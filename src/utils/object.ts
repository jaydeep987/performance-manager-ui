/**
 * Flips simple object, key to values and values to key!
 */
export function flipObject(obj: {[key: string]: string | number}): {} {
  return Object
    .entries(obj)
    .reduce((object, [key, value]) => (
      {
        ...object,
        [value]: key,
      }
    ), {});
}
