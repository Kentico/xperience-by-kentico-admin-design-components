const dataOrAccessibilityAttributeRegex = /^(data|aria)-/

type PropType = { [key: string]: unknown }

export function getDataAndAccessibilityProps(props: PropType): PropType {
  return Object.keys(props).reduce<PropType>((result, newKey) => {
    if (dataOrAccessibilityAttributeRegex.test(newKey)) {
      return {
        ...result,
        [newKey]: props[newKey],
      }
    }

    return result
  }, {})
}
