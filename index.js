$('document').ready(function(){

  //also can use: .submit( handler )
  $('#search').on( "submit", function(event){
    event.preventDefault();
    var query = $('#query').val();
    search(query);
  });

  //looks like this only works in Firefox
  function search(query){
    var queryUrl = 'https://en.wikipedia.org/w/api.php'
     + '?action=query'
     + '&list=search'
     + '&srsearch=' + query
     + '&srprop=snippet'
     + '&prop=info'
     + '&srlimit=20';

    console.log(queryUrl);

    $.ajax({
      url: queryUrl,
      data: {
          format: 'json'
      },
      dataType: 'jsonp',
      method: 'GET',
      headers: { 'Api-User-Agent': 'CoolSearchTool'},
      error: function(jqXHR,exception){
        console.log(jqXHR.responseText);
      },
      success: function(data){
        console.log(data);
        display(data);
      }
    });
  }

  function display(data){
    var html = "";
    var counter = 0;
    data.query.search.forEach(function(entry){

    console.log(entry.title);

    html+='<div class="fl w-100 w-50-m w-25-l pa3-m pa4-l">' + '<h5>' + entry.title + '</h5>'
    + '<p class="f6 lh-copy">' + entry.snippet + '</p>' + '</div>';


  });
    $('#results').html(html);
  }




});
