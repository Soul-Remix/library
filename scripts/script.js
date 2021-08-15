const addBtn = document.querySelector(".add-btn");
const overlay = document.querySelector(".overlay");
const submitBtn = document.getElementById("submit");
const form = document.querySelector("#form");
const cards = document.querySelector(".cards");

let formDiv;

const read = document.querySelector(".read-btn");

let myLibrary = [];

// createForm btn

addBtn.addEventListener("click", createForm);

// remove card and change read status

cards.addEventListener("click", function (e) {
  const remove = Array.from(document.querySelectorAll(".remove-btn"));
  dataId = Number(e.target.parentNode.parentNode.dataset.id);
  if (e.target.classList.contains("remove-btn")) {
    e.target.parentNode.parentNode.remove();
    myLibrary.splice(dataId, 1);
    saveLocal();
  } else if (e.target.classList.contains("not-read")) {
    e.target.classList.remove("not-read");
    e.target.classList.add("read-btn");
    e.target.innerText = "Read";
    myLibrary[dataId].read = true;
    saveLocal();
  } else if (e.target.classList.contains("read-btn")) {
    e.target.classList.remove("read-btn");
    e.target.classList.add("not-read");
    e.target.innerText = "Not read";
    myLibrary[dataId].read = false;
    saveLocal();
  }
});

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// create Form

function createForm() {
  overlay.classList.toggle("overlay-active");

  formDiv = document.createElement("div");
  formDiv.classList.add("form");
  document.body.append(formDiv);

  const form = document.createElement("form");
  form.id = "form";
  formDiv.append(form);

  const para = document.createElement("p");
  para.innerText = "Add a new book";
  form.append(para);

  const exit = document.createElement("button");
  exit.id = "close";
  exit.innerText = "X";
  para.append(exit);

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "title");
  form.append(labelTitle);

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("placeholder", "Title");
  inputTitle.setAttribute("required", "");
  labelTitle.append(inputTitle);

  const labelAuthor = document.createElement("label");
  labelAuthor.setAttribute("for", "author");
  form.append(labelAuthor);

  const inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("id", "author");
  inputAuthor.setAttribute("name", "author");
  inputAuthor.setAttribute("placeholder", "Author");
  inputAuthor.setAttribute("required", "");
  labelAuthor.append(inputAuthor);

  const labelPages = document.createElement("label");
  labelPages.setAttribute("for", "pages");
  form.append(labelPages);

  const inputPages = document.createElement("input");
  inputPages.setAttribute("type", "number");
  inputPages.setAttribute("id", "pages");
  inputPages.setAttribute("name", "pages");
  inputPages.setAttribute("required", "");
  inputPages.setAttribute("placeholder", "Pages");
  inputPages.setAttribute("min", "1");
  labelPages.append(inputPages);

  const labelRead = document.createElement("label");
  labelRead.setAttribute("for", "check-read");
  labelRead.setAttribute("class", "read-check");
  labelRead.innerText = "Read?";
  form.append(labelRead);

  const inputRead = document.createElement("input");
  inputRead.setAttribute("type", "checkbox");
  inputRead.setAttribute("name", "check-read");
  inputRead.setAttribute("id", "check-read");
  inputRead.setAttribute("value", "read");
  labelRead.append(inputRead);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("btn", "submit-btn");
  submitBtn.setAttribute("type", "submit");
  submitBtn.id = "submit";
  submitBtn.innerText = "Submit";
  form.append(submitBtn);

  //the submit button
  form.addEventListener("submit", updateLibrary);

  //the exit button
  exit.addEventListener("click", () => {
    formDiv.remove();
    overlay.classList.toggle("overlay-active");
  });
}

// get the form values

function formValue() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("check-read");

  const values = new book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(values);

  return values;
}

// the function to update the library when submitting

function updateLibrary() {
  formValue();
  let value = myLibrary[myLibrary.length - 1];
  let id = myLibrary.length - 1;
  for (let i = 0; i < myLibrary.length - 1; i++) {
    if (myLibrary[i].title === value.title) {
      alert("You already have the book in your library");
      myLibrary.pop();
      return;
    }
  }
  createCard(value, id);
  saveLocal();
  formDiv.remove();
  overlay.classList.toggle("overlay-active");
}

// create a card with vales entered

function createCard(values, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", `${id}`);
  cards.append(card);

  const ul = document.createElement("ul");

  const li0 = document.createElement("li");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");

  li0.innerText = values.title;
  li1.innerText = values.author;
  li2.innerText = values.pages;
  ul.append(li0, li1, li2);

  const div = document.createElement("div");
  div.classList.add("btns");
  card.append(ul, div);

  const readBtn = document.createElement("button");
  if (values.read === false) {
    readBtn.innerText = "Not read";
    readBtn.classList.add("not-read", "btn-read", "btn");
    div.append(readBtn);
  } else if (values.read === true) {
    readBtn.innerText = "Read";
    readBtn.classList.add("read-btn", "btn-read", "btn");
    div.append(readBtn);
  }

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("remove-btn", "btn");
  div.append(removeBtn);

  saveLocal();
}

// local save and restore functions

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  localStorage.getItem("cards");
  if (myLibrary === null) myLibrary = [];
  for (i = 0; i < myLibrary.length; i++) {
    createCard(myLibrary[i], i);
  }
}

restoreLocal();
