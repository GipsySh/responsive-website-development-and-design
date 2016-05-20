// put your javascript code here

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var category_template, animals_template, animal_template, slideshow_template;

// variables to store the current displayed category and animal
var current_category = animals_data.category[0]; 
var current_animal = current_category.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
    // render the data into the template
    var html = template(data);
    // put the rendered template into the DOM
    $('#content').html(html);
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run in here
$(document).ready(function(){
    
    // compile all of our templates ready for use
    var source   = $("#category-template").html();
    category_template = Handlebars.compile(source);
        
    source   = $("#animals-template").html();
    animals_template = Handlebars.compile(source);
    
    source   = $("#animal-template").html();
    animal_template = Handlebars.compile(source);
    
    source   = $("#slideshow-template").html();
    slideshow_template = Handlebars.compile(source);
    
    // 
    //  clicking on the categories tab shows the list of all the categories
    //
    $("#category-tab").click(function () {

            // displays the categories template
            showTemplate(category_template, animals_data);

            // make the categories tab the active one
            // first make the currently active tab inactive
            $(".nav-tabs .active").removeClass("active");
            // then make categories tab active
            $("#category-tab").addClass("active");

            // add a click callback to each specie thumbnail 
            // which displays the animals template on that category
            // it is the same as the specifies tab 
            // function so we could acutally just call $(".animal-thumbnail").click() ) 
            $(".category-thumbnail").click(function (){

                    // get the index (position in the array) of the category we clicked on
                    // "this" is the element that was clicked on data("id") gets the attribute data-id
                    // (which we set to the index of the category in the array - @index)
                    var index = $(this).data("id");

                    // set the current category
                    current_category = animals_data.category[index];

                    // displays the animals template
                    showTemplate(animals_template, current_category);

                    // add an on click al all the animals thumbnails
                    // which displays the animal image in a modal popup
                    $(".animals-thumbnail").click(function (){
                            // get the index (position in the array) of the animal we clicked on
                            // "this" is the element that was clicked on data("id") gets the attribute data-id
                            // (which we set to the index of the animal in the array - @index)
                            var index = $(this).data("id");

                            // set the current animal to this category
                            current_animal = current_category.animals[index];

                            // displays the single animal template
                            showTemplate(animal_template, current_animal);
                    });
            });
    });
    
    // 
    //  clicking on the species tab shows all of the animals in the current category
    //
    $("#specie-tab").click(function () {

            // displays the animals template
            showTemplate(animals_template, current_category);

            // make the species tab the active one 
            // first make the currently active tab inactive
            $(".nav-tabs .active").removeClass("active");
            // then make species tab active
            $("#specie-tab").addClass("active");

            // add an on click all the animal thumbnails
            // which displays the animal description in a modal popup
            $(".animals-thumbnail").click(function (){
                    // get the index (position in the array) of the animal we clicked on
                    // "this" is the element that was clicked on data("id") gets the attribute data-id
                    // (which we set to the index of the animal in the array - @index)
                    var index = $(this).data("id");

                    // set the current animal to this category
                    current_animal = current_category.animals[index];

                    // displays the single animal template
                    showTemplate(animal_template, current_animal);
            });
    });
    
    // 
    //  clicking on the slideshow tab displays the
    //  current album as a slide show
    //
    $("#slideshow-tab").click(function () {
            // display the slideshow template using the 
            // current album
            showTemplate(slideshow_template, current_category);

            // make the slideshow tab the active one
            // first make the currently active tab inactive
            $(".nav-tabs .active").removeClass("active");
            // then make slideshow tab active
            $("#slideshow-tab").addClass("active");
    });
        
    // start the page by showing the category view
    // we do this by virtually clicking on the category tab
    $("#category-tab").click();
    
});

