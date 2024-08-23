import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
  name: "component",
  initialState: {
    components: [],
    history: [],
    current: 0,
    undo: false,
    redo: false,
    isFirst: true,
  },
  reducers: {
    addComponent(state, action) {
      state.components.push(action.payload);
      state.history.push(state.components);

      if (state.history.length > 0) {
        state.undo = true;
      }
    },
    removeComponent(state, action) {
      state.components = state.components.filter(
        (component) => component.id !== action.payload
      );
      state.history.push(state.components);

      if (state.history.length < 1) {
        state.undo = false;
      }
    },
    editComponent(state, action) {
      const id = action.payload.id;

      state.components = state.components.map((component) => {

        if (component.id == id) {
          return { ...component, ...action.payload };
        }
        return component;
      });
      state.history.push(state.components);
    },
    undoHandler(state) {
      state.current = state.isFirst
        ? state.history.length - 2
        : state.current - 1;
      state.isFirst = false;
      state.redo = true;

      if (state.current <= -1) {
        state.undo = false;
      }

      state.components = state.history[state.current];
    },
    redoHandler(state) {
      state.current++;
      state.components = state.history[state.current];

      if(state.current>=0){
        state.undo=true
      }

      if (state.current === state.history.length - 1) {
        state.redo = false;
      }
    },
  },
});

export const {
  addComponent,
  removeComponent,
  editComponent,
  undoHandler,
  redoHandler,
} = componentSlice.actions;
export default componentSlice;
