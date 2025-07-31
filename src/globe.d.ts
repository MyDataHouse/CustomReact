interface CElement {
  type: 'TEXT_NODE' | string
  props: {
    [key: string]: any
    nodeValue?: string
  }
  children?: CElement[]
}
