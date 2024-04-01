// <!-- ---------------- Script for about area active link ---------------- -->
        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        function opentab(tabname){
            for(tablink of tablinks){
                tablink.classList.remove("active-link")
            }
            for(tabcontent of tabcontents){
                tabcontent.classList.remove("active-tab")
            }
            event.currentTarget.classList.add("active-link");
            document.getElementById(tabname).classList.add("active-tab");
        }

// <!-- ---------------- Script for Side Menu ---------------- -->
            var sidemenu = document.getElementById("sidemenu");
    
            function openmenu(){
                sidemenu.style.right = "0";
            }
            function closemenu(){
                sidemenu.style.right = "-200px";
            }

            // // ---------------- Script for Submit Data & Google Sheet ----------------
            // const scriptURL = 'Your Google sheet > Web App URL'
            // const form = document.forms['submit-to-google-sheet']
            // const msg = document.getElementById("msg")
        
            // form.addEventListener('submit', e => {
            // e.preventDefault()
            // fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            //     .then(response => {
            //         msg.innerHTML = "Message set successfully"
            //         setTimeout(function(){
            //             msg.innerHTML = ""
            //         },5000)
            //         // message will remove after 5000ms (5s).
            //         form.reset()
            //     })
            //     .catch(error => console.error('Error!', error.message))
            // })


// <!-- ------------------------------------------------------------------------------------------ -->

        const wrapper = document.querySelector(".wrapper");
        const carousel = document.querySelector(".carousel");
        const arrowBtns = document.querySelectorAll(".wrapper i");
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const carouselChildrens = [...carousel.children];

        let isDragging = false, startX, startScrollLeft, timeoutId;

        // Get the number of cards that can fit in the carousel at inece
        let carPerView =Math.round(carousel.offsetWidth / firstCardWidth);

        // Insert copies of the last few cards to beginning of the carousel for infinite scrolling
        carouselChildrens.slice(-carPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        // Insert copies of the first few cards to end of the carousel for infinite scrolling
        carouselChildrens.slice(0, carPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Add event listeners for the arrow buttons to scroll the carousel left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
            })
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            //Records the initial cursor and scroll position of the carousel
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging =(e) => {
            if (!isDragging) return; //if isDragging is false return from here
            //Updates the scroll position of the carousel based on the cursor movement
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        const autoPlay = () => {
            if (window.innerWidth < 800) return; // Return if window is smaller then 800
            // Autoplay the carousel after every 2500 ms
            timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
        }
        autoPlay();

        const infiniteScroll = () => {
            // If the carousel is at the beginning, scroll to the end
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            }
            // If the carousel is at the end, scroll to the beginning
            else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }

            clearTimeout(timeoutId);
            if(!wrapper.matches(":hover")) autoPlay();
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);