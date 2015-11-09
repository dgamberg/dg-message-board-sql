$(document).ready(function(){
   $("#search").submit(function(event){
      event.preventDefault();
      var values = {};

      $.each($(this).serializeArray(), function(i, field){
         values[field.name] = field.value;
      });

       //findMessages(values);
   });

   $("#addMessage").submit(addMessage);
   $("#messageContainer").on('click', '.delete', deleteMessage);

   getData();
});

//function findMessages(values) {
//    $.ajax({
//        type: "GET",
//        url: "/find",
//        data: values,
//        success: function(data) {
//            updateDOM(data);
//        }
//    })
//}

function getData(){
   $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
         updateDOM(data);
      }
   });
}

function addMessage(){
   event.preventDefault();
   var values = {};

   $.each($(this).serializeArray(), function(i, field){
      values[field.name] = field.value;
   });

   $.ajax({
      type: "POST",
      url: "/data",
      data: values,
      success: function(){
         getData();
      }
   });
}

function deleteMessage(){
   var deletedId = {"id" : $(this).data("id")};

   $.ajax({
      type: "DELETE",
      url: "/data",
      data: deletedId,
      success: function(data){
          getData();
      }
   })
}

function updateDOM(data){
   $("#messageContainer").empty();

   for(var i = 0; i < data.length; i++){
      var el = "<div class='well col-md-3'>" +
                  "<p>" + data[i].name + "</p>" +
                  "<p>" + data[i].message + "</p>" +
                  "<button class='delete btn btn-danger' data-id='" +
                     data[i].id + "'>Delete</button>" +
               "</div>";

      $("#messageContainer").append(el);
   }
}
