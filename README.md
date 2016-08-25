# Lightning Force

Force plot for **Lightning**

Documentation and examples at [lightning-viz.org](http://lightning-viz.org/documentation)

[![force](https://raw.githubusercontent.com/lightning-viz/lightning-default-index/master/images/force.png)](https://github.com/lightning-viz/lightning-force)

## Usage options

### Lightning server

The Lightning server provides API-based access to reproducible, web-based visualizations. It can be deployed in many ways, including Heroku, Docker, a public server, a local app for OS X — and even a server-less version well-suited to notebooks like Jupyter. It comes bundled with a core set of visualizations, but is built to support custom ones.

[Read more about getting started with a Lightning server](http://lightning-viz.org/documentation/)

You can create an adjacency visualization using Python, Scala, JavaScript, or R by using API clients for making requests to a Lightning server.

#### Clients

Take a look at each client for installation and usage examples:

- [Python](https://github.com/lightning-viz/lightning-python)
- [Scala](https://github.com/lightning-viz/lightning-scala)
- [JavaScript](https://github.com/lightning-viz/lightning.js)
- [R](https://github.com/Ermlab/lightning-rstat)

#### Python adjacency example

```python
from lightning import Lightning
from numpy import random

lgn = Lightning()

mat = random.rand(10,10)
mat[mat>0.75] = 0
group = (random.rand(10) * 5).astype('int')

lgn.force(mat, group=group)
```

#### Scala adjacency example

```scala
import org.viz.lightning._
import scala.util.Random

val lgn = Lightning()

val mat = Array.fill(10)(Array.fill(10)(Random.nextDouble()).map{ d =>
	if (d < 0.75) {
		d
	} else {
		0.0
	}
})
val group = Array.fill(10)(Random.nextInt)

lgn.force(mat, group=group)
```

## JavaScript module via npm

`lightning-force` is an npm module that can be used on its own.

### Install as JavaScript module

```
npm i --save lightning-force
```

### Example

```js
var Force = require('lightning-force');

var el = document.createElement('div');
document.body.appendChild(el);

var data = {
  nodes: [0, 1, 2, 3, 4], 
  group: [0, 0, 1, 1, 2], 
  labels: ["a", "b", "c", "d", "e"], 
  links:[[0, 1, 1], [0, 2, 6], [0, 3, 1], [0, 4, 5]]
};

var options = {
	zoom: false
};

var force = new Force(el, data, options);

```

### API

#### `var Force = require("lightning-force");`

#### `var force = new Force(selector, data, options);`

**Arguments:**  
- **selector** – css selector or dom node that will act as parent node of the visualization
- **data** – the required data for the Visualization
  - **nodes** – array representing nodes in the visualization
  - **group** – array representing groups
  - **links** – array of arrays describing the links between nodes
  - **labels** – array of strings
- **options**
  - **width** – *Number* – the width of the visualization
  - **height** – *Number* – the height of the visualization
	- **zoom** – *Boolean* – determines whether the user can zoom the visualization in and out

## License
[MIT](LICENSE)
