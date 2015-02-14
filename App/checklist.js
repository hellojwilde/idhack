$(document).ready(function() {
// sets the contents to take up the entire width/height of the page

    $(".right-btn").click(function() {
        $(this).toggleClass("btn-outlined");
                  $(this).parent().find(".left-btn").addClass("btn-outlined");
        });
         $(".left-btn").click(function() {
        $(this).toggleClass("btn-outlined");
                  $(this).parent().find(".right-btn").addClass("btn-outlined");
            });

        });
