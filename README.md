# zooomin
Smooth image lightbox

## Implementation

```html
<head>
<link rel="stylesheet" href="zooomin.css">
</head>

<img class="yourclass">
<video class="yourotherclass" src="video.mp4"></video

<script src="jquery.js"></script>
<script src="zooomin.js"></script>
```

## Use

```javascript
$('.zooomin').zooomin();
```

## Extras

```javascript
$('.zooomin').zooomin({
  scrollClose: true     // default
  video: false,         // default
  videoWidth: 1920,     // default (change so it matches your video size)
  videoHeight: 1080,    // default (change so it matches your video size)
  videoAutoplay: false  // default
});
```

### TODO
Thumbnail support 
