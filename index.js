class Node {
  constructor ({ key, value }) {
    this.key = key
    this.value = [value]
    this.right = null
    this.left = null
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insert (nodeData) {
    const newNode = new Node(nodeData)

    if (this.root === null) {
      this.root = newNode
      return
    }

    this.insertNode(this.root, newNode)
  }

  insertNode (currentNode, newNode) {

    if (newNode.key < currentNode.key) {
      if (currentNode.left === null) {
        currentNode.left = newNode
      } else {
        this.insertNode(currentNode.left, newNode)
      }
    }

    else if (newNode.key > currentNode.key) {
      if (currentNode.right === null) {
        currentNode.right = newNode
      } else {
        this.insertNode(currentNode.right, newNode)
      }
    }

    else {
      currentNode.value.push(...newNode.value)
    }
  }

  getBSTData (dataArray) {
    dataArray.forEach(el => {
      if (!el.key) {
        throw new Error('Not Valid Data!')
      }

      this.insert(el)
    })

    return this.root
  }

  search (node, searchedKey) {
    if (!node) {
      return
    }

    if (searchedKey < node.key) {
      this.search(node.left, searchedKey)
    } else if (searchedKey > node.key) {
      this.search(node.right, searchedKey)
    } else {
      return node
    }
  }

  async appendElements (node, side) {
    const rootElement = document.getElementById('bst')

    const keyModifierElement = document.createElement('div')
    keyModifierElement.classList.add('bst__key-modifier')
    keyModifierElement.classList.add(`${side}`)
    keyModifierElement.textContent = `${side} | key: ${node.key}`

    node.value.forEach(el => {
      const valueModifierElement = document.createElement('span')
      valueModifierElement.classList.add('bst__value-modifier')
      valueModifierElement.textContent = el

      keyModifierElement.appendChild(valueModifierElement)
    })

    const targetElement = document.querySelector('.center')

    rootElement.appendChild(keyModifierElement)
  }

  async drawBST (bstData, side = 'center') {
    this.appendElements(bstData, side)

    if (bstData.left) {
      await this.drawBST(bstData.left, 'left')
    }

    if (bstData.right) {
      await this.drawBST(bstData.right, 'right')
    }
  }
}

const prepareData = () => {
  const data = []
  let key = Math.floor(Math.random() * 10) + 1

  for (let i = 1; i < 101; i++) {
    if (i % 10 === 0) {
      key = Math.floor(Math.random() * 10) + 1
    }

    const nodeData = {
      key,
      value: i
    }

    data.push(nodeData)
  }

  return data
}

const drawBST = () => {

  const BST = new BinarySearchTree ()

  const BSTData = BST.getBSTData(prepareData())
  const node = BST.search(BSTData, 2)
  console.log(BSTData)
  BST.drawBST(BSTData)
}

drawBST()