const addBox = document.querySelector(".add-box");
popupBox = document.querySelector(".popup-box");
closeIcon = document.querySelector("header i");
titleTag = document.querySelector("input");
descTag = document.querySelector("textarea");
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];

// gettign localStorage notes if exist and parsing them
// to js object else passign an empty array to notes.
const notes = JSON.parse(localStorage.getItem("notes") || '[]');

addBox.addEventListener('click', () => {
    popupBox.classList.add("show");
});

closeIcon.addEventListener('click', () => {
    popupBox.classList.remove("show");
});

addBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    noteDesc = descTag.value;
    
    if (noteTitle || noteDesc){
        // gettting month, day, year from the current date
        let dateObj = new Date();
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        console.log(month, day, year);


        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        notes.push(noteInfo); // adding new note to notes
        // saving notes to localhost
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
    }
});