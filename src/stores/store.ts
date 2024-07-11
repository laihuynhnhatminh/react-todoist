import { create } from "zustand";

import { ProjectSlice, createProjectSlice } from "./slices/project.slice";
import { TaskSlice, createTaskSlice } from "./slices/task.slice";

export const useStore = create<ProjectSlice & TaskSlice>((...a) => ({
  ...createProjectSlice(...a),
  ...createTaskSlice(...a),
}));
