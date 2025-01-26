# Test project for Storybook dropdown
## Task

- [x] Implement a dropdown menu with the ability to select a tag.
- [x] The dropdown menu should contain tags of different styles(background, color, border).
- [x] When a tag is selected, it should be displayed in the dropdown button,
and the button itself should adopt the tag's background and text color.
The default button colors can be chosen at your discretion.
- [x] Clicking outside the dropdown, the tag, or the dropdown button should close the menu.
- [x] Use Tailwind CSS, Vue, TypeScript, and Storybook for implementation.
- [x] Design a component structure, break it into separate components, and showcase everything in Storybook stories.
- [x] Use approximate styles.
- [x] Pay special attention to accessibility. Tag selection, opening/closing the dropdown,
should also work via the keyboard. Users should be able to navigate through tags using the Up/Down arrow keys and Tab,
and select a tag using Enter/Space.

// TODO   
- [ ] overflow list  
- [ ] overflow item length
- [x] could be disabled options
- [ ] focus on selected item when opened by keyboard
- [x] disable tab out of component list when opened
- [ ] validation if needed

## How to run

```
npm install
npm run dev
```

## How to build

```
npm run build-storybook // for storybook
npm run build           // if you want to build the project
``` 
         