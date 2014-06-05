# A fun demo building a simple TallyCafe #

As part of the Tally Programming Club, we are presenting a session of
various activities for programmers. My team and I will be presenting a
quick and simple demo of building a web application using `Node.js`,
`React.js`, and `Socket.io` in about 45 minutes.

## Presentation ##

### Step 0: Intro ###
1. This is a fun overview of building a simple app in half an hour
   to order refreshments from the pantry.
2. As we are a C/C++ shop we generally don't use these technologies
   but they are powerful and simple to use. Also as we know, it is
   good to build your knowledge portfolio so here are some tools for
   your toolbox.
   + node.js
   + react.js
   + socket.io
3. Here we are giving you a feel of the technologies, as half an hour
   is hardly time to delve into the depths. However, we are happy to
   answer any questions or doubts. This presentation should whet your
   appetite for trying some of these out.

### Step 1: Simple Get Server with Node.js ###
4. Ready? We'll start with Node.js
   + Everyone's heard of it of course - a platform for building fast, scalable
     data driven applications. Recap of some key points
   + It uses an event-driven, non-blocking I/O model
   + It uses javascript for programming
     - Thus allowing front-end and back end to be built with similar skills
   + It is single threaded
     - Which makes it much easier to program
   + Your code runs on Windows, Mac, and Linux
   + Thousands of packages in NPM
   + M. E. A. N. (Mongo, Express, Angular, Node)
     - But we will not be using these in our app
   + Used by: eBay, G.E., Linkedin, PayPal, Yahoo, The New York Times
5. Build a server serving get requests.
   - Post functions and others return 404. This is not semantically correct
     but good for development as the server keeps the requests alive.
6. Build a simple index page
7. Show server serving get requests

### Step 2: Using React.js to show order list ####
8. Now we'll make this page our order entry. We can hard-code the orders
   or we can be data driven.
   - We will be data driven and use React.js as our framework
9. React.js
   - A facebook library for designing complex user interfaces
   - No two-way complex MVC. One way reactive data flow.
     - Normally render a template. Then wire up events between your model
       and the DOM so that when it changes, you update some data.
     - Problems? Performance is low as DOM is heavy.
     - Lots of boilerplate code for doing the same thing.
   - Easier to reason about. On data change, throw away everthing
     and rebuild.
   - Slow? Nope. Built for performance and uses a virtual DOM which
     only updates the diffs. Diffs are typically very small.
   - Has an HTML-like syntax called JSX (which is optional but fun to use)
     - We will use it for our app
   - Re-usability is high because you create components. We will see them.
   - Composable - components can be build out of other components making
     complex views easy.
   - Used by: Facebook, Instagram, Khan Academy
10. Change index page to include react.js and jsx.js
11. Create DOM node for our view
12. Create orders array
13. Add JSX comment
14. Create Order class. Create Orders class composing order.
15. Add orders component to DOM node. Display!

### Step 3: Using Ajax to submit an order ###
16. Add AJAX javascript.
17. Add OnClick() event. Gets order failure.


### Step 4: Add login with cookie handling ###
18. Add login page. Add post handling for login.
19. Add Cookie handling for simple login (no password).
20. Check that login works.

### Step 5: Add pantry page with websockets ###
21. Now we add the pantry page. This will respond to new orders. We can
    do this by
    - Polling/Pull
    - Websockets/Push
      - Push is better
    - Websockets provide a API to have two way communication with the
      server through a single socket on the web.
    - Websockets work by starting with HTTP and upgrading
      - This is because HTTP is the used everywhere
      - And most firewalls will simply allow this to work
      - Detects and works with proxies
        - typically secure websockets works better
22. We will use sockets.io
    - Powerful and easy to use (as we will see)
    - Used by: Microsoft office, yammer, trello
23. Add sockets.io wrapper to http server. Recognize PANTRY_SOCKET. Wire PANTRY_SOCKET with orders.
24. Add orders.html. Add react, js, ajax, and socket.io.js.
25. Add div for entries. Create component OrderList.
26. Send order. And show.
27. Add time out and show.

### Step 6: Close ###
28. Wind down. Q&A.

## Design ##
- Users will connect using browser or mobile to the tallycafe server
- TallyCafe server will check if there are cookies 'username' and
  'extension' set
- If not it will serve 'login.html'
- login.html will ask for username and extension and store them as
  cookies 'username' and 'extension'
- After ensuring 'username' and 'extension' are stored, it will serve
  'index.html'
- index.html will load react.js
- index.html will display list of valid orders with a 'order' button
  On startup this list can be empty
- on clicking 'order'
  - the button will disable and change to 'ordering'
  - a submit 'order refreshments' will be sent via ajax containing
    'username', 'extension', 'type of refreshment'
  - on success response
    - the button will enable again
    - an information alert 'order placed' will pop up
  - on failure response
    - the button will enable again
    - an error alert 'failed to place order' will pop up
- 'order refreshments' message must be re-directed to 'fullfill orders'
  client.
  - If such client does not exist, return failure
  - Otherwise emit a message to the socket.io client about order and
    return success
- Pantry will connect using browser to tallycafe server 'orders/' page
- TallyCafe server will allow only specific ip to connect to 'orders/'
  - If another ip tries to connect - return error
  - otherwise return 'orders.html'
- 'orders.html' will load socket.io and react.js
- On receiving 'order refreshments' message, will add the message to
  a 'pending orders' queue.
- 'orders.html' will start a timer that runs every second and refreshes
  the view using react.js from the pending queue
- On clicking 'done' message will be removed from the queue and view
  will be refreshed
- queue will use the number of ticks to decide which image to show
  - < 10 ticks image will be 'happy', background color=green
  - < 20 ticks image will be 'serious', background color=blue
  - otherwise image will be 'angry', background color=red
  - image will be username-happy.jpg, username-serious.jpg, username-angry.jpg

## Spec ##
- Directory structure

```
    + tallycafe/
      + tallycafe.js  <-- server
      + www/  <-- all served data
        + login.html
        + index.html
        + orders.html
        + js/ <-- javascript
          + react.js
          + socket.io.js
        + img/
          + coffee.png
          + ...
        + emp/
          + abhishekjain-happy.jpg
          + ...
````

- Page Design
  - TallyCafe Header
  - Mobile vs Desktop view
  - ...?
- Login Page
  - Page with form 'username' and 'extension'
  - Posts to '/login'
- Order Page
  - Page with list of refreshments and buttons
  - On button click
    - ajax post request to server
    - switch state to 'waiting for confirmation'
  - On 'waiting for confirmation', all buttons are disabled
  - On receiving ajax response,
    - show user alert as success/failure
    - switch state to 'accepting orders'
- Pantry Page
  - On body load
    - send socket message informing that I am pantry
    - start timer for updating status of orders
  - On receiving order messages, set time pending = 0, add to queue
  - Display queue
    - Each element displayed as per time pending
  - On button click/touch
    - Remove element from queue
  - On timer
    - Walk through each element in queue and increase time pending
- Error handling
  - Simple error handling function on server that return error code
    and write error to `console.error`
  - On client, show alerts for user errors and console.error for
    developer logs
- Startup
  - On startup create http server
  - And wrap in websocket (socket.io)
  - set DOC_ROOT and DEFAULT_PAGE, and LOGIN_PAGE
  - set PANTRY_IP and PANTRY_PATH
- Handling websockets
  - On connection, set up message handler to listen for 'pantry' message
- Handling cookies
  - Read cookies from header and split on `;` and `=`
  - Set cookies by setting an array in header (nodejs `setHeader` interface)
- Serving web requests
  - simple GET requests
        - take path from URL
        - if path is empty
              - if IP is PANTRY_IP
                    - set path as PANTRY_PATH
              - otherwise
                    - check for cookies 'username' and 'extension'
                          - if set set path as DEFAULT_PAGE
                          - if not set set path as LOGIN_PAGE
        - join with DOC_ROOT
              - handle going below root
        - if path is PANTRY_PATH check that IP is PANTRY_IP or refuse connection
        - create read stream and pipe to response
  - simple POST requests
    - if ordermenu request
          - send a JSON array of order names and images
    - if login request
          - Get request 'username' and 'extension'
                - if not found return error
          - Save 'username' and 'extension' in cookies
          - return redirect request to '/' empty page
    - if order request
          - Get cookies for 'username' and 'extension'
                - if not found, return error
          - Get request parameter 'refreshment'
                - if not found, return error
          - Create a new order message for 'username', 'extension', and 'refreshment'
          - Send the message to 'pantry' websocket
                - if failed, return error
