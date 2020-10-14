/* html5 way to get element */
let imgElement = document.getElementById("imageSrc");
/* css way to get element */
let inputElement = document.querySelector("#fileInput");
// let btnElement = document.querySelector("#filter");
let boxBottom = document.getElementById("Box") ;
let unsharpBottom = document.getElementById("Unsharp") ;
let bilateralBottom = document.getElementById("Bilateral") ;
let saltBottom = document.getElementById("SaltAndPepper") ;
let medianBottom = document.getElementById("Median") ;
let lastCanavas = document.getElementById("outputCanvas4") ;

inputElement.addEventListener("change", (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  }, false);

function onOpenCvReady() {
  /* get the status element and change its text */
  document.getElementById('status').innerHTML = "OpenCV.js is ready.";
}

/* this line should be placed under the declaration of btnElement for consistency */
let mat = undefined;

imgElement.addEventListener("load", function(e) {
  mat = cv.imread(imgElement);
  boxBottom.disabled = false;
  unsharpBottom.disabled = false ;
  bilateralBottom.disabled = false ;
  saltBottom.disabled = false ;
});

boxBottom.addEventListener("click", (e) => {
  let src = cv.imread(imgElement) ;
  let dst = new cv.Mat() ;
  let ksize = new cv.Size(5,5) ;
  let anchor = new cv.Point(-1, -1);
  cv.boxFilter(src,dst,src.depth(),ksize,anchor,true,cv.BORDER_DEFAULT) ;
  cv.imshow("outputCanvas1", dst) ;
  dst.delete() ;
  ksize.delete() ;
  anchor.delete() ;
}) ;

unsharpBottom.addEventListener("click", (e) => {
  let src = cv.imread(imgElement) ;
  let dst = new cv.Mat() ;
  let arr = [0,-1,0,-1,5,-1,0,-1,0] ;
  // let ksize = new cv.Size(5,5) ;
  // dst = cv.unsharp_mask(src,ksize, sigma=1.0, amount=1.0, threshold=0) ;
  let kernelSize = 3 ;
  let kernel = cv.matFromArray(kernelSize, kernelSize, cv.CV_32FC1, arr);
  cv.filter2D (src, dst, cv.CV_8U, kernel, anchor = new cv.Point(-1, -1), delta = 0, borderType = cv.BORDER_DEFAULT)
  cv.imshow("outputCanvas2", dst) ;
  dst.delete() ;
  ksize.delete() ;
  anchor.delete() ;
}) ;

bilateralBottom.addEventListener("click", (e) => {
  let src = cv.imread(imgElement) ;
  let dst = new cv.Mat() ;
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
  cv.bilateralFilter(src, dst, 9, 75, 75, cv.BORDER_DEFAULT);
  cv.imshow("outputCanvas3", dst) ;
  dst.delete() ;
  ksize.delete() ;
  anchor.delete() ;
}) ;

let coloredPic = undefined ;

saltBottom.addEventListener("click", (e) => {
  let src = cv.imread(imgElement) ;

  for ( var i = 0 ; i < 500 ; i ++ ) {
    let row =   Math.floor(Math.random() * src.rows) ;
    let column =  Math.floor(Math.random() * src.cols) ;
    let chosen = Math.floor(Math.random()*3) ;

    if ( chosen == 0 ) {
      src.ucharPtr( row, column )[0] = 255 ;
      src.ucharPtr( row, column )[1] = 0 ;
      src.ucharPtr( row, column )[2] = 0 ;
    } // if()
    else if ( chosen == 1 ) {
      src.ucharPtr( row, column )[0] = 0 ;
      src.ucharPtr( row, column )[1] = 255 ;
      src.ucharPtr( row, column )[2] = 0 ;
    } // else if()
    else if ( chosen == 2 ) {
      src.ucharPtr( row, column )[0] = 0 ;
      src.ucharPtr( row, column )[1] = 0 ;
      src.ucharPtr( row, column )[2] = 255 ;
    } // else if()
  } // for()
  
  cv.imshow("outputCanvas4", src) ;
  medianBottom.disabled = false ;
  coloredPic = src ;
}) ;

medianBottom.addEventListener("click", (e) => {
  let src = coloredPic ;
  let dst = new cv.Mat() ;
  let kSize = 5 ;

  cv.medianBlur(src, dst, kSize) ;

  cv.imshow("outputCanvas5", dst) ;
  dst.delete() ;
  ksize.delete() ;
}) ;