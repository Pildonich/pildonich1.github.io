var panorama, viewer, container;

container = document.querySelector( '#container' );

panorama = new PANOLENS.ImagePanorama( '/asset/PANO0001.jpg' );



  // viewer.setPanorama( panorama2 );
// } );

// panorama.add( infospot );

viewer = new PANOLENS.Viewer( {output: 'console', container: container});
viewer.add( panorama );


//viewer.addUpdateCallback(function(){
//  
//});




