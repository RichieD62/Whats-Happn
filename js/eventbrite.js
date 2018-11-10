$(document).ready(function () {
    class EventBrite {
        // Constructor when instanciate
        constructor() {
            this.auth_token = 'LTIANDPJGDKZMQDL556K';
            this.orderby = 'date';
        }

        // Get the Events from API

        async queryAPI(eventName, category) {
            const eventsResponse = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderby}&categories=${category}&token=${this.auth_token}`);

            // Wait for response and return as json

            const events = await eventsResponse.json();
            console.log(events)

            // const events2 = await eventsResponse2.json();

            return {
                events
            }
        }

        // Get categories from API
        async getCategoriesAPI() {
            // Query the API
            const categoriesResponse = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`);

            // Hold for the response and then return as json
            const categories = await categoriesResponse.json();

            return {
                categories
            }
        }
    }

    class UI {
        constructor() {
            // App inicialization
            this.init();
        }
        // Method when the app starts
        init() {
            // display categories in <select>
            this.printCategories();

            // Select the results
            this.result = document.getElementById('result');

        }

        // Display events from the API

        displayEvents(events) {

            // Build the template

            let HTMLTemplate = '';

            // Loop events and print the result

            events.forEach(eventInfo => {
                HTMLTemplate += `
                   <div class="col-md-4 mt-4">
                        <div class="card" origin="Eventbrite" eventCode=${eventInfo.id} name=${eventInfo.name.text}>
                             <div class="card-body">
                                  <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}"> 
                             </div>
                             <div class="card-body">
                                  <div class="card-text">
                                       <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                                       <p clxass="lead text-info">Event Information:</p>
                                       <p>${eventInfo.description.text.substring(0, 200)}...</p>
                                       <span class="badge badge-primary">Date & Time: ${eventInfo.start.local}</span>
                                       <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                                       <button class="btn btn-secondary btn-block mt-1 favorite">Add To Favorites</button>
                                       </div>
                             </div>
                        </div>
                   </div>
              
              `;
            });

            this.result.innerHTML = HTMLTemplate;
        }
        // Print the categories
        printCategories() {
            const categoriesList = eventbrite.getCategoriesAPI()
                .then(categories => {
                    const categoriesList = categories.categories.categories;
                    const categoriesSelect = document.querySelector('#category');
                    // Inserts categories into select
                    categoriesList.forEach(category => {
                        // Create the options
                        const option = document.createElement('option');
                        option.value = category.id;
                        option.appendChild(document.createTextNode(category.name));
                        categoriesSelect.appendChild(option);
                    })

                })
                .catch(error => console.log(error));
        }

        // Displays a message
        printMessage(message, className) {
            // create a div
            const div = document.createElement('div');
            div.className = className;
            // add the text
            div.appendChild(document.createTextNode(message));

            // Insert into the HTML
            const searchDiv = document.querySelector('#search-events');
            searchDiv.appendChild(div);

            // Remove the alert after 3 seconds
            setTimeout(() => {
                this.removeMessage();
            }, 5000);
        }
        // Remove the message
        removeMessage() {
            const alert = document.querySelector('.modal-body');
            if (alert) {
                alert.remove();
            }
        }
    }

    // Instanciate both class

    const eventbrite = new EventBrite();
    const ui = new UI();


    // Listener for the submit button
    document.getElementById('submitBtn').addEventListener('click', () => {


        // get values from form
        const eventName = document.getElementById('event-name').value;
        const category = document.getElementById('category').value;

        // console.log(eventName + ' : ' + category);

        if (eventName !== '') {
            // Query Event Brite API
            eventbrite.queryAPI(eventName, category)
                .then(events => {
                    // Check for events
                    const eventsList = events.events.events;
                    if (eventsList.length > 0) {
                        // Print the events
                        ui.displayEvents(eventsList);
                    } else {
                        // There are no events, print a message
                        ui.printMessage('No Results Found, Please Refine Your Search', 'text-center modal-body mt-4');
                    }
                })

        }

    })

})