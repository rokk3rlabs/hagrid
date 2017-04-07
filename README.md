# Hagrid.io

## Web framework

### Features

There is a summary of the main features that hagrid.io support:

- SASS based
- Different Grid containers
- Default markup base code, that accomplish from day zero the features provided by reset.css on old frameworks
- Ability to customize and extends web element using SASS
- Adjustable design and responsiveness ready for multiple devices, and easily adjustable to design requirements
- Percentage based layouts
- Flexible gutters for grid system
- Bundled Debug capabilities
- Easy system to switch order between columns
- Vertical alignment of items
- Horizontal alignment of items
- Nested layouts
- Bundled margin, padding and width helpers
- Bundled set of color pallette for texts and backgrounds, highly customizable
- Bundled classes for text transformations
- Bundled classes for alter display property of elements
- Standardized typography elements
- Bundled material design icons
- Ready multiple javascript components
- Ability to create custom theme (color scheme) from UI
- Ability to be extended for the community
- Future creation of marketplace for the community (free themes and extensions)


### Knowledge Guide / Documentation
You can see all available documentation in [hagrid.io][1]

### Install

```
$ bower install hagrid.io
```

### Build

 Pre requirements:

OS:

- Ruby
- Node.js & npm

Ruby Gems:

- compass
- sass
- compass-normalize

#### How to install ruby gems?
Run the following command on your, maybe you must use sudo.

```
$ gem install sass compass compass-normalize
```

## Run

To run and execute this project you need execute compass on root project.

```
$ compass watch -c config.rb
```

## Create a custom theme

You can create themes with the Hagrid, for now you need follow the next steps.

1. Download this Repository.
2. Check previous pre requirements of OS and libraries/tools.
3. Go to sass/hagrid-themes and duplicate the example folder
4. Once inside the example folder, update the style properties for your theme on vars folder.
5. Run/restart the command `compass watch`, please see above command.
6. Copy the fonts folder from new genereted theme folder on dist folder.


## Examples

To see demos and examples please see demos folder on this repository or go to [hagrid.io][1]


[1]:<http://hagrid.io/>