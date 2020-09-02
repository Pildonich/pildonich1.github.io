var panorama, panorama2, panorama3, viewer, container, infospot;

container = document.querySelector( '#container' );

panorama = new PANOLENS.ImagePanorama( 'asset/hall.jpg' );
panorama2 = new PANOLENS.ImagePanorama( 'asset/hall1.jpg' );
panorama3 = new PANOLENS.ImagePanorama( 'asset/hall1.jpg' );





// Pair with custom scale and image


infospot = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot.position.set( 2, 1, 1 );
infospot.addHoverText( "The Story" );
infospot.addEventListener( 'click', function(){
  viewer.setPanorama( panorama2 );
} );

panorama.add( infospot );

viewer = new PANOLENS.Viewer( {container: container});
viewer.add( panorama, panorama2, panorama3 );

viewer.addUpdateCallback(function(){
  
});




