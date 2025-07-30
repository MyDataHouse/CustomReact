const element: CElement = {
  type: 'div',
  props: {
    id: 'test',
    style: 'height:100px; background-color:red'
  }
}

const app = document.querySelector('#app')

const div = document.createElement(element.type)
Object.keys(element.props).forEach(key => {
  const value = element.props[key]
  if (key === 'style') {
    div.style.cssText = value
  } else {
    div.setAttribute(key, value)
  }
})

const text = document.createTextNode('Hello World')
div.appendChild(text)
const range = document.createRange()
range.selectNodeContents(text)
console.log(range.getBoundingClientRect())

app?.append(div)
