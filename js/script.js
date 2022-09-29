// VARIABLES//
const dataURL = "https://api.artic.edu/api/v1/artworks/";
const search = "search?q=";
const publicDomain ="query[term][is_public_domain]=true";

const imageURL = "https://www.artic.edu/iiif/2/";
const imageSize = "/full/800,/0/default.jpg";


// const title =
// document.getElementById("title");

// const URL = ('https://api.artic.edu/api/v1/artworks/129884');
// console.log(URL);


// fetch('https://api.artic.edu/api/v1/artworks/129884')
// .then(res=> res.json())
// .then(data => console.log(data))
// const $getQuote = $('#getQuote')


//ELEMENTS//
const $title = $(".title");
const $artist = $(".artist");
const $type = $(".type");
const $year = $(".year");

const $form = $("form");
const $input = $('input[type="text"]');

const $loadImage = $(".info, .imageItem");

const $button = $("button");


// const $title = $('#title')
// const $year = $('#Year')
// const $mediums = $('#Mediums')
// const $input = $('input[type="text"]');


//EVENT LISTENERS//

$form.on("submit", handleGetData);
$loadImage.on("click", ".imageItem", showItem);
$button.on('click', searchBar);

// $form.on('submit',handleGetData)


//FUNCTIONS//

function handleGetData(evt){
console.log(handleGetData);


evt.preventDefault();
$(".info").empty();
$(".image").empty();

const userInput = $input.val();
$.ajax(dataURL + search + userInput + publicDomain).then(
    function (artSearch) {
        artSearch.data.forEach(function(artItem) {
            $.ajax(dataURL + artItem.id).then(function (artPiece) {

                if (artPiece.data.image_id == null) return true;
                if (artPiece.data.title == "") return true;
                if (artPiece.data.artist_titles == "") {
                    artPiece.data.artist_titles = "N/A";
                }
                if (artPiece.data.classification_titles == "") {
                    artPiece.data.classification_titles = "N/A";
                }
                if (artPiece.data.date_start == "") {
                    artPiece.data_start = "N/A";
                }

                $(".info").append(
                    `<img src="${
                        imageURL + artPiece.data.image_id + imageSize
                    }"class="imageItem growImage"></img>`
                );

                $(".info").append(
                    `<p class="text title">${artPiece.data.title}<br></p>`
                );
                $(".info").append(
                    `<p class"text type">Type: ${artPiece.data.classification_titles.join(
                        ","
                    )}<br></p>`
                );
                $(".info").append(
                    `<p class="text year">Year: ${artPiece.data.date_start}<br><br></p>`
                );
            });
        });
    },
    function (error) {
        console.log("there is an error");
        console.log(error);
    }
);
  
function showItem(event) {
    // Clears previous art displayed.
    $(".artAPI").empty();
  
    // Clones and removes css form original
    const newImage = event.target.cloneNode(true);
    newImage.classList.remove("imageItem", "growImage");
  
    // Adds CSS for artwork display and puts it in the frame.
    newImage.classList.add("artAPI");
  
    $(".artAPI").append($(newImage).hide().fadeIn(100));
  }
  
  
  function searchBar() {
    $(".textBox").toggleClass("textBoxLong");
  }
}
// function generatetitle(){
//     fetch(URL)
//     .then(data => {
//         return data.json();
//     })
//     .then(data => {
//         title.innerHTML = "" + data.quote + '.';


//     })
// }

// generatetitle();
// console.log(generatetitle)

// // function dot notiation to go down tr
// function handleGetData(){
//     // function getQuote(event){
//     //     event.preventDefault()

// // Event.preventDefault()
// // const userInput = $input.val();


// $.ajax(URL).then(function(data) {
//     console.log('Art data ready')
//     console.log(data)
//     // $quote.text(data.content)
//     // $name.text(data.title)
//     // $year.text(data.Year)
//     // $mediums.text(data.Mediums)
// }, function(error) {
//     console.log('something is wrong')
//     console.log(error)
// })

// }
// // / }$getArtworkBtn.on('click', getArtwork)
