class Book{
    constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }

    addLocalStorage(book){
        let books = "";

        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }

        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static getAllFromLocalStorage(){
        return JSON.parse(localStorage.getItem("books"))
    }

    deleteFromLocalStorage(book){
        let books = JSON.parse(localStorage.getItem("books"));

        books.forEach((bk,index) => {
            if(JSON.stringify(bk) === JSON.stringify(book)){
                books.splice(index,1);
            }
        })

        localStorage.setItem("books",JSON.stringify(books));

       
    }
}

class UI{
    addBookToList(book){
        let bookList = document.getElementById("book-list");

        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete-item">X</a></td>
        `;

        bookList.appendChild(row);
    }

    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    static showAlert(message,color){
        let div = document.createElement("div");
        div.id = `warning`;
        div.className =  color;
        div.appendChild(document.createTextNode(message));
        document.body.appendChild(div);

        setTimeout(() => {
            document.getElementById("warning").remove();
        },3000)
    }

    writeAllToList(){
        let books = Book.getAllFromLocalStorage();

        books.forEach((book) => {
            this.addBookToList(book);
        })
    }
};



document.querySelector("#add-item").addEventListener("click", myFucntion);

function myFucntion(e){
    
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

        let ui = new UI();

        if(title === "" || author === "" || isbn === ""){
            UI.showAlert("Please fill in all fields", "error");
        }else{
            let book =  new Book(title,author,isbn);
        
            ui.addBookToList(book);
            ui.clearFields();
            UI.showAlert("Book successfully added!","success");
            book.addLocalStorage(book);
        }

        
    e.preventDefault();
}

document.getElementById("book-list").addEventListener("click",function(e){
    
    if(e.target.classList.contains("delete-item")){
        e.target.parentElement.parentElement.remove();
        UI.showAlert("Successfully Deleted!","success");

        let title = e.target.parentElement.parentElement.children[0].textContent;
        let author = e.target.parentElement.parentElement.children[1].textContent
        let isbn = e.target.parentElement.parentElement.children[2].textContent;
        let book = new Book(title,author,isbn);

        book.deleteFromLocalStorage(book);
    }
})

window.addEventListener("load", () => {
    if(JSON.parse(localStorage.getItem("books")).length === 0){
        
    }else{
        let ui = new UI();
        ui.writeAllToList();
    }
})