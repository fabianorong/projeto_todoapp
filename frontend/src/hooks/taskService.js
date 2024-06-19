import api from "../utils/api";

export const createTask = async (task, token) => {
  try {
    const response = await api.post("/tasks/create/", task, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// export const getTasks = async (token) => {
//   try {
//     const response = await api.get("/tasks/mytasks", {
//       headers: {
//         Authorization: `Bearer ${JSON.parse(token)}`,
//       },
//     });
//     return response.data.tasks;
//   } catch (err) {
//     throw err.response.data;
//   }
// };

export const deleteTask = async (id, token) => {
  try {
    const response = await api.delete(`/tasks/mytasks/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const concludeTask = async (id, token) => {
  try {
    const response = await api.patch(`/tasks/mytasks/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
