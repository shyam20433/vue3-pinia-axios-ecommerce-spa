import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return {
    message: 'Ecommerce Backend Running',
  }
})

// Products
Route.get('/products', 'ProductsController.index')
Route.get('/products/:id', 'ProductsController.show')
Route.post('/products', 'ProductsController.store').middleware(['admin','auth'])
Route.put('/products/:id', 'ProductsController.update').middleware(['admin','auth'])
Route.delete('/products/:id', 'ProductsController.destroy').middleware(['admin','auth'])

// Users
Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.post('/users', 'UsersController.store')
Route.put('/users/:id', 'UsersController.update')

// Orders
Route.get('/orders', 'OrdersController.index')
Route.post('/orders', 'OrdersController.store')
Route.get('/users/:userId/orders', 'OrdersController.myOrders')
Route.delete('/orders/:id', 'OrdersController.destroy')
  .middleware(['admin','auth'])
Route.post('/admin/login', 'UsersController.adminLogin')

Route.put('/orders/:id/status', 'OrdersController.updateStatus')
