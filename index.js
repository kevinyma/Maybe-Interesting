// one data variable for each column
var data1, data2, data3, data4;

$('document').ready(function(){
  //also can use: .submit( handler )
  $('#search').on( "submit", function(event){
    event.preventDefault();
    var query = $('#query').val();
    search(query);
  });

    $('#results').on("click", ".link", function(event){
      var id = $(this).attr("id");
      getLinks(id);
    });
});

//query is the word to be searched
function search(query){
    var queryUrl = 'https://en.wikipedia.org/w/api.php'
     + '?action=query' + '&list=search' + '&srsearch=' + query + '&srprop=snippet' + '&prop=info' + '&srlimit=20';

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
      col1 = data;
      displaySearch(data);
    }
  });
}

function getLinks(id){
  var queryUrl = 'https://en.wikipedia.org/w/api.php'
  + '?action=query&format=json&prop=info&list=&gblpageid=' + id + '&generator=backlinks&gbllimit=20';
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
      displayLinks(data);
    }
  });
}

function displaySearch(data){
  var html = "";
  data.query.search.forEach(function(page){
    html+='<div class="">' + '<h5 class="link" id=' + page.pageid + '>' + page.title + '</h5>' + '</div>'

  });
  $('#search-results').html(html);
}

function displayLinks(data){
  var html = "";
  for (var page in data.query.pages) {
    var info = data.query.pages[page];
    html+='<div class="">' + '<h5 class="link" id=' + info.pageid + '>' + info.title + '</h5>' + '</div>';
  }
  $('#link-results').html(html);
}
