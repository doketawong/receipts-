var itemList = []
var taxSum = 0
var subtotal = 0

const button = document.getElementById('Add')
button.addEventListener('click', function (e) {
  const country = document.getElementById('country').value
  const food = document.getElementById('food').value
  const price = document.getElementById('price').value
  const quantity = document.getElementById('quantity').value
  var item = {}
  item['country'] = country
  item['food'] = food
  item['price'] = price
  item['quantity'] = quantity
  if (country !== '' && food !== '' && price !== '' && quantity !== '') {
    var tax = calculateTax(country, food, price, quantity)
    subtotal = parseFloat(subtotal) + price * quantity
    subtotal = (Math.ceil(subtotal * 20) / 20).toFixed(2)
    taxSum = (parseFloat(taxSum) + parseFloat(tax)).toFixed(2)
    itemList.push(item)
  }
}
)

function calculateTax (country, item, price, quantity) {
  var caTax = 0.0975
  var nyTax = 0.08875
  var foodExempt = ['apple', 'orange', 'food']
  var clothExempt = ['shirt', 'cloth']
  var taxTemp = 0
  if (country.toLowerCase() === 'ca' || country.toLowerCase() === 'california ') {
    for (let i = 0; i < foodExempt.length; i++) {
      if (item.toLowerCase() === foodExempt[i]) {
        taxTemp = 0
        return taxTemp
      } else {
        taxTemp = price * quantity * caTax
        taxTemp = (Math.ceil(taxTemp * 20) / 20).toFixed(2)
        return taxTemp
      }
    }
  } else if (country.toLowerCase() === 'ny' || country.toLowerCase() === 'new york ') {
    for (let i = 0; i < foodExempt.length; i++) {
      if (item.toLowerCase() === foodExempt[i]) {
        taxTemp = 0
        return taxTemp
      } else {
        for (let i = 0; i < clothExempt.length; i++) {
          if (item.toLowerCase() === clothExempt[i]) {
            taxTemp = 0
            return taxTemp
          } else {
            taxTemp = price * quantity * nyTax
            taxTemp = (Math.ceil(taxTemp * 20) / 20).toFixed(2)
            return taxTemp
          }
        }
        return taxTemp
      }
    }
  } else {
    return 0
  }
}

const checkOut = document.getElementById('checkOut')
checkOut.addEventListener('click', function (e) {
  createTable(itemList)
}
)
function createTable (tableData) {
  var table = document.createElement('table')
  var tableBody = document.createElement('tbody')
  var firstRow = false
  tableData.forEach(function (rowData) {
    var row = document.createElement('tr')
    var cell = document.createElement('td')
    if (!firstRow) {
      Object.keys(rowData).forEach(function (cellData) {
        cell.appendChild(document.createTextNode(cellData + ' '))
        row.appendChild(cell)
      })
      var row1 = document.createElement('tr')
      var cell1 = document.createElement('td')
      Object.values(rowData).forEach(function (cellData) {
        cell1.appendChild(document.createTextNode(cellData + '  '))
        row1.appendChild(cell1)
      })
    } else {
      Object.values(rowData).forEach(function (cellData) {
        cell.appendChild(document.createTextNode(cellData + '  '))
        row.appendChild(cell)
      })
    }

    tableBody.appendChild(row)
    if (!firstRow) {
      tableBody.appendChild(row1)
      firstRow = true
    }
  })
  var trailer = generateTrailer()
  table.appendChild(tableBody)
  table.appendChild(trailer)
  document.body.appendChild(table)
}

function generateTrailer () {
  var tableBody = document.createElement('tbody')

  var subTotalRow = document.createElement('tr')
  var subTotalCell = document.createElement('td')
  subTotalCell.appendChild(document.createTextNode('Subtotal: ' + subtotal))
  subTotalRow.appendChild(subTotalCell)

  var taxRow = document.createElement('tr')
  var taxCell = document.createElement('td')
  taxCell.appendChild(document.createTextNode('Tax: ' + taxSum))
  taxRow.appendChild(taxCell)

  var totalRow = document.createElement('tr')
  var totalCell = document.createElement('td')
  console.log(taxSum)
  console.log(subtotal)
  var total = (parseFloat(taxSum) + parseFloat(subtotal)).toFixed(2)
  totalCell.appendChild(document.createTextNode('total: ' + total))
  totalRow.appendChild(totalCell)

  tableBody.appendChild(subTotalRow)
  tableBody.appendChild(taxRow)
  tableBody.appendChild(totalRow)

  return tableBody
}
