import mysql from 'mysql2/promise'
import express from 'express'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE


})
const app =express()
app.use(express.json())

app.listen(PORT,()=>{
    console.log('http://localhost:' + PORT);
    
})


//--------------------------- Task 2 -------------------------------------
app.get('/products', async(req,res)=>{
    res.json({products: await getProducts()})
})

//a. that returns all the products in the database.
const getProducts = async ()=>{
    let [data] = await pool.query('SELECT*FROM products')
    return data  
  }
// b. that returns a single product based on its primary key.

app.get ('/products/:product_code', async(req,res)=>{
    res.json({emp: await getSingleProduct(req.params.product_code)})
})

const getSingleProduct = async (product_code)=>{
    let [data] = await pool.query('SELECT * FROM products WHERE product_code =?',[product_code])
    return data
}

//c that inserts a new product within the database.

// app.post('/products', async (req,res)=>{
//     let {product_code,product_name,product_price,product_quantity} = req.body
//     res.json({products: await insertProduct(product_code,product_name,product_price,product_quantity)})

// })

// const insertProduct = async (product_code,product_name,product_price,product_quantity) => {
//     await pool.query('INSERT INTO products (product_code,product_name,product_price,product_quantity) VALUES (?, ?, ?, ?)',[product_code,product_name,product_price,product_quantity])
//     return 'product added succesfully!'
//}

// d. that deletes a product based on its primary key.


app.delete('/products/:product_code', async (req,res) => {
    res.json({productdel: await deleteProduct(req.params.product_code)})
    
})



const deleteProduct = async(product_code)=>{
    await pool.query('DELETE FROM products WHERE (product_code = ?)',[product_code])
    return 'product deleted'
}

// e. that updates a product based on its primary key.

app.patch('/product/:product_code', async (req,res) => {
    res.json({upproduct: await updateProduct(req.params.product_code)})
    
})

const updateProduct = async (product_code, product_price) => {
    await pool.query('UPDATE products SET product_price = ? WHERE (product_code = ?)',[product_code, product_price])
    return 'Succesfully updated, Washa!'
    
}
//------------------------------------------3------------------------------------------------------------------------
//f. that returns all the users in the database

app.get('/users', async(req,res)=>{
    res.json({users: await getUsers()})
})


const getUsers = async ()=>{
    let [data] = await pool.query('SELECT*FROM users')
    return data  
  }

//that returns a single user based on its primary key.

app.get ('/users/:id', async(req,res)=>{
    res.json({emp: await getSingleUser(req.params.id)})
})

const getSingleUser = async (id)=>{
    let [data] = await pool.query('SELECT * FROM users WHERE id =?',[id])
    return data
}

//that inserts a new user within the database.

 app.post('/users', async (req,res)=>{
    let {id,email,first_name,last_name,password} = req.body
    res.json({newUser: await insertUser(id,email,first_name,last_name,password)})

 })

const insertUser = async (id,email,first_name,last_name,password) => {
    await pool.query('INSERT INTO users (id,email,first_name,last_name,password) VALUES (?, ?, ?, ?, ?)',[id,email,first_name,last_name,password])
     return 'user added succesfully!'
}

// that deletes a user based on its primary key.

app.delete('/users/:id', async (req,res) => {
    res.json({userdel: await deleteUser(req.params.id)})
    
})



const deleteUser = async(id)=>{
    await pool.query('DELETE FROM users WHERE (id = ?)',[id])
    return 'user deleted'
}
//---------------- Viola!------------------------------------

  
