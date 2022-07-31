import { User } from "./user"
import { Product } from "./product"
import { CurrentUserSession } from "./current-user-session"
const fsp = require("fs").promises
const path = require("path")

async function runApp() {

    const sessionsFromFile: any[]  = []
    const usersFromFile: any[] = []
    const productsFromFile: any[]  = []

    //read files:
    try {
        const data = await fsp.readFile(__dirname+ "/../data/CurrentUserSession.txt", {encoding: "utf-8"})
        const lines: string [] = data.split("\n")
        lines.forEach(line => {
            const properties: string[] = line.split(",");
            const session = {userId: parseInt(properties[0].trim()), productId: parseInt(properties[1].trim())}
            sessionsFromFile.push(session)
        })
    } catch (e) {
        console.log(e)
    }

    try {
        const data = await fsp.readFile(__dirname+ "/../data/Users.txt", {encoding: "utf-8"})
        const lines: string [] = data.split("\n")
        lines.forEach(line => {
            const properties: string[] = line.split(",");
            const viewedProds = properties[2].trim().split(";").map(idString => parseInt(idString))
            const purchasedProds = properties[3].trim().split(";").map(idString => parseInt(idString))
            const user = {id: parseInt(properties[0].trim()), name: properties[1].trim(), viewedProducts: viewedProds, purchasedProducts: purchasedProds}
            usersFromFile.push(user)
        })
    } catch (e) {
        console.log(e)
    }

    try {
        const data = await fsp.readFile(__dirname+ "/../data/Products.txt", {encoding: "utf-8"})
        const lines: string [] = data.split("\n")
        lines.forEach(line => {
            const properties: string[] = line.split(",");
            const product = {
                id: parseInt(properties[0].trim()),
                name: properties[1].trim(),
                year: parseInt(properties[2].trim()),
                keyword1: properties[3].trim(),
                keyword2: properties[4].trim(),
                keyword3: properties[5].trim(),
                keyword4: properties[6].trim(),
                keyword5: properties[7].trim(),
                rating: Number(properties[8].trim()),
                price: parseInt(properties[9].trim())
            }
            productsFromFile.push(product)
        })
    } catch (e) {
        console.log(e)
    }

    //add types:
    const users: User[] = [];
    const products: Product[] =[];
    const currentSessions: CurrentUserSession[] =[];

    usersFromFile.forEach(user => {
        const newUser = new User(user.id, user.name, user.viewedProducts, user.purchasedProducts)
        users.push(newUser)
    })

    productsFromFile.forEach(product => {
        const newProduct = new Product(product.id,
                                        product.name,
                                        product.year,
                                        product.keyword1,
                                        product.keyword2,
                                        product.keyword3,
                                        product.keyword4,
                                        product.keyword5,
                                        product.rating,
                                        product.price
            )
        products.push(newProduct)
    })

    sessionsFromFile.forEach(session => {
        const newCurrentSession = new CurrentUserSession(session.userId, session.productId)
        currentSessions.push(newCurrentSession)
    })

    //create list of 3 most popular products:
    products.sort((a, b) => {
        return b.rating - a.rating;
    });

    const mostPopularProducts: Product [] = [];
    mostPopularProducts.push(products[0]);
    mostPopularProducts.push(products[1]);
    mostPopularProducts.push(products[2]);

    console.log(`Most popular movies: ${mostPopularProducts[0].name}, ${mostPopularProducts[1].name}, ${mostPopularProducts[2].name}`)

    //make individual recommendations for user:
    currentSessions.forEach(session => {
        const currentProduct: Product | undefined = products.find(product => product.id == session.productId)
        const currentUser: User | undefined = users.find(user => user.id == session.userId)

        let similarProducts: Product [] = []

        const nrOfKeywords: number | undefined = currentProduct?.keywords.length

        if(nrOfKeywords && nrOfKeywords >= 3) {
            products.forEach(product => {
                //if current product has at least 3 keywords, look for matches with 3 keywords:
                    if (currentProduct && currentProduct.id !==product.id && product.keywords.includes(currentProduct.keywords[0]) && product.keywords.includes(currentProduct.keywords[1]) && product.keywords.includes(currentProduct.keywords[2])) {
                        similarProducts.push(product)
                    }
            })          //end forEach product
                //if checking with 3 keywords resulted in less than 3 similar products, add products with 2 matches:
            if (similarProducts.length < 3) {
                products.forEach(product => {
                    if (currentProduct && currentProduct.id !==product.id && product.keywords.includes(currentProduct.keywords[0]) && product.keywords.includes(currentProduct.keywords[1])) {
                        //check if it's already in the list:
                        if (!(similarProducts.find(prod => prod.id == product.id)))
                            similarProducts.push(product)
                    }
                })          //end forEach product
            }


        }

        if(nrOfKeywords && nrOfKeywords == 2) {
            products.forEach(product => {
                    if (currentProduct && currentProduct.id !==product.id && product.keywords.includes(currentProduct.keywords[0]) && product.keywords.includes(currentProduct.keywords[1])) {
                        similarProducts.push(product)
                    }
            })          //end forEach product
            //if checking with 2 keywords resulted in less than 3 similar products, add products with 1 match:
            if (similarProducts.length < 3) {
                products.forEach(product => {
                    if (currentProduct && currentProduct.id !==product.id && (product.keywords.includes(currentProduct.keywords[0]) || product.keywords.includes(currentProduct.keywords[1]))) {
                        //check if it's already in the list:
                        if (!(similarProducts.find(prod => prod.id == product.id)))
                            similarProducts.push(product)
                    }
                })          //end forEach product
            }
        }           //end if 2 keywords

        if(nrOfKeywords && nrOfKeywords == 1) {
            products.forEach(product => {
                    if (currentProduct && currentProduct.id !==product.id && product.keywords.includes(currentProduct.keywords[0])) {
                        similarProducts.push(product)
                    }
            })          //end forEach product
        }

        //console.log(similarProducts.length)
        if (currentUser && similarProducts.length > 0) {
            console.log(`Recommended movies for ${currentUser.name}: ${similarProducts[0].name}, ${similarProducts[1].name}, ${similarProducts[2].name}`)
        } else if (currentUser) console.log("No similar movies found.")
    })      //end forEach session
}           //end runApp

runApp()




