# Sauce Demo Core User Operations Test Plan

## Application Overview

Functional test coverage for the five core end-user operations observed in the Sauce Demo e-commerce application: signing in, discovering and selecting products, managing a cart, entering checkout information, and reviewing and placing an order. Each test starts from a fresh browser state and uses the documented standard demo account (standard_user / secret_sauce) unless testing invalid login behavior.

## Test Scenarios

### 1. Core E-Commerce User Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. 1. Sign in with valid credentials and reject invalid credentials

**File:** `tests/login.spec.ts`

**Steps:**

1. Start from a fresh browser context at https://www.saucedemo.com.


    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.

2. Enter an invalid username such as `invalid_user`, enter an invalid password, and select Login.


    - expect: The login is rejected.
    - expect: An error message is displayed and the user remains on the login page.

3. Replace the credentials with username `standard_user` and password `secret_sauce`, then select Login.


    - expect: The user is authenticated and navigated to `/inventory.html`.
    - expect: The Products catalog is displayed with the shopping interface available.

#### 1.2. 2. Browse, sort, and inspect a product before adding it

**File:** `tests/browse-products.spec.ts`

**Steps:**

1. Start from a fresh browser context, sign in as `standard_user` with password `secret_sauce`, and remain on the Products page.


    - expect: The catalog displays six products with names, descriptions, prices, and Add to cart controls.
    - expect: The default sort selection is Name (A to Z).

2. Select Price (low to high) from the product sort dropdown.


    - expect: The product order changes to ascending price order: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), then the higher-priced products.

3. Select the Sauce Labs Backpack product name or image.


    - expect: The product detail page opens.
    - expect: The page shows the backpack name, description, price ($29.99), Add to cart, and Back to products controls.

4. Select Add to cart on the detail page, then return to the product catalog.


    - expect: The cart badge indicates one item.
    - expect: The user returns to the Products catalog without losing the cart state.

#### 1.3. 3. Add multiple products and verify the cart contents

**File:** `tests/manage-cart.spec.ts`

**Steps:**

1. Start from a fresh browser context and sign in with `standard_user` / `secret_sauce`.


    - expect: The empty Products catalog is displayed and the cart has no item-count badge.

2. Add Sauce Labs Backpack and Sauce Labs Bike Light from the catalog.


    - expect: Each selected product changes to its cart-added state.
    - expect: The cart badge shows 2.

3. Open the shopping cart.


    - expect: The Your Cart page opens.
    - expect: The cart contains exactly one Backpack and one Bike Light, each with quantity 1.
    - expect: Continue Shopping and Checkout controls are available.

4. Select Continue Shopping, then open the cart again without changing the selections.


    - expect: The user returns to Products and can reopen the cart.
    - expect: Both previously selected items remain in the cart and the badge still shows 2.

#### 1.4. 4. Validate required checkout information and continue with valid details

**File:** `tests/checkout-information.spec.ts`

**Steps:**

1. Start from a fresh browser context, sign in, add Sauce Labs Backpack, open the cart, and select Checkout.


    - expect: The Checkout: Your Information page opens with First Name, Last Name, Zip/Postal Code, Cancel, and Continue controls.

2. Select Continue with all three fields empty.


    - expect: The checkout does not advance.
    - expect: An error identifies First Name as required.

3. Enter `Ada` in First Name, `Lovelace` in Last Name, and `12345` in Zip/Postal Code, then select Continue.


    - expect: The user advances to Checkout: Overview.
    - expect: The selected product is present in the order summary.

#### 1.5. 5. Review totals and complete an order

**File:** `tests/complete-order.spec.ts`

**Steps:**

1. Start from a fresh browser context, sign in as `standard_user` / `secret_sauce`, add Sauce Labs Backpack ($29.99) and Sauce Labs Bike Light ($9.99), and complete checkout information with `Ada`, `Lovelace`, and `12345`.


    - expect: Checkout: Overview is displayed with both products at quantity 1.

2. Review the payment, shipping, item total, tax, and total values.


    - expect: Payment information shows SauceCard #31337.
    - expect: Shipping information shows Free Pony Express Delivery.
    - expect: Item total is $39.98, tax is $3.20, and total is $43.18.

3. Select Finish.


    - expect: The user is navigated to Checkout: Complete!.
    - expect: A Thank you for your order! confirmation is displayed.
    - expect: Back Home and Generate PDF order controls are available.

4. Select Back Home.


    - expect: The user returns to the Products catalog.
    - expect: The completed order flow does not display the previous checkout overview.
