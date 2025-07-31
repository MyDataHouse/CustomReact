const element: CElement = {
  type: 'div',
  props: {
    id: 'test',
    style: 'height:100px; background-color:red'
  },
  children: [
    {
      type: 'TEXT_NODE',
      props: {
        nodeValue: 'hello world'
      }
    }
  ]
}

const app = document.querySelector<HTMLDivElement>('#app')

function render(element: { type: 'TEXT_NODE'; props: { nodeValue?: string } }, container: HTMLElement): Text
function render(element: { type: string; props: { [key: string]: string } }, container: HTMLElement): HTMLElement
function render(element: CElement, container: HTMLElement) {
  if (!element) throw new Error('element is required')
  const queue: Array<{ element: CElement; parent: HTMLElement }> = []
  let el: HTMLElement | Text
  //初始元素
  queue.push({ element, parent: container })

  while (queue.length) {
    const { element, parent } = queue.shift()!
    if (element.type === 'TEXT_NODE') el = document.createTextNode(element.props.nodeValue ?? '')
    else el = document.createElement(element.type)

    if (el instanceof HTMLElement) {
      Object.keys(element.props).forEach(key => {
        const value = element.props[key]
        if (key === 'style') {
          ;(el as HTMLElement).style.cssText = value
        } else {
          ;(el as HTMLElement).setAttribute(key, value)
        }
      })
    }
    parent.append(el)

    if (element.children) {
      element.children.forEach(item => {
        queue.push({ element: item, parent: el as HTMLElement })
      })
    }
  }

  return el!
}

if (app) console.log(render(element, app))
