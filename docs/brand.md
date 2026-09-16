# Commonplace — Open Index

The original four-square mark is replaced by an open **C** with a separate horizontal index tab. The surrounding curve suggests a place to collect things; the independent tab suggests an entry ready to discover. It is drawn directly as two compact SVG paths, not borrowed from a reference brand.

The master vector is `public/brand/commonplace-mark.svg`; `BrandMark` renders its paths in `currentColor`. The favicon uses the same geometry and follows the device theme. Keep a clear area of at least one tab thickness around the silhouette. Do not skew it, add gradients, or recolor the two pieces independently.

- Header mark: 39px desktop, 34px phone; accompanying wordmark uses DM Sans at 650 weight.
- Minimum standalone artwork size: 20px; the favicon may use the simplified filled silhouette below this size.
- Light: charcoal `#303843`. Dark: pale ink `#e3e8f0`. Use semantic brand tokens in the application.
- Hover: the index tab extends 3px over 280ms and retracts on exit. Reduced motion removes displacement. There is no idle animation.

Project logos remain their owners' original artwork. The main cards reserve a 62px tile with roughly 40px of image space; logos are never recolored to fit the interface. The new mark, wordmark and type scale were inspected in actual desktop and mobile browser captures in both themes.
