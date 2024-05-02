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
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note) => {
        let liTag = `<li class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                                <li><i class="uil uil-pen"></i>Edit</li>
                                <li><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </div>
                </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        // removing show class from the settings menu on document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

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
        showNotes();
    }
});