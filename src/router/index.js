import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import routes from "./routes.js";
import { UseStoreWeb3js } from "@/stores/web3js.js";
import { documentTitle } from "@/config/setting.config"
import { history, titleSeparator,whiteRathPathList } from "@/config/router.config"
const router = createRouter({
	routes,
	history: history == 'hash' ? createWebHashHistory() : createWebHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition && to.meta.keepAlive) {
			return savedPosition;
		} else {
			return {
				top: 0,
				left: 0,
				behavior: "smooth",
			};
		}
	},
});
// process.env.NODE_ENV == 'development'
router.beforeEach(async (to, from, next) => {
	const storeWeb3js = UseStoreWeb3js();
	const { startWeb3, haveAuth } = storeWeb3js;
	if (!haveAuth && !whiteRathPathList.includes(to.path)) {
		try {
			await startWeb3();
			next({...to});
		} catch (error) {
			console.error(error);
			next("/");
		}
	} else {
		next();
	}
});
router.afterEach((to) => {
	document.title = `${to.meta.title} ${titleSeparator} ${documentTitle}`;
});

export default router;
