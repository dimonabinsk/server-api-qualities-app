import httpServices from "./http.services";

const qualityEndPoint = "quality/";

// const updateQuality = async (content) => {
//     try {
//    const {data} = await httpServices
//         .put(qualityEndPoint, content);
//         return data;
//     } catch (e) {
//       console.log("Expected error");
//       toast.info(
//         "An unexpected error has occurred, please try to change it later"
//       );
//       // Например, вывести ошибку пользователю
//       // alert(e);
//     }
//   };

//   const getQuality = async (id) => {
//     try {
//       const { data } = await httpServices.get(qualityEndPoint);
//       console.log(id);
//       return data;
//     } catch (error) {
//       console.log("Expected error");
//     }
//   };

const qualityService = {
  update: async (id, content) => {
    const { data } = await httpServices.put(qualityEndPoint + id, content);
    return data;
  },
  get: async (id) => {
    const { data } = await httpServices.get(qualityEndPoint + id);
    return data;
  },
  fetchAll: async () => {
    const { data } = await httpServices.get(qualityEndPoint);
    return data;
  },
  create: async (content) => {
    const { data } = await httpServices.post(qualityEndPoint, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpServices.delete(qualityEndPoint + id);
    return data;
  },
};

export default qualityService;
