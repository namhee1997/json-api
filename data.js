const faker = require('faker')
const fs = require('fs')

faker.locale = 'vi'

const RandomCategoryList = (n) => {

    if (n <= 0) return []

    const categoriesList = []

    Array.from(new Array(n)).forEach(() => {
        const ItemCategory = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        categoriesList.push(ItemCategory)
    });

    return categoriesList
}

//

const RandomListProduct = (cate, num) => {
    if (num <= 0) return []
    const productList = []

    for (const list of cate) {
        Array.from(new Array(num)).forEach(() => {
            const product = {
                categoryId: list.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl()
            }

            productList.push(product)
        })
    }

    return productList
}



(() => {

    const categoriList = RandomCategoryList(5)
    const productList = RandomListProduct(categoriList, 5)

    const db = {
        categories: categoriList,
        product: productList,
        profile: {
            name: 'Po'
        }
    }

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('generate success');
    })
})()