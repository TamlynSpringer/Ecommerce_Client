import React from 'react'

const InfoPage = () => {
  return (
    <section>
      <br/>
      <article>
      <h3>App description</h3>
      <h5>This is an eCommerce app (reminiscent of Amazon) that allows stores to create their own seller profile and store, and on it and upload their own products.</h5>
      <h5>A customer that visits the site should be able to view all the products from each of the stores. And add whatever they find to their cart once they have logged in.</h5>
      <br/>
      <h3>User flow</h3>
        <h4>User</h4>
        <ul>
          <li>Email: user@example.com </li>
          <li>Password: Tt12345</li>
          <li>Before logging in can view products, filter and search</li>
          <li>Once logged in can add items to their cart and proceed with checkout and place an order</li>
          <li>Items in the cart can be viewed and edited from the cart tab, with the number of items in the cart shown adjacent</li>
          <li>Checkout includes shipping address, (mock) payment method and order review and confirmation</li>
          <li>From the profile tab can update password in user profile</li>
          <li>From the profile tab can view orders in order history (work in progress)</li>
          <li>From the profile tab can log out (will remove cart saved in local storage)</li>
        </ul>
        <h4>Seller</h4>
        <ul>
          <li>Email: seller@example.com </li>
          <li>Password: Tt12345</li>
          <li>Same home page as user. Can also place orders</li>
          <li>From the profile table can update password and create seller profile with store name and description</li>
          <li>From the seller tab in Store the seller can view their store that includes the seller profile and all products</li>
          <li>From the seller tab in Products the products can be added, edited and deleted</li>
        </ul>
        <h4>Admin</h4>
        <ul>
          <li>Email: admin@example.com </li>
          <li>Password: Tt12345</li>
          <li>Same home page as user & seller. Can also place orders</li>
          <li>From the admin tab can view an over view of all products and orders in Admin Dashboard</li>
          <li>From the admin tab can view, edit and delete all products</li>
          <li>From the admin tab can view, edit and delete all users, including changing the role of a user to seller and vice versa </li>
        </ul>
      </article>
    </section>

     

  )
}

export default InfoPage

/*
 <article>
        <h3>App requirements</h3>
        <p>The app should be able to display products. There should be a filter bar and search for products. Each product should have its own page, where you can add products to your cart. This cart should persist in local storage, and only be visible if that user is logged in.</p>
        <p>The backend should log each request from the clients in a document of your choice. The log should include; type of request, date, status code.</p>
        <p>The app should have three different roles; Admin, Seller and User. 
          <br/> Admin: This is the owner of the website. They can view all the different stores and their products. Can also delete products and users. Can only be created in the back-end.
          <br/> Seller: This is the owner of the store. These are able to upload and remove new products. With both info and a fitting image. Can create a seller page with a store name and description.
          <br/>User: This is the customer. A user can add products to their cart and proceed with checkout. Can save their cart in local storage, and have that only visible by them
        </p>
        <p>The store and the backend should not be open to just anyone. Only an authenticated user (of any three roles) should be able to reach the beyond the store home page and its backend routes.
        </p>       
      </article>
      <article>
        <h3>Page requirements</h3>
        <h5>Login & sign-up page</h5>
        <p>The sign-in page
          <ul>
            <li>Throwing an error if the user’s password is incorrect or if the email doesn’t exist (“Email or password is incorrect”).</li>
            <li>Signing a JWT Token and sending back in response.</li>
            <li>User is redirected to the Home pageor Cart page (depending on previous click)</li>
          </ul>
        {/* <br/>Throwing an error if the user’s password is incorrect or if the email doesn’t exist (“Email or password is incorrect”).
        <br/>Signing a JWT Token and sending back in response.
        <br/>User is redirected to the Home pageor Cart page (depending on previous click) 
        </p>
        <p>
        These are the pages we expect you to create. You are welcome to change smaller parts of the following page requirements if you want to, the most important part is that you follow the list of app requirements above.  
        Login & sign-up page 
        The sign-in page
        Throwing an error if the user’s password is incorrect or if the email doesn’t exist (“Email or password is incorrect”).
        Signing a JWT Token and sending back in response.
        User is redirected to the Home page or Cart page 
        The sign-up page 
        Email, Password, Type of user (store admin or user)
        Validating if the email has already been used by an existing user
        Validating the inputs (validators like Joi can be used here)
        Password, requirements up to you,  & email is required in correct format
        Password and confirmed password should match
        Saving the user into the DB
        Make sure to encrypt the user's password as you are storing it in the database. Use a library like Bcrypt for this
        Home page
        Same for all types of Roles
        Once the user is logged in, and redirected to the home page, we should fetch all the products and show them
        A search and filter for looking through products 
        Pagination 
        (optional) Each product also has a link to the store selling the products
        When the user clicks on a product they will be redirected to the products page
        User
        Adding items to a cart, saved in local storage
        Removing items from a cart
        Updating quantity per item in a cart 
        Profile page
        User
        (optimal): Can view their entire cart
        Store admin
        Add button for adding products
        See all the products their store is selling
        Can delete products
        (optional) A user can view this page, and see all the products a store is selling
        Super Admin
        View all the different stores
        Can delete an entire store
        Can click on a store from the list and redirect to the Stores page. Here they can do everything as the store admin 
        </p>
      </article>
*/