"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Logan",
      "Justice league",
      "La la land",
      "Whiplash",
      "Scott Piligrim vs. the world",
    ],
  };

  const advertisingFromSponsors = document.querySelectorAll(".promo__adv img");
  const genre = document.querySelector(".promo__genre");
  const poster = document.querySelector(".promo__bg");
  const navList = document.querySelector(".promo__menu-list ul");
  const moviesList = document.querySelector(".promo__interactive-list");
  const addForm = document.querySelector("form.add");
  const viwedFilms = document.querySelector(".promo__interactive-title");
  const button = document.querySelector("button");
  const addInput = addForm.querySelector(".adding__input");
  const checkBox = addForm.querySelector('[type="checkbox"]');

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newFilm = addInput.value;
    newFilm = newFilm.charAt(0).toUpperCase() + newFilm.slice(1);
    const favorite = checkBox.checked;
    
    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }
      if(favorite){
        console.log('Favorite movie!');
      }
      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, moviesList);
    }
    event.target.reset();
  });

  viwedFilms.addEventListener("mouseenter", () => {
    viwedFilms.classList.add("promo__interactive-title-active:after");
  });

  // const btn = document.querySelector('button');
  // btn.onclick = function(){
  //     alert('click')
  // }

  navList.addEventListener("mouseover", (elem) => {
    elem.target.classList.add("active");
  });
  navList.addEventListener("mouseout", (elem) => {
    elem.target.classList.remove("active");
  });

  const deleteAdd = (arr) => {
    arr.forEach((item) => {
      item.remove();
    });
  };

  const makeChanges = () => {
    genre.textContent = "drama";

    poster.style.backgroundImage = "url('img/bg.jpg')";
  };

  // moviesList.innerHTML = "";

  // movieDB.movies.forEach((film, i)=>{
  //     moviesList.innerHTML +=`
  //     <li class="promo__interactive-item">${i + 1}. ${film}
  //     <div class="delete"></div>
  // </li>
  //     `
  // });
  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(films, parent) {
    parent.innerHTML = "";
    sortArr(films);
    films.forEach((film, i) => {
      parent.innerHTML += `
    <li class="promo__interactive-item">${i + 1}. ${film}
    <div class="delete"></div></li>`;
    });

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(films, parent); // zastosowania rekurencji
      });
    });
  }

  deleteAdd(advertisingFromSponsors);
  makeChanges();
  createMovieList(movieDB.movies, moviesList);

});
