# InfiniteScroll-js
Simple open-source jquery plugin to create infinite content loading.

## Install

### Download

- Minified: [infiniteScroll.min.js](https://raw.githubusercontent.com/WhiteWolf369/InfiniteScroll-js/main/infiniteScroll.min.js)
- Un-minified: [infiniteScroll.js](https://raw.githubusercontent.com/WhiteWolf369/InfiniteScroll-js/main/infiniteScroll.js)

### CDN

``` html
<script src="https://raw.githubusercontent.com/WhiteWolf369/InfiniteScroll-js/main/infiniteScroll.min.js"></script>
<!-- or -->
<script src="/js/infiniteScroll.min.js"></script>
```

## Dependencies
 - JQuery: https://jquery.com/

## Usage

### Example
This is the simpliest and minimum parameters example
```js
    $("#scrollelement").infinityScroll({
        ajax: {
            url: "/Orders/GetMoreOrders",
            data: (page) => ({
                page, yourparameter, yourparameter, ...
            })
        }
    });
```

### Options

The infinityScroll must have as element target the element that owns the scroll bar.

``` js
$("#scrollelement").infinityScroll({

  ajax: { //Normal jquery ajax parameters
      url: "your/url", //Required
      dataType: "json", //Optional //This can only be json or text
      data: (page) => ({ //Required
          page, yourparameter, yourparameter, ...
      }),
      sucess: function (response) { //Optional
          //The content of the response will be paste on the scroll element or on the target property element
          //You can add here the events for example
      }
      error: function (response) { //Optional
          //Control de errors
      },
      //Can add all the jquery ajax properties you want
  }
  // Required
  // Object
  // Request to get the data to paste

  loadingGif: undefined,
  // Optional
  // String
  // Determines the URL for the waiting img GIF
  // Doesn't show waiting GIF if is not set

  target: undefined,
  // Optional
  // String
  // Determines the element to paste the response html
  // Jquery selector Ex.: .pasteTargets

  jsonProperty: undefined,
  // Optional
  // String
  // Determines de property inside the json that has the html to paste

  scrollThreshold: 400, 
  //Optional
  // Int
  // Sets the distance between the viewport to scroll area
  // for scrollThreshold event to be triggered.
});
```

## Loading GIF

The loading GIF has set the id to `loadingGif` to add style as you want.

## License
License
The MIT License (MIT)

Copyright (c) 2022 WhiteWolf369

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
