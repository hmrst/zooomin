# zooomin
Smooth image lightbox

## Implementation

```html
<head>
<link rel="stylesheet" href="zooomin.css">
</head>

<img class="zooomin">
<video class="zooomin" src="video.mp4"></video>

<script src="jquery.js"></script>
<script src="zooomin.js"></script>
```

## Use

```javascript
$('.zooomin').zooomin();
```

## Options

```javascript
$('.zooomin').zooomin({
  scrollClose: true       // default
  videoWidth: 1920,       // default (change so it matches your video size)
  videoHeight: 1080,      // default (change so it matches your video size)
  videoAutoplay: false,   // default
  onOpen: false,          // Eventlistener
  onClose: false,         // Eventlistener
});
```

## Help

```markdown
sass --watch sass/zooomin.sass:stylesheets/zooomin.css
```

### TODO
Thumbnail support
