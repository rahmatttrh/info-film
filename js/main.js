function cariFilm(){
  $('#hasil-pencarian').html('');
  $.ajax({
    url : 'https://omdbapi.com',
    type : 'get',
    dataType : 'json',
    data : {
      'apikey' : '2ebe7b71',
      's' : $('#search-input').val()
    },
    success: function(result){
      if(result.Response == "True"){
        let films = result.Search;

        $.each(films, function(i, data){
          $('#hasil-pencarian').append(`
            <div class="col-md-3">
            <div class="card mb-3">
              <img src="`+ data.Poster +`" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.Title +`</h5>
                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
              

                <a href="#" class="btn btn-dark detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Detail</a>
              </div>
            </div>
            </div>
          `);
        });

        $('#search-input').val('');

      } else {
        $('#hasil-pencarian').html(`
          <div class="col">
          <h1 class="text-center">Film tidak ditemukan.</h1>
          </div>
        `)
      }
    }
  });
}

$('#search-button').on('click', function(){
  cariFilm();
});

$('#search-input').on('keyup', function(e){
  if(e.keyCode === 13){
    cariFilm();
  }
});


// $('#hasil-pencarian').on('click','.detail', function(){
//   $.ajax({
//         url : 'https://omdbapi.com',
//         type : 'get',
//         dataType : 'json',
//         data : {
//           'apikey' : '2ebe7b71',
//           'i' : $(this).data('id')
//         },

//         success : function(movie){
           
//         }
//   })
// })
$('#hasil-pencarian').on('click','.detail', function(){
  $.ajax({
    url: 'https://omdbapi.com',
    dataType: 'json',
    type: 'get',
    data: {
      'apikey' : '2ebe7b71',
      'i' : $(this).data('id')
    },

    success: function(movie){
      if(movie.Response === "True"){

        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+ movie.Poster +`" class="img-fluid">
              </div>

              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                  <li class="list-group-item">Released : `+ movie.Released +`</li>
                  <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                  <li class="list-group-item">Director : `+ movie.Director +`</li>
                  <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                  <li class="list-group-item">Plot : `+ movie.Plot +`</li>
                  
                </ul>
              </div
            </div>
          </div>
        `);

      }
    }

  });
});




