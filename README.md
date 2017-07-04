# zooomin
Smooth image lightbox

## Implementation

```html
<head>
<link rel="stylesheet" href="zooomin.css">
</head>

<figure class="zooomin">
  <div class="zooomin-image-container">
    <!-- insert img -->
  </div>
</figure>

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
  scrollClose: true //default
});
```

### TODO
video & thumbnail support 
