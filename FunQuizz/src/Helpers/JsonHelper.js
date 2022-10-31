
class JsonHelper {
    isEmpTy(json) {
        return Object.keys(json).length == 0;
    }

    isNotEmpTy(json) {
        return Object.keys(json).length > 0;
    }
}

export default new JsonHelper();
