// Get to DOM elements
const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image");

// Loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        // Start of the game both hands are rock
        userResult.src = cpuResult.src = "/images/rock.png";

        // Loop thorough each option image again
        optionImages.forEach((image2, index2) => {
            // If teh current index doesn't match the clicked index
            // Remove teh "active" class from the other option images
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        // Set a timeout to delay the result calculation
        setTimeout(() => {
            gameContainer.classList.remove("start");
            // Get the source of the clicked option image
            let imageSrc = e.target.querySelector("img").src;
            // Set the user image to the clicked option image
            userResult.src = imageSrc;

            // Generate a random number between 0 and 2;
            let randomNumber = Math.floor(Math.random() * 3);
            // Creaet an array of CPU image options
            let cpuImage = ["/images/paper.png", "/images/scissors.png", "/images/rock.png"];
            // Set the CPU image to a random optino from the array
            cpuResult.src = cpuImage[randomNumber];

            let cpuValue = ["P", "G", "B"][randomNumber];
            let userValue = ["P", "G", "B"][index];
            
            let outcomes = {
                PP: "Tabla",
                GG: "Tabla",
                BB: "Tabla",
                PG: "CPU",
                GP: "Player",
                BP: "CPU",
                PB: "Player",
                GB: "CPU",
                BG: "Player"
            };

            // Look up the outcome value based on user and CPU options
            let outcomeValue = outcomes[userValue + cpuValue];

            // Display the result.
            result.textContent = userValue === cpuValue ? "Tabla ang laban!" : `${outcomeValue} and nanalo!`; 
        }, 2500);
    });
});