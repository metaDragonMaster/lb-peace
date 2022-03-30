import { useRouter } from "vue-router";
import { deepClone } from "@/utils/tools";

export function useRouteTo(to) {
    const Router = useRouter();
    function toName(name, parameter = {}) {
        if (!name) {
            return;
        }
        const params = deepClone(parameter);
        console.log("params", params);
        return Router.push({
            name: name,
            params: params,
        });
    }
    function toPath(path, parameter = {}) {
        if (!path) {
            return;
        }
        const query = deepClone(parameter);
        console.log("query", query);
        return Router.push({
            path: path,
            query: query,
        });
    }
    return {
        toName,
        toPath,
    };
}
